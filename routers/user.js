const router = require('express').Router();
const UserServices = require('../services/userServices');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwtHelp = require('../util/jwtHelps');

router.get("/", (req, res) => {
    let PAGE = req.query.page;
    const PAGESIZE = 4;
    if(PAGE){
        PAGE = parseInt(PAGE);
        UserServices.getUser()
        .skip((PAGE -1) * PAGESIZE)
        .limit(PAGESIZE)
        .then((data) => {
            if(data){
                return res.status(200).json({
                    status: 200,
                    message: "thành công",
                    data: data
                })
            }else{
                return res.status(400).json({
                    status: 400,
                    message: "lỗi",
                    data: data
                })
            }
        })
        .catch((err) => {
            return res.status(500).json({
                status: 500,
                message: "không thể kết nối",
                data: err
            })
        })
    }else{
        UserServices.getUser()
        .then((data) => {
            let pageNumber = Math.ceil(data.length/4);
            if(data){
                return res.status(200).json({
                    status: 200,
                    total: pageNumber,
                    message: "thành công",
                    data: data
                })
            }else{
                return res.status(400).json({
                    status: 400,
                    message: "lỗi",
                    data: data
                })
            }
        })
        .catch((err) => {
            return res.status(500).json({
                status: 500,
                message: "không thể kết nối",
                data: err
            })
        })
    }
    
})
router.post("/signup", async (req,res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    
    if(username == "" || password.length < 8 || email.includes('@') != true){
       return res.status(400).json({
           status: 400,
           message: "tài khoản không hợp lệ"
        });
    }
    let user = await UserServices.checkUsername(req.body.username);
    if(user){
        return res.status(400).json({
            status: 400,
            message: "user đã tồn tại"
        })
    }
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
})
router.post("/login", async (req,res) => {
    try{
        var user = await UserServices.checkEmail(req.body.email);
        if(user){
            bcrypt.compare(req.body.password, user.password, async function(err, result) {
                if(!result || err){
                    return res.status(400).json({
                        status: 400,
                        message: "Sai tài khoản hoặc mật khẩu",
                        data: user
                    })
                }
                var token = await jwtHelp.generrateJWT({id: user._id}, process.env.SECRET, '7d')
                return res.status(200).json({
                    status: 200,
                    message: "Đăng nhập thành công",
                    data: token
                })
            })
        }else{
            return res.status(400).json({
                status: 400,
                message: "Sai tài khoản hoặc mật khẩu",
                data: user
            })
        }
    }catch(err){
        return res.status(400).json({
            status: 400,
            message: "Sai tài khoản hoặc mật khẩu abc",
            data: user
        })
    }
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
router.put('/password/:id', (req, res) => {
    let id = req.params.id;
    let password = req.body.password;
    if(password.length < 8){
        return res.status(400).json({
            message: "password phải lớn hơn 8 ký tự"
         });
    }else{
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
            UserServices.updatePassword(id, hash)
            .then((data) => {
                if(data){
                    return res.status(200).json({
                        status: 200,
                        message: "cập nhật thành công",
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
router.put('/:id', (req, res) => {
    let idParams = req.params.id;
    let username = req.body.username;
    let email = req.body.email;
    if(username == "" || email.includes('@') != true){
        return res.status(400).json({
            message: "Cập nhật lại tài khoản"
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
                    message: "Sai tài khoản hoặc mật khẩu"
                })
            }
        })
        .catch((err) => {
            return res.status(500).json({
                status: 500,
                message: "Không thể kết nối với server r",
                data: err
            })
        })
    }
    
})
router.post("/logout", (req, res) => {
    token = req.cookies.token
    return res.json({
        data: token
    })
})
router.get("/data", (req, res) => {
    return res.json({
        result: [{
            id: 1,
            name: 'duy',
            age: 24,
            email: "pvd@gmail.com"
        },
        {
            id: 2,
            name: "a",
            age: 299,
            email: "299@gmail.com"
        },
        {
            id: 3,
            name: "b",
            age: 9,
            email: "b@gmail.com"
        },
        {
            id: 4,
            name: "c",
            age: 39,
            email: "c@gmail.com"
        },
        {
            id: 5,
            name: "d",
            age: 29,
            email: "d@gmail.com"
        }

        ]
    })
})
module.exports = router