var express = require('express');
var app = express();
const routerUser = require('./routers/user')
const bodyParser = require('body-parser');
const routerIndex = require('./routers/index');
const path = require("path");
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.use('/user', routerUser)
app.use('/', routerIndex)
app.listen(3000, () => {
    console.log('Tạo server thành công');
})