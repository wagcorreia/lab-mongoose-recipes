const mongoose = require('mongoose')

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model')
// Import of the data from './data.json'
const data = require('./data')

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app'

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`)
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    // iteraion 2
    const result = await Recipe.create({
      title: 'Coquetel Corote',
      level: 'UltraPro Chef',
      favoriteToys: ['paper ball', 'cardboard box'],
      ingredients: ['1 corote', '1 limão', '1 copo', '1 colher de açucar'],
      cuisine: 'Bebida matinal',
      dishType: 'drink',
      duration: 5,
      creator: 'corotinho seu amiguinho',
    })

    console.log(result.title)
    // iteration 3
    const manyRecipeResult = await Recipe.insertMany(data)

    console.log(manyRecipeResult)

    // iteraion 4
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { $set: { duration: 100 } },
      { new: true },
    )
    console.log('UPDATED RECIPE =>', updatedRecipe)

    // iteraion 5
    const deletedRecipe = await Recipe.deleteOne({
      _id: manyRecipeResult[2]._id,
    })

    console.log('DELETED RECIPE => ', deletedRecipe)

    mongoose.connection.close()
  })
  .catch((error) => {
    console.error('Error connecting to the database', error)
  })
