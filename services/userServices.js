const UserModel = require('../models/userModel');
var UserServices = {};

UserServices.signup = function (user) {
    let { username, password, email } = user
    return UserModel.create({
        username: username,
        password: password,
        email: email
    })
}
UserServices.login = function (user) {
    let { password, email } = user
    return UserModel.findOne({
        password: password,
        email: email
    }, {
        username: 1,
        email: 1,
        role: 1
    })
}
UserServices.getUser = function () {
    return UserModel.find({
    }, {
        username: 1,
        email: 1,
        role: 1
    })
}
UserServices.getDetailUser = function (id) {
    return UserModel.findOne({
        _id: id
    }, {
        username: 1,
        email: 1,
        role: 1
    })
}
UserServices.deleteUser = function (id) {
    return UserModel.deleteOne({
        _id: id
    })
}
UserServices.update = function (idParams, user) {
    let { username, password, email } = user
    return UserModel.updateOne({
        _id: idParams
    }, {
        username: username,
        password: password,
        email: email
    })
}
UserServices.updateWhithoutEmail = function (idParams, user) {
    let { username, password } = user
    return UserModel.updateOne({
        _id: idParams
    }, {
        username: username,
        password: password
    })
}
UserServices.checkRole = function (id) {
    return UserModel.findOne({
        _id: id
    })
}
UserServices.checkEmail = function (email) {
    return UserModel.findOne({
        email: email
    })
}
UserServices.checkJWT = function (id) {
    return UserModel.findOne({
        _id: id
    })
}
UserServices.checkUsername = function (username) {
    return UserModel.findOne({
        username
    })
}
module.exports = UserServices