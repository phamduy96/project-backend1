const mongoose = require('../config/dbConnect');
const Schema = mongoose.Schema;


var commentSchma = new Schema({
    content: String,
    createAt: Number,
    idUser: {
        type: String,
        ref: 'user'
    }  
},{
    collection: 'comment',
    
});

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
module.exports = CommentModel