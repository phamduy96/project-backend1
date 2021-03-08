var env = require('dotenv').config();
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser')
app.use(cookieParser())
const cors = require("cors")
app.use(cors())
const path = require('path');
var jwt = require('jsonwebtoken');
app.use(express.static(path.join(__dirname, 'public')))
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var Userrouter = require('./routers/user')
var Indexrouter = require('./routers/index')
var Blogrouter = require('./routers/blog')
var Commentrouter = require('./routers/comment')
var DetailBlog = require('./routers/detailBlog')



app.use('/user', Userrouter)
app.use('/blog',Blogrouter)
app.use('/comment', Commentrouter)
app.use('/detail-blog',DetailBlog )
app.use('/', Indexrouter)

app.listen(process.env.PORT, function(){
    console.log('success');
})