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
UserServices.getUser = function () {
    return UserModel.find({
    }, {
        _id: 1,
        phone: 1,
        avatar: 1,
        username: 1,
        email: 1,
        role: 1
    })
}
UserServices.getDetailUser = function (id) {
    return UserModel.findOne({
        _id: id
    }, {
        _id: 1,
        phone: 1,
        avatar: 1,
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
    },{
        username,
        password,
        email
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
UserServices.checkEmail = function (email) {
    return UserModel.findOne({
        email: email
    },)
}
UserServices.checkJWT = function (id) {
    return UserModel.findOne({
        _id: id
    })
}
UserServices.updateAvatar = function(idParam, urlAvarta){
    return UserModel.update({
        _id: idParam
    },{
        avatar: urlAvarta
    })
}
UserServices.updatePhone = function(idParam, phoneNumber){
    return UserModel.update({
        _id: idParam
    },{
        phone: phoneNumber
    })
}
module.exports = UserServices