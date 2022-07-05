const express = require('express');
const router = express();

const { login, register } = require('../../helpers/auth')

router.post('/login', async (request, response, next) => {
    try {
        let result = await login(request, response)
        if (result === true) {
            response.send({ result, message: "credentials is not working." })
        } else {
            response.status(200).send({ result, message: "Login successful" })
        }
    } catch (error) {
        response.send(error)
        next()
    }
});

router.post('/register', async (request, response, next) => {
    try {
        let result = await register(request, response)
        if (result === true) {
            response.send({ result, message: "User is already created." })
        } else {
            response.status(201).send({ result, message: "User is created." })
        }

    } catch (error) {
        response.send(error)
        next()
    }
});


module.exports = router