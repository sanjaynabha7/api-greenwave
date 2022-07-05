const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    hashPassword: String,
}, { timestamps: { currentTime: () => Date.now() } });

module.exports = model('Users', UserSchema)

