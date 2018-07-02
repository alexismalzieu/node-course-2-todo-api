const bcrypt = require('bcryptjs');

var password = 'azerty123';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err,hash) => {
        console.log('hash: ',hash);
    });
});

var hashedPwd = '$2a$10$/G9gByLBP38meOa5IqDn7urmjhWIsYi4P.AcqmRApFblNCMJ3AahO';

bcrypt.compare(password, hashedPwd, (err, res) => {
    console.log('Result of comparison', res);
});

// const {SHA256} = require('crypto-js');
//
// const jwt = require('jsonwebtoken');
//
// var data = {
//     id: 10
// };
//
// var token = jwt.sign(data, '123azerty');
// console.log('token : ', token);
//
//
// var decoded = jwt.verify(token, '123azerty');
// console.log('decoded : ', decoded);
//
// // let msg = 'I am Groot!';
// // let hash = SHA256(msg).toString();
// //
// // console.log('msg: ', msg);
// // console.log('hash: ', hash);
//
// //
// // var data = {
// //     id: 4
// // };
// //
// // var token = {
// //     data,
// //     hash: SHA256(JSON.stringify(data) + 'some salt').toString()
// // }
// //
// // //
// // // token.data.id = 5;
// // // token.hash = SHA256(JSON.stringify(token.data)).toString()
// //
// //
// //  var resultHash = SHA256(JSON.stringify(token.data) + 'some salt').toString();
// //
// //  if (resultHash === token.hash) {
// //      console.log('Data was not changed');
// //  } else {
// //     console.log('Data was changed. Do not trust!');
// //  }
