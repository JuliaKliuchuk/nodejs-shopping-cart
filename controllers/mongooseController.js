const mongoose = require('mongoose')
const Schema = mongoose.Schema

// установка схемы
const userScheme = new Schema({
  name: String,
  age: Number
})

// подключение
mongoose.connect('mongodb://localhost:27017/blazedb', { useNewUrlParser: true })

class TestMongoose {
  static test (req, res, next) {
    const User = mongoose.model('User', userScheme)
    const user = new User({
      name: 'Bill',
      age: 41
    })

    res.send('rdrg111111111111111111111111111111')
    user.save(function (err) {
      mongoose.disconnect() // отключение от базы данных

      if (err) return console.log(err)
      console.log('Сохранен объект', user)
    })
  }
}

module.exports.TestMongoose = TestMongoose
