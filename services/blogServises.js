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
BlogServices.upDateIdComment = function (idBlog, idComment) {
    return BlogModel.updateOne({
        _id: idBlog
    },{
        $push: {idComment: idComment}
    })
}
BlogServices.getComments = function(idBlog){
    return BlogModel.find({
        _id: idBlog
    }).populate(
        "idComment"
    ).populate({
        path: "idComment",
        populate: {path: "idUser"}
    })
}
module.exports = BlogServices