const express = require('express');
const router = express();

const { add_products, get_products } = require('../../helpers/products')

router.post('/add-products', async (request, response, next) => {
    try {
        let result = await add_products(request, response)
        response.send({ result, message: "Working" })
    } catch (error) {
        response.send(error)
        next()
    }
});

router.get('/get-products', async (request, response, next) => {
    try {
        let result = await get_products(request, response)
        response.send({ result, message: "Working" })
    } catch (error) {
        response.send(error)
        next()
    }
});


module.exports = router