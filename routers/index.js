const router = require('express').Router();
const path = require('path')
const Auth = require("../middleware/auth")
router.get('/home', (req,res) => {
    res.sendFile(path.join(__dirname, '../views/home.html'))
})
router.get('/signup', (req,res) => {
    res.sendFile(path.join(__dirname, '../views/signup.html'))
})
router.get('/addnew', (req,res) => {
    res.sendFile(path.join(__dirname, '../views/addnew.html'))
})
router.get("/login", (req,res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'))
})

router.use(Auth.checkLogin)
router.get("/", (req,res) => {
   if(req.locals.role == "admin"){
    return res.sendFile(path.join(__dirname, '../views/admin.html'))
   }
   if(req.locals.role == "manager"){
    return res.sendFile(path.join(__dirname, '../views/manager.html'))
   }
   return res.sendFile(path.join(__dirname, '../views/user.html'))
})

module.exports = router