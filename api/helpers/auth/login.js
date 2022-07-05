const Users = require('../../../models/auth/users')
const verifyPassword = require('../../../helpers/verify-password')
var jwt = require('jsonwebtoken');

const login = async (request, response) => {
    let userData = await Users.find({ email: request.body.email }).lean();
    if (userData.length) {
        let hashPassword = userData[0].hashPassword
        const matchPassword = await verifyPassword(request.body.password, hashPassword);
        if (!matchPassword) {
            return true
        } else {
            var privateKey = "nabha";
            let user = userData[0]
            var token = jwt.sign({ user }, privateKey, {});
            const { _id, email, firstName, lastName, createdAt } = userData[0]
            payload = { _id, email, firstName, lastName, createdAt, token }
            return payload
        }
    }
}


module.exports = login