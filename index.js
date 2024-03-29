const express = require('express');
const cors = require('cors')
const mongoose = require("mongoose");
var jwt = require('jsonwebtoken');
const { productsR, singleProduct } = require('./api/router/products')
const { login, register } = require('./api/helpers/auth')
const stripe = require('stripe')('sk_test_51LJBNeHmLvXJkyzyjdFqGY43RvTk0WUYhCKQNBfBZvSp4czPbKmdviN1cQXFFaeODkvloonsqHg6ddCEGkoC404900r4i438pd');

const app = express()
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb+srv://greenwave:greenwave902@greenwave.6ckylvf.mongodb.net/greenwave?retryWrites=true&w=majority',
  { ssl: true }
).then(() => {
  console.log('DB Connected');
}).catch(e => {
  console.log('Unable to connect to the db server');
  console.log(e)
});


const verifyToken = (request, response, next) => {
  if (!(request.url.endsWith('login') || request.url.endsWith('register'))) {
    const authHeader = request.headers['authentication']
    if (authHeader) {
      var parts = authHeader.split(' ');
      if (parts.length === 2) {
        var scheme = parts[0];
        var credentials = parts[1];

        if (/^Bearer$/i.test(scheme)) {
          if (credentials) {
            var privateKey = "nabha";
            try {
              jwt.verify(credentials, privateKey);
              next()
            }
            catch (ex) { console.log(ex.message); }
          } else {
            response.send("Not authentication")
          }
        }
      } else {
        response.send("Please check your token bearer")
      }
    } else {
      response.send("Not authentication")
    }

  } else {
    next()
  }
}



app.get("/api/product/get-products", verifyToken, async (request, response) => {
  let result = await productsR(request, response)
  response.send({ result, message: "Working" })
});

app.get("/api/product/get-products/:id", async (request, response) => {
  let result = await singleProduct(request, response)
  response.send({ result, message: "Working" })
});


app.post("/api/auth/login", verifyToken, async (request, response) => {
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


app.post('/api/auth/register', async (request, response, next) => {
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


app.post('/api/payment', async (request, response, next) => {
  const { token, products } = request.body
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const charge = await stripe.charges.create({
      amount: products[0].price * 100,
      currency: "usd",
      customer: customer.id,
      description: `Product Name: ${products[0].name} `,
      receipt_email: token.email,
    })
    response.status(200).send({ status: 200, charge, message: "Payment is done" })
    next()
  } catch (error) {
    response.send(error)
  }
});


app.get("/api/testing", async (req, res) => { res.send("Working") });


const PORT = process.env.PORT || 8800

app.listen(PORT, () => {
  console.log("Server is running..." + PORT)
})