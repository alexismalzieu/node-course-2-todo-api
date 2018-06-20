const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI ||
    'mongodb://alexismalzieu:udemytodoapp59112@ds263740.mlab.com:63740/todoapp_udemy');

module.exports = {
    mongoose
};
