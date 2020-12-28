const UserServices = require('../services/userServices');
var jwt = require("jsonwebtoken")
const jwtHelp = require("../util/jwtHelps");
var auth = {};
auth.checkLogin = async function (req, res, next) {
  try {
    let token = req.cookies.token
    let data = await jwtHelp.verifyJWT(token, process.env.SECRET)
    if (data) {
      UserServices.checkJWT(data.id)
        .then((result) => {
          if (result) {
            req.locals = result;
            next()
          } else {
            return res.json("sai tài khoản hoặc mật khẩu")
          }
        })
        .catch((err) => {
          return res.status(500).json({
            status: 500,
            message: "lỗi server"
          })
        })
    } else {
      return res.status(400).json({
        status: 400,
        message: "sai mã token"
      })
    }
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: "Bạn chưa đăng nhập"
    })
  }
}
module.exports = auth