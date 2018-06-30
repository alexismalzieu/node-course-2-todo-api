const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI)
.then((connection) => {
        console.log('Connected to MongoDB')
    })
.catch((err)=>{
    console.log('Cannot connect to mongoDB database', err);
});

module.exports = {
    mongoose
};
