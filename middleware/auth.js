const UserServices = require('../services/userServices');
const jwtHelp = require("../util/jwtHelps");
var auth = {};
auth.checkLogin = async function (req, res, next) {
  try {
    if(req.cookies.token || req.body.token){
      
    }
    let token = req.cookies.token
    console.log(token);
    let data = await jwtHelp.verifyJWT(token, process.env.SECRET)
    console.log(data);
    if (data) {
      let result = UserServices.checkJWT(data.id)
      if(result){
        req.locals = result;
          next()
      }
    }else {
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