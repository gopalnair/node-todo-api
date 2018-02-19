const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const { ObjectID } = require('mongodb');

const todos = [
    { _id: new ObjectID(), text: 'First test todo' },
    { _id: new ObjectID(), text: 'Second test todo' }
];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos)
            .then(() => done(), (err) => done(err));

    });
});

describe('POST / todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test to do Text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({ text })
                    .then((todos) => {
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(text);
                        done();
                    })
                    .catch((e) => done(e));
            });

        // request(app)
        // .post('/todos')
        // .send({ text })
        // //.expect(200)
        // // .expect((res) => {
        // //     expect(res.body.text).toBe(text);
        // // })
        // .end((err, res) => {
        //     if (err) {
        //         return done(err);
        //     }
        //     expect(res.status).toBe(200);
        //     expect(res.body.text).toBe(text);

        //     Todo.find()
        //         .then((todos) => {
        //             expect(todos.length).toBe(1);
        //             expect(todos[0].text).toBe(text);
        //             done();
        //         })
        //         .catch((e) => done(e));
        // });
    });

    it('should not create todo with invalid data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err)
                    return done(err);

                Todo.find()
                    .then((todos) => {
                        expect(todos.length).toBe(2);
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });

            });

    });


});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

// describe('GET /todos', () => {
//     it('should get all todos' , (done) => {
//         request(app)
//             .get('/todos')
//             .expect(200)
//             // .expect((res) => {
//             //     expect(res.body.todos.length).toBe(2);
//             // })
//             .end((err,res) => {
//                 if(err)
//                     return done(err);
//                 expect(res.body.todos.length).toBe(2);
//                 done();

//             });
//     });
// });


describe('GET /todos/:id', () => {

    it('should return todo document', (done) => {
        //send a request with a known ID and validate the result.
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);


    });

    it('should return a 404 if todo not found', (done) => {
        request(app)
            .get('/todos/5a8363c4efa98c1494f4d20f')
            .expect(404)
            .end(done);
    });


    it('should return a 404 for nonobject IDs', (done) => {
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    });


});

describe('DELETE /todos/:id', () => {

    it('should remove a todo', (done) => {
        const hexID = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexID}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexID);
            })
            .end((err, res) => {
                if (err)
                    done(err);

                //query database using find by ID, and the test pass IF the find fails.
                Todo.findById(hexID)
                    .then((todo) => {
                        expect(todo).toNotExist();
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            })

    });

    it('should return 404 if to do not found', (done) => {
        //Reqeust a Todo ID that is not present.
        request(app)
            .delete('/todos/5a8aef134f437e0560a4e450')
            .expect(404)
            .end(done);
    });


    it ('should return a 404 if object ID is invalid', (done) => {
        //Send an invalid ID
        request(app)
            .delete('/todos/1234')
            .expect(404)
            .end(done);
    });

})