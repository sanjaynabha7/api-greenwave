const Products = require('../../../models/products')


const add_products = async (request, response) => {
    let data = {
        ...request.body
    }
    return await Products.create(data)
}


module.exports = add_products