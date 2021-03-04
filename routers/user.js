const router = require('express').Router();
const UserServices = require('../services/userServices');
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwtHelp = require('../util/jwtHelps');

// router.get("/", (req, res) => {
//     let PAGE = req.query.page;
//     const PAGESIZE = 4;
//     if(PAGE){
//         PAGE = parseInt(PAGE);
//         UserServices.getUser()
//         .skip((PAGE -1) * PAGESIZE)
//         .limit(PAGESIZE)
//         .then((data) => {
//             if(data){
//                 return res.status(200).json({
//                     status: 200,
//                     message: "thành công",
//                     data: data
//                 })
//             }else{
//                 return res.status(400).json({
//                     status: 400,
//                     message: "lỗi",
//                     data: data
//                 })
//             }
//         })
//         .catch((err) => {
//             return res.status(500).json({
//                 status: 500,
//                 message: "không thể kết nối",
//                 data: err
//             })
//         })
//     }else{
//         UserServices.getUser()
//         .then((data) => {
//             let pageNumber = Math.ceil(data.length/4);
//             if(data){
//                 return res.status(200).json({
//                     status: 200,
//                     total: pageNumber,
//                     message: "thành công",
//                     data: data
//                 })
//             }else{
//                 return res.status(400).json({
//                     status: 400,
//                     message: "lỗi",
//                     data: data
//                 })
//             }
//         })
//         .catch((err) => {
//             return res.status(500).json({
//                 status: 500,
//                 message: "không thể kết nối",
//                 data: err
//             })
//         })
//     }

// })
router.get("/", async (req, res) => {
    try {
        let result = await UserServices.getUser()
        if (result) {
            return res.status(200).json({
                status: 200,
                message: "thành công",
                data: result
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "không thể kết nối server",
            data: error
        })
    }
})
router.get("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let result = await UserServices.getDetailUser(id)
        if (result) {
            return res.status(200).json({
                status: 200,
                message: "thành công",
                data: result
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "không thể kết nối server",
            data: error
        })
    }
})
router.post("/signup", async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    if (username == "" || password.length < 8 || email.includes('@') != true) {
        return res.status(400).json({
            status: 400,
            message: "Username không được để trống, Password có ít nhất 8 kí tự, Email phải chứa @"
        });
    }
    try {
        let user = await UserServices.checkEmail(req.body.email);
        if (user) {
            return res.status(400).json({
                status: 400,
                message: "user đã tồn tại"
            })
        }
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(req.body.password, salt, async function (err, hash) {
                req.body.password = hash;
                let result = await UserServices.signup(req.body)
                if (result) {
                    return res.status(200).json({
                        status: 200,
                        message: "Đăng kí thành công",
                        data: result
                    })
                }
                return res.status(500).json({
                    status: 500,
                    message: "Không thể kết nối với server",
                    data: err
                })
            });
        });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: "Không thể kết nối với server",
        })
    }
})
router.post("/login", async (req, res) => {
    try {
        var user = await UserServices.checkEmail(req.body.email);
        if (user) {
            bcrypt.compare(req.body.password, user.password, async function (err, result) {
                if (!result || err) {
                    return res.status(400).json({
                        status: 400,
                        message: "Sai tài khoản hoặc mật khẩu"
                    })
                }
                var token = await jwtHelp.generrateJWT({ id: user._id }, process.env.SECRET, '7d')
                return res.status(200).json({
                    status: 200,
                    message: "Đăng nhập thành công",
                    data: token
                })
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: "Sai tài khoản hoặc mật khẩu"
            })
        }

    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Không có kết nối server",
            data: error
        })
    }
})
router.delete("/:id", async (req, res) => {
    try {
        let result = await UserServices.deleteUser(req.params.id)
        return res.status(200).json({
            status: 200,
            message: "Xóa thành công",
            data: result
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Không thể kết nối đến server",
            data: error
        })
    }
})
router.put('/:id', async (req, res) => {
    let idParams = req.params.id;
    let username = req.body.username;
    let password = req.body.password;
    if (req.body.email) {
        let email = req.body.email;
        if (username == "" || password.length < 8 || email.includes('@') != true) {
            return res.status(400).json({
                message: `Username không được để trống, Password có ít nhất 8 ký tự, Email phải chứa @`
            });
        }
        try {
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(req.body.password, salt, async function (err, hash) {
                    req.body.password = hash;
                    let result = await UserServices.update(idParams, req.body)
                    if (result) {
                        return res.status(200).json({
                            status: 200,
                            message: "Cập nhật thành công",
                            data: result
                        })
                    }
                    return res.status(500).json({
                        status: 500,
                        message: "Không thể kết nối với server",
                        data: err
                    })
                });
            });

        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Không thể kết nối với server",
                data: error
            })
        }
    } else {
        if (username == "" || password.length < 8) {
            return res.status(400).json({
                message: `Username không được để trống, Password có ít nhất 8 ký tự`
            });
        }
        try {
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(req.body.password, salt, async function (err, hash) {
                    req.body.password = hash;
                    let result = await UserServices.updateWhithoutEmail(idParams, req.body)
                    if (result) {
                        return res.status(200).json({
                            status: 200,
                            message: "Cập nhật thành công",
                            data: result
                        })
                    }
                    return res.status(500).json({
                        status: 500,
                        message: "Không thể kết nối với server",
                        data: err
                    })
                });
            });

        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Không thể kết nối với server",
                data: error
            })
        }
    }

})
router.post("/logout", (req, res) => {
    return res.json({
        message: "logout success"
    })
})
router.post('/checkJwt', async (req, res) => {
    token = req.headers.authorization.token
    console.log(token);
})

module.exports = router