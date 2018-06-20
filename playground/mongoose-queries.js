const {
    ObjectId
} = require('mongodb');

const {
    mongoose
} = require('./../server/db/mongoose');
const {
    Todo
} = require('./../server/models/todo');
const {
    User
} = require('./../server/models/user');

// var id = '16b27853f6f9b1f0fdd1b8d84';
//
// if(!ObjectId.isValid(id)){
//     console.log('ID not valid');
// }
//
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });
//
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });
//
// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('TodoById', todo);
// }).catch((err) => console.log(err));

var userID = '5b1fe403db6d691599a23f14';

User.findById(userID).then((user) => {
    if (!user) {
        return console.log('User not found');
    }
    console.log('UserById', user);
}).catch((err) => console.log(err));