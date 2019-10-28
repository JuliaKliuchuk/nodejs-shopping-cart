const { AppController } = require('./controllers/appController')

const test = async () => {
  await AppController.initDB()
  const result = await AppController.models.products.find().toArray()
  console.log(result)
}

test()
