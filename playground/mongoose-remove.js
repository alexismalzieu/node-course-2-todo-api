const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove({_id: '5b2a7a55aa12040014bcd381'}).then((result) => {
//     console.log(result);
// });
//
// Todo.findByIdAndRemove('5b2a7a55aa12040014bcd381').then((doc) => {
//     console.log(doc);
// });
