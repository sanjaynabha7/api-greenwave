const express = require('express');
const cors = require('cors')
const mongoose = require("mongoose");
var jwt = require('jsonwebtoken');
const routs = require('../api/router')

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

// // Required all API
app.use("/api", verifyToken, routs)

app.get("/api/testing", (req, res) => res.send("Passed the test!!!"));


const PORT = process.env.PORT || 8800

app.listen(PORT, () => {
  console.log("Server is running..." + PORT)
})