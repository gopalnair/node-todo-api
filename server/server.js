
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

//Get Object ID -  This is for challenge, and to check if the passed Object ID is valid.
var { ObjectID } = require('mongodb');


var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

//For heroku
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });


    todo.save()
        .then((doc) => {
            res.send(doc);
        }, (error) => {
            res.status(400);
            res.send(error);
        });

});

/***************************** CHALLENGE : Section 7, Lecture 78 *****************************/
/*************************************** CHALLENGE GOALS *****************************/
/********* Create a new GET route to get a specific todo, which will be specified with a "id" parameter. */
// 1) Check if the id passed is valid. If not, send back a 404 error, along with empty body.
// 2) Query the database, and try to find the ID. 
// 3) If the todo with that id was found, send back that todo object.
// 4) If the todo was NOT found, send back a 404 error message with empty body
// 5) If there was an error encountered, send back a status 400, along with an empty body.
/*************************************** END CHALLENGE GOALS *****************************/
//Set Up a route which gets a single TODO. The ID of todo is passed as a GET parameter.
app.get('/todos/:id', (req, res) => {
    //console.log(req);
    //console.log(id);
    //res.send(req.params);

    //Check if the ID that was sent in is valid.
    if (!ObjectID.isValid(req.params.id)) {
        //The object ID that was passed in is invalid. 
        //Return back status 404, along with empty body
        //console.log('Invalid todo ID received... setting status to 404, and returning empty body');
        res.status(404);
        return res.send({});
    }

    //If execution reach here, then passed ID was valid, and proceed to find.
    Todo.findById(req.params.id)
        .then((todo) => {
            //Check if the user was found. Remember that if the user was not found with that ID, there will NOT be an error, 
            // rather, there will be a null object retured. So, we check if the value in promise resolve (.then()) is null, and if
            // yes, send back 404 response. If found, we send the object itself.
            if (!todo) {
                //console.log('Valid todo ID received, but NO todo with ID found... setting status to 404, and returning empty body');
                res.status(404);
                return res.send({});
            }

            //If execution reach here, a valid todo was found. Send back the user.
            //console.log('Valid todo ID received, Valid todo found... returning the todo object');
            return res.send({ todo });


        }, (error) => {
            //If an error occured, send back a 400 status with empty body
            //console.log('Valid ID received, but error occured during find operation... setting status to 400, and returning empty body');
            res.status(400);
            return res.send({});
        });




});



//Set up a route to get all TODOs - Note - this is WITHOUT any parameters.
app.get('/todos', (req, res) => {
    Todo.find()
        .then((todos) => {
            res.send({ todos });
        }, (error) => {
            res.status(400);
            res.send(error);
        });

});


/************* Delete Operation ****************/
app.delete('/todos/:id', (req, res) => {
    //Get the ID
    var id = req.params.id;

    //Validate if this is a valid ID.
    if (!ObjectID.isValid(id))
        return res.status(404).send({});

    Todo.findByIdAndRemove(id)
        .then((todo) => {
            if (!todo)
                return res.status(404).send({});

            return res.send({ todo });

        })
        .catch((error) => {
            res.status(400).send({ error });
        })


});

/********************* Update Todo items using PATCH ************/
app.patch('/todos/:id', (req, res) => {
    //console.log(req);
    var id = req.params.id;
    //Use pick method of lodash to get only attributes we need.
    var body = _.pick(req.body, ['text', 'completed']);

    //If the object ID is invalid, send back 404, along with empty body.
    if (!ObjectID.isValid(id))
        return res.status(404).send({});


    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then((todo) => {
            if (!todo)
                return res.status(404).send();

            res.send({ todo });
        })
        .catch((error) => {
            res.status(404).send();
        });



})

/************************************************USERS Operations ****************************/
//1) POST User --> Create a new user
app.post('/users', (req, res) => {
    //Extract email and password from request body using lodash
    var body = _.pick(req.body, ['email', 'password']);

    //Create a new User object.
    var user = new User(body);

    //Save the user to database.
    user.save()
        .then((user) => {
            return res.send({ user });
        })
        .catch((error) => {
            return res.status(400).send({error});
        });

});




app.listen(port, () => {
    console.log(`Started on Port ${port}`);

});


module.exports = { app }