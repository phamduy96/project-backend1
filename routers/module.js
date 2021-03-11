const router = require('express').Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

const storageAvatar = multer.diskStorage({
    destination: '../public/avatar',
    filename: function(req, file, cb) {
        cb(null, "avatar" + '-' + req.params.id + path.extname(file.originalname))
    }
})

const uploadAvatar = multer({
    storage: storageAvatar,
    limits: { fileSize: 1000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('file')

router.post('/profile', function (req, res, next) {
    return uploadAvatar(req, res, async (err) => {
        return res.json({
            error: false,
            name: req.file.filename,
            message: "File uploaded!",
            status: "done"
          
        })
        
    })
})

module.exports = router