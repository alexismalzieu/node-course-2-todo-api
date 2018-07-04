const {ObjectId} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo')
const {User} = require('./../../models/user')

const userOneId = new ObjectId();
const userTwoId = new ObjectId();

const users = [{
    _id: userOneId,
    email: 'alex@example.com',
    password: 'user1PWD',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'secret').toString(),
    }]
}, {
    _id: userTwoId,
    email: 'alex.malz@example.com',
    password: 'user2PWD',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userTwoId, access: 'auth'}, 'secret').toString(),
    }]
}];

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne,userTwo]);
    }).then(() => done());
};

const todos = [{
    text: 'First test todo',
    _id: new ObjectId(),
    _creator: userOneId
},{
    text: 'Second test todo',
    _id: new ObjectId(),
    completedAt: 453,
    _creator: userTwoId
},{
    text: 'Thrid test todo',
    _id: new ObjectId(),
    _creator: userOneId
}];


const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};
