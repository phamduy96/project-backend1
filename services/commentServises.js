const CommentModel = require('../models/commentModel');
var CommentServices = {};

CommentServices.addComment = function(idUser, content, createAt){
    return CommentModel.create({
        content: content,
        createAt: createAt,
        idUser: idUser
    }
    )
}


module.exports = CommentServices