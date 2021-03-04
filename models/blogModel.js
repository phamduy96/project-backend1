const mongoose = require('../config/dbConnect');
const Schema = mongoose.Schema;

var blogSchma = new Schema({
    title: String,
    introduceImg: String,
    content: String,
    image: String,
    idComment: {
        type: String,
        ref: 'comment'
    },
    idUser: {
        type: String,
        ref: 'user'
    }
},{
    collection: 'blog'
});
const BlogModel = mongoose.model("blog", blogSchma)

module.exports = BlogModel