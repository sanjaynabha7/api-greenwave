const Users = require('../../../models/auth/users')
const hashPassword = require('../../../helpers/hash-password')

const register = async (request, response) => {

    let payload = request.body
    let hasValue = await Users.find({ email: request.body.email });
    if (hasValue.length) return true
    let password = await hashPassword(request.body.password)
    payload = {
        ...request.body,
        hashPassword: password
    }
    return await Users.create(payload);

}


module.exports = register