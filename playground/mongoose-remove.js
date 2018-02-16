const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo}     = require('./../server/models/todo'); 
const {User} = require('./../server/models/user');

//Use remove method with empty object to REMOVE ALL records from collection.
Todo.remove({})
    .then((doc) => {
        console.log('Removed all TODOs : ', doc);
    }, (err) => {
        console.log('Error removing all records : ', err)
    });