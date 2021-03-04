const router = require('express').Router();
const BlogServices = require('../services/blogServises');

router.get("/", async (req, res) => {

    try {
        let data = await BlogServices.getBlog()
        if (data) {
            return res.status(200).json({
                status: 200,
                message: "success",
                data: data
            })
        }
        return res.status(400).json({
            status: 400,
            message: "loi",
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "không thể kết nối server",
            data: error
        })
    }
})
router.post("/", async (req, res) => {

    try {
        let data = await BlogServices.addBlog(req.body)
        if (data) {
            return res.status(200).json({
                status: 200,
                message: "Thêm blog thành công",
                data: data
            })
        }
        return res.status(400).json({
            status: 400,
            message: "loi",
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