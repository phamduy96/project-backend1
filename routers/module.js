const router = require("express").Router()
const multer = require("multer");
const path = require('path');
const { checkLogin } = require("../middleware/auth");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storage });

var uploadMultiple = upload.fields([{ name: 'file', maxCount: 1 }])


router.post('/uploadfile', uploadMultiple, function (req, res, next) {

    if(req.files){
        console.log(req.files.file[0].filename)
        if(process.env.NODE_ENV === "dev"){
          return res.json(process.env.URL_SERVER_LOCAL+"uploads/"+req.files.file[0].filename)
        }else{
          return res.json(process.env.URL_SERVER_APP+""+req.files.filename)
        }
    }
    
})

module.exports = router

