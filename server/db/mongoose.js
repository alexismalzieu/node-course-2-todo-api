const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

console.log("**** process.env.MONGODB_URI = ", process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI).catch((err)=>{
    console.log('Cannot connect to mongoDB database', err);
});

module.exports = {
    mongoose
};
