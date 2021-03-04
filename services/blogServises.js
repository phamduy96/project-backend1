const BlogModel = require('../models/blogModel');
var BlogServices = {}

BlogServices.getBlog = function(){
    return BlogModel.find({})
}
BlogServices.addBlog = function (blog) {
    let { title, introduceImg, content, image } = blog
    return BlogModel.create({
        title: title,
        introduceImg: introduceImg,
        content: content,
        image: image,
    })
}
module.exports = BlogServices