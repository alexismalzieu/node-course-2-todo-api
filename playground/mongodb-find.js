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

    // db.collection('Todos').find({
    //     _id: new ObjectID('5b1e59431779680338e10970')
    // }).toArray().then((docs) => {
    //
    //
    //     console.log(JSON.stringify(docs, undefined, 2));
    //
    // }, (err) => {
    //     console.log('Unable to fetch Todos', err);
    // });
    //
    // db.collection('Todos').find().count().then((count) => {
    //
    //     console.log(`Todos count ${count}`);
    //
    // }, (err) => {
    //     console.log('Unable to fetch Todos', err);
    // });


    db.collection('Users').find({
        name: 'Alex'
    }).toArray().then((results) => {

        console.log('Users');
        console.log(JSON.stringify(results, undefined, 2));

    }, (err) => {
        console.log('Unable to fetch Todos', err);
    });

    db.collection('Users').find({
        name: 'Alex'
    }).count().then((count) => {

        console.log(`Todos count ${count}`);

    }, (err) => {
        console.log('Unable to fetch Todos', err);
    });

    client.close();

});