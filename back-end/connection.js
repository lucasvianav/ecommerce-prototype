var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sa-shrek', {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose.connection;