const express = require('express')
const router = express.Router()
const { CartController } = require('../controllers/CartController')

router.get('/', CartController.index)

router.get('/add/:id', CartController.add)

router.get('/cart', CartController.cart)

router.get('/remove/:id', CartController.remove)

module.exports = router
