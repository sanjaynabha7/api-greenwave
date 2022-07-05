const Products = require('../../../models/products')


const get_products = async (request, response) => {
    return await Products.find()
}
module.exports = get_products