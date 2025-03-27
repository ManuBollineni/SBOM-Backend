var mongoose = require('mongoose');
var keys = require('./keys');

exports.connect = () => {
    mongoose.connect(keys.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));
}

