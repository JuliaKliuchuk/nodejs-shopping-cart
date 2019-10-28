const { AppController } = require('../controllers/appController')
AppController.init()
const Cart = require('../models/cart')

/**
 * Service Cart
 * @extends AppController
 */
class CartController extends AppController {
  /**
   * Controller index - Start home page
   * '/'
   * @param  {[type]}   req
   * @param  {[type]}   res
   * @param  {Function} next
   * @return {Promise}
   */
  static async index (req, res, next) {
    res.render('index', {
      title: 'NodeJS Shopping Cart',
      products: await CartController.models.products.find().toArray()
    })
  }

  /**
   * Controller add - add product in Cart
   * '/add/:id'
   * @param  {[type]}   req
   * @param  {[type]}   res
   * @param  {Function} next
   * @return {Promise}
   */
  static async add (req, res, next) {
    const productId = Number(req.params.id)

    const cart = new Cart(req.session.cart ? req.session.cart : {})

    const product = await CartController.models.products.findOne({ id: productId })

    cart.add(product, productId)
    req.session.cart = cart
    res.redirect('/')
  }

  /**
   * Controller cart - products in Cart
   * '/cart'
   * @param  {[type]}   req
   * @param  {[type]}   res
   * @param  {Function} next
   * @return {[type]}
   */
  static cart (req, res, next) {
    if (!req.session.cart) {
      return res.render('cart', {
        products: null
      })
    }
    const cart = new Cart(req.session.cart)
    res.render('cart', {
      title: 'NodeJS Shopping Cart',
      products: cart.getItems(),
      totalPrice: cart.totalPrice
    })
  }

  /**
   * Controller remove - remove products from the Cart
   * '/remove/:id'
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  static remove (req, res, next) {
    const productId = Number(req.params.id)
    const cart = new Cart(req.session.cart ? req.session.cart : {})
    cart.remove(productId)
    req.session.cart = cart
    res.redirect('/cart')
  }

  /**
   * Controller error
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  static err (req, res, next) {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  }
};

module.exports.CartController = CartController
