require('dotenv').config({path:"../.env"});
const mongoose = require('mongoose');
var URL = `${process.env.DB}://${process.env.DB_HOST}/${process.env.DB_NAME}`
mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log('kết nối thành công');
});

module.exports = mongoose