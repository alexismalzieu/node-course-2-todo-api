const env = process.env.NODE_ENV || "development";

if(env === 'development'){
    process.env.PORT = 5000;
    process.env.MONGODB_URI = 'mongodb://alexismalzieu:udemytodoapp59112@ds263740.mlab.com:63740/todoapp_udemy';
}else if (env == 'test') {
    process.env.PORT = 5000;
    process.env.MONGODB_URI = 'mongodb://alexismalzieu:udemytodoapp59112@ds121251.mlab.com:21251/test_todoapp_udemy';
}
