const { add_products, get_products } = require('../../helpers/products')


const productsR = async (request, response) => {
    return await get_products(request, response)
}

module.exports = { productsR }