const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const { ObjectID } = require('mongodb');

const todos = [
    { _id: new ObjectID(), text: 'First test todo' },
    { _id: new ObjectID(), text: 'Second test todo', completed:true, completedAt:333 }
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

/************* EXERCISE CHALLENGE - Create test case for PATCH ********************/
describe('PATCH /todo/:id' , () => {
    it('should update the todo' , (done) => {
        //Grab ID of first item & update text, set completed true
        //Make 2 assertions. One fr status = 200, then second custom assertion which:
        // 1) verifies text that is changed
        // 2) Verifies completed is set to true
        // 3) Verifies completedAt is a number.
        var id = todos[0]._id.toHexString();
        var text = 'Validate Completed Text';
        request(app)
            .patch(`/todos/${id}`)
            .send({completed:true, text})
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
                //done();
            })  
            .end(done)
    });

     it('should clear completed At when todo is not completed' , (done) => {
        var id = todos[1]._id.toHexString();
        var text = 'Validate Null for complted set to false'
        request(app)
            .patch(`/todos/${id}`)
            .send({completed:false, text})
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
                expect(res.body.todo.text).toBe(text);
            })
            .end(done);
     });
});
