const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project1', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log('kết nối thành công');
});

module.exports = mongoose