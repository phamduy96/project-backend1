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
UserServices.getUser = function(){
    return UserModel.find({})
}

UserServices.deleteUser = function(id){
    return UserModel.deleteOne({
        _id: id
    })
}
UserServices.update = function(idParams,user){
    let {username, email} = user
    return UserModel.updateOne({
        _id: idParams
    },{
        username: username,
        email: email
    })
}
UserServices.updatePassword = function(id, password){
    return UserModel.updateOne({
        _id: id
    },{
        password: password
    })
}
UserServices.checkRole = function(id){
    return UserModel.findOne({
        _id: id
    })
}
UserServices.checkEmail = function(email){
    return UserModel.findOne({
        email: email
    })
}
UserServices.checkJWT = function(id){
    return UserModel.findOne({
        _id: id
    })
}
UserServices.checkUsername = function(username){
    return UserModel.findOne({
        username
    })
}
module.exports = UserServices