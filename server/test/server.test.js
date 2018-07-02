const expect = require('chai').expect
const request = require('supertest');
const {ObjectId} = require('mongodb');
const config = require('./../config/config.js');

const {app} = require('./../server')
const {Todo} = require('./../models/todo')
const {User} = require('./../models/user')
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);


describe('POST/todos', () => {

    it('should create a new todo', (done) => {
        var text = 'Text todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).to.equals(text);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).to.equals(1);
                    expect(todos[0].text).to.equals(text);
                    done()
                }).catch((err) => done(err));

            })
    });

    it('should not create todo with invalid body data', (done) =>{
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).to.equals(3);
                    done()
                }).catch((err) => done(err));

            })
    });

});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).to.equals(3);
            })
            .end(done);
    })
});

describe('GET /todos/:id', () => {

    it('should return todo doc', (done) => {

        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).to.equals(todos[0].text)
            })
            .end(done);
    });

    it('should return a 404 is todo not found', (done) => {

        let testId = new ObjectId().toHexString()

        request(app)
            .get(`/todos/${testId}`)
            .expect(404)
            .end(done);
    });

    it('should return a 404 for non-object ids', (done) => {

        request(app)
            .get(`/todos/123}`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {

    it('should remove a todo', (done) => {

        let testId = todos[1]._id.toHexString()


        request(app)
            .delete(`/todos/${testId}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo._id).to.equals(testId)
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }

            Todo.findById(testId).then((todo) => {
                expect(todo).to.not.exist;
                done();
            }).catch((e) => done(e));

            });
    });

    it('should return 404 if todo not found', (done) => {
        let testId = new ObjectId().toHexString();

        request(app)
            .delete(`/todos/${testId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if object id is invalid', (done) => {
        request(app)
            .get(`/todos/123}`)
            .expect(404)
            .end(done);
    });

});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        const testId = todos[0]._id.toHexString();
        const text = 'This should be the new test';

        request(app)
            .patch(`/todos/${testId}`)
            .send({
                completed: true,
                text
            })
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).to.equals(text);
                expect(res.body.todo.completed).to.equals(true);
                expect(res.body.todo.completedAt).to.be.a('number');

            })
            .end(done);

    });

    it('should clear completedAt when todo is not completed', (done) => {
        const testId = todos[1]._id.toHexString();
        const text = 'This should be the new test';

        request(app)
            .patch(`/todos/${testId}`)
            .send({
                completed: false,
                text
            })
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).to.equals(text);
                expect(res.body.todo.completed).to.equals(false);
                expect(res.body.todo.completedAt).to.not.exist;

            })
            .end(done);


    });
});

describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).to.equals(users[0]._id.toHexString());
                expect(res.body.email).to.equals(users[0].email);
            })
            .end(done);
    });

    it('should return a 401 if not authenticated', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
                expect(res.body).to.deep.equals({});
            })
            .end(done)
    });

});

describe('POST /users', () => {

    it('should create a user', (done) => {
        var email = 'example@test.com';
        var password = '123azer';

        request(app)
        .post('/users')
        .send({email,password})
        .expect(200)
        .expect((res) => {
            expect(res.headers['x-auth']).to.exist;
            expect(res.body._id).to.exist;
            expect(res.body.email).to.equals(email);
        })
        .end((err) => {
            if(err){
                return done(err);
            }
            User.findOne({email}).then((user) => {
                expect(user).to.exist;
                expect(user.password).to.not.equals(password);
                done();
            });
        });
    });

    it('should return validation errors is request invalid', (done) => {
        var email = 'exampletest.com';
        var password = '123';

        request(app)
        .post('/users')
        .send({email,password})
        .expect(400)
        .end(done);
    });

    it('should not create user if email is use', (done) => {
        var email = 'alex@example.com';
        var password = '123azer';

        request(app)
        .post('/users')
        .send({email,password})
        .expect(400)
        .end(done);
    });

});
