const UserModel = require('../models/userModel');

var UserServices = {};


UserServices.signup = function(user){
    let {username, password, email} = user
    return UserModel.create({
        username: username,
        password: password,
        email: email
    })
}
UserServices.login = function(user){
    let {password, email} = user
    return UserModel.findOne({
        password: password,
        email: email
    })
}
UserServices.admin = function(){
    return UserModel.find({})
}

UserServices.deleteUser = function(id){
    return UserModel.deleteOne({
        _id: id
    })
}
UserServices.update = function(idParams,user){
    let {username, password, email} = user
    return UserModel.updateOne({
        _id: idParams
    },{
        username: username,
        password: password,
        email: email
    })
}

UserServices.checkEmail = function(email){
    return UserModel.findOne({
        email: email
    })
}
module.exports = UserServices