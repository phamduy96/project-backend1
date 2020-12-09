const router = require('express').Router();
const UserServices = require('../services/userServices');
const path = require('path')


router.post("/signup", (req,res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    if(username == "" || password.length < 8 || email.includes('@') != true){
       return res.status(400).json({
           message: "Username is invalid"
        });
    }else{
        UserServices.signup(req.body)
        .then((data) => {
            if(data){
                return res.status(200).json({
                    status: 200,
                    message: "Đăng kí thành công",
                    data: data
                })
            }
        })
        .catch((err) => {
            return res.status(500).json({
                status: 500,
                message: "Không thể kết nối với server",
                data: err
            })
        })
    }
})
router.post("/addnew", (req,res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    if(username == "" || password.length < 8 || email.includes('@') != true){
       return res.status(400).json({
           message: "Username is invalid"
        });
    }else{
        UserServices.signup(req.body)
        .then((data) => {
            if(data){
                return res.status(200).json({
                    status: 200,
                    message: "Đăng kí thành công",
                    data: data
                })
            }
        })
        .catch((err) => {
            return res.status(500).json({
                status: 500,
                message: "Không thể kết nối với server",
                data: err
            })
        })
    }
})
router.post("/login", (req,res) => {
    UserServices.login(req.body)
        .then((data) => {
            if(data){
                return res.status(200).json({
                    status: 200,
                    message: "Đăng kí thành công",
                    data: data
                })
            }else{
                return res.status(400).json({
                    status: 400,
                    message: "Sai tài khoản hoặc mật khẩu",
                    data: data
                })
            }
        })
        .catch((err) => {
            return res.status(500).json({
                status: 500,
                message: "Không thể kết nối với server",
                data: err
            })
        })
})
router.get("/admin", (req,res) => {
    UserServices.admin()
        .then((data) => {
            if(data){
                return res.status(200).json({
                    status: 200,
                    data: data
                })
            }else{
                return res.status(400).json({
                    status: 400
                })
            }
        })
        .catch((err) => {
            return res.status(500).json({
                status: 500,
                message: "Không thể kết nối với server",
                data: err
            })
        })
})
router.delete("/admin", (req,res) => {
    UserServices.deleteUser(req.body._id)
    .then((data) => {
        return res.status(200).json({
            status: 200,
            message: "Xóa thành công"
        })
    })
    .catch((err) => {
        return res.status(500).json({
            status: 500,
            message: "Không thể kết nối đến server"
        })

    })
})
router.put('/admin', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    if(username == "" || password.length < 8 || email.includes('@') != true){
        return res.status(400).json({
            message: "Username is invalid"
         });
    }else{
        UserServices.update(req.body)
        .then((data) => {
            if(data){
                return res.status(200).json({
                    status: 200,
                    message: "cập nhật thành công",
                    data: data
                })
            }else{
                return res.status(400).json({
                    status: 400,
                    message: "user is invalid"
                })
            }
        })
        .catch((err) => {
            return res.status(500).json({
                status: 500,
                message: "Không thể kết nối với server",
                data: err
            })
        })
    }
    
})
module.exports = router