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
    idComment: {
        type: String,
        ref: 'comment'
    }
},{
    collection: 'user'
});
var commentSchma = new Schema({
    content: String
},{
    collection: 'comment'
});
const UserModel = mongoose.model("user", userSchma)
const CommentModel = mongoose.model("comment", commentSchma)

// UserModel.findByIdAndUpdate("5fe06030f818a42d30f222ad",{
//     idComment: "5fe06514553b3c2a604970ae"
// },{
//     new: true
// }).then((data) => {
//     console.log(data);
// })

// UserModel.findOne({
//     _id: "5fe06030f818a42d30f222ad"
// }).populate("idComment")
// .then((data) => {
//     console.log(data);
// })

// for(i = 0; i < 15; i++){
//     UserModel.create({
//         username: "thuy",
//         password: "11111111",
//         email: "thuy@",
//         role: "manager"
//     }).then((data) => {
//     })
// }
module.exports = UserModel