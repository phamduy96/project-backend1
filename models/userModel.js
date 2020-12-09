const mongoose = require('../config/dbConnect');
const Schema = mongoose.Schema;

var userSchma = new Schema({
    username: String,
    password: String,
    email: String,
},{
    collection: 'user'
});

const UserModel = mongoose.model("user", userSchma)


module.exports = UserModel