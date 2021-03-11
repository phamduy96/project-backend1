const CommentModel = require('../models/commentModel');
var CommentServices = {};

CommentServices.addComment = function(idUser, content){
    return CommentModel.create({
        content: content,
        idUser: idUser
    }
    )
}


module.exports = CommentServices