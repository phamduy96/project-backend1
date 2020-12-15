// const UserServices = require('../services/userServices');
// var auth = {};

// auth.checkUser = function (req, res, next) {
//     UserServices.signup(req.body)
//         .then((data) => {
//             if (data) {
//                 return res.status(200).json({
//                     status: 200,
//                     message: "Đăng kí thành công",
//                     data: data
//                 })
//             }
//         })
//         .catch((err) => {
//             return res.status(500).json({
//                 status: 500,
//                 message: "Không thể kết nối với server",
//                 data: err
//             })
//         })
// }
// module.exports = auth