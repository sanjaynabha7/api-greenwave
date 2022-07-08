const Products = require('../../../models/products')


const get_single_product = async (request, response) => {
    let id = request.params.id
    return await Products.find({ _id: id })
}
module.exports = get_single_product