const MongoClient = require('mongodb').MongoClient

/**
 * Service of shop DB
 */
class ShopService {

  /** MongoClient
   *
   * @type {Object}
   */
  static #DB = {}

  /**
   * Start service
   * @return {Promise<void>}
   */
  static async start() {
    const mongoClient = new MongoClient('mongodb://localhost:27017/', {
      useUnifiedTopology: true
    }, {
      useNewUrlParser: true
    })
    ShopService.#DB.client = await mongoClient.connect()
    ShopService.#DB.shop = await mongoClient.db('shop')
    return ShopService.#DB.shop;
  }

  /**
   * Stop service
   * @return {Promise<void>}
   */
  static async stop() {
    await this.#DB.client.close()
  }

  /**
   * Getter shop DB
   * @type {[type]}
   */
  static get db() {
    return ShopService.#DB.shop
  }
}

module.exports.ShopService = ShopService
