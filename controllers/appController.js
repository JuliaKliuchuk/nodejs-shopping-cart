const { ShopService } = require('../services/ShopService')

/**
 * Service of products collection
 */
class AppController {

  /**
   * Service models
   * @type {Object}
   */
  static #models = {}

  /**
   * Service initialization flag
   * @type {[type]}
   */
  static #init = false

  /**
   * Initialization DB
   * @return {Promise<void>}
   */
  static async init () {

    if (AppController.#init) return;

    const db = await ShopService.start()
    AppController.#models.users = db.collection('users')
    AppController.#models.products = db.collection('products')

    AppController.#init = true;
  }

  /**
   * Insert models in DB
   * @return {Promise<void>}
   */
  static async initDB () {
    const fs = require('fs')
    const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'))

    await AppController.init();
    await AppController.#models.products.insertMany(products)
  }

  /**
   * Getter models
   * @type {[type]}
   */
  static get models() {
    return AppController.#models
  }
}

module.exports.AppController = AppController
