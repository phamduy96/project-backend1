const mongoose = require('../config/dbConnect');
const Schema = mongoose.Schema;

var userSchma = new Schema({
    username: String,
    password: String,
    email: String,
    role: {
        type: String,
        default: 'user'
    },
    avatar: {
        type: String,
        default: "/public/img/CSS-Particles.gif"
    },
    idComment: {
        type: String,
        ref: 'comment'
    }
},{
    collection: 'user'
});
const UserModel = mongoose.model("user", userSchma)

module.exports = UserModel