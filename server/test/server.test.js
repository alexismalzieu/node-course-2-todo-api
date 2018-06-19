const expect = require('chai').expect
const request = require('supertest');
const {ObjectId} = require('mongodb');

const {app} = require('./../server')
const {Todo} = require('./../models/todo')
const {User} = require('./../models/user')

const todos = [{
    text: 'First test todo',
    _id: new ObjectId()
},{
    text: 'Second test todo',
    _id: new ObjectId()
},{
    text: 'Thrid test todo',
    _id: new ObjectId()
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

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
            .end(done)

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