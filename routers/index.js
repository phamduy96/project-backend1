const router = require('express').Router();
const path = require('path')

router.get('/', (req,res) => {
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
router.get("/admin", (req,res) => {
    res.sendFile(path.join(__dirname, '../views/admin.html'))
})

module.exports = router