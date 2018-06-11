//const MongoClient = require('mongodb').MongoClient;
const {
    MongoClient,
    ObjectID
} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log(err, 'Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');


    // db.collection('Todos').deleteMany({
    //     text: 'eat lunch'
    // }).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Todos').deleteOne({
    //     text: 'eat lunch'
    // }).then((result) => {
    //     console.log(result);
    // });    //

    // db.collection('Todos').findOneAndDelete({
    //     completed: false
    // }).then((result) => {
    //     console.log(result);
    // });
    //

    // db.collection('Users').deleteMany({
    //     name: 'Alex'
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5b1d9e0f2244a2083bdf971d')
    }).then((result) => {
        console.log(result);
    });



    client.close();

});