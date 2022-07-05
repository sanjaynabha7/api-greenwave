const express = require('express');
const router = express.Router();

const auth = require('./routers/auth')
const product = require('./routers/products/')


router.use('/auth', auth)
router.use('/product', product)




module.exports = router