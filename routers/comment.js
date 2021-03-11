const router = require('express').Router();
const CommentServices = require('../services/commentServises');
const BlogServices = require('../services/blogServises');
router.post("/", async (req, res)=>{
    try {
        let idBlog = req.body.idBlog;
        let idUser = req.body.idUser;
        let content = req.body.content
        let data = await CommentServices.addComment(idUser, content);
        if(data){
            let idComment = data._id
            let result = await BlogServices.upDateIdComment(idBlog, idComment)
            if(!result){
                return res.status(400).json({
                    status: 400,
                    message: "sai thông tin id",
                })
            }
            return res.status(200).json({
                status: 200,
                message: "Thêm comment thành công",
                data: {data, result}
            })
        }
        return res.status(400).json({
            status: 400,
            message: "Sai thông tin content"
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "không thể kết nối server",
            data: error
        })
    }
})

module.exports = router