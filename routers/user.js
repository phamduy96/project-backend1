const router = require('express').Router();
const UserServices = require('../services/userServices');
const path = require('path')
const bcrypt = require('bcrypt');
const saltRounds = 10;
router.post("/signup",(req,res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    
    if(username == "" || password.length < 8 || email.includes('@') != true){
       return res.status(400).json({
           message: "User is invalidate"
        });
    }else{
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                req.body.password = hash;
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
            });
        });

    }
})
router.post("/", (req,res) => {
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
    UserServices.checkEmail(req.body.email)
        .then((data) => {
            if(data){
                bcrypt.compare(req.body.password, data.password, function(err, result) {
                    if(!result || err){
                        return res.status(400).json({
                            status: 400,
                            message: "Sai tài khoản hoặc mật khẩu",
                            data: data
                        })
                    }else{
                        return res.status(200).json({
                            status: 200,
                            message: "Đăng kí thành công",
                            data: data
                        })
                    }
                });
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
router.get("/", (req,res) => {
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
router.delete("/:id", (req,res) => {
    UserServices.deleteUser(req.params.id)
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
router.put('/:id', (req, res) => {
    let idParams = req.params.id;
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    if(username == "" || password.length < 8 || email.includes('@') != true){
        return res.status(400).json({
            message: "User is invalidate"
         });
    }else{
        UserServices.update(idParams, req.body)
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