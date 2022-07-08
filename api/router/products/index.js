const { add_products, get_products, get_single_product } = require('../../helpers/products')


const productsR = async (request, response) => {
    return await get_products(request, response)
}
const singleProduct = async (request, response) => {
    return await get_single_product(request, response)
}

module.exports = { productsR, singleProduct }