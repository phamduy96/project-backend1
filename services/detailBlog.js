const BlogModel = require('../models/blogModel');
var DetailBlog = {}
DetailBlog.getById = function(id){
    return BlogModel.findOne({
        _id: id
    })
}

module.exports = DetailBlog