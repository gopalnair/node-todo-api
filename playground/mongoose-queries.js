const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo}     = require('./../server/models/todo');

//var id = '5a84c4348ecbcc43f489c0b8';
// var id = '5a84c4348ecbcc43f489c0b811';

// //Check if the object ID is valid.
// if(!ObjectID.isValid(id))
// {
//     console.log('ID is not valid');
// }

//Find / query by id
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('TO Dos Array : ' , todos);
// });


// //Find a specific record/single record.
// Todo.findOne({_id:id})
//     .then((todo) => 
// {
//     if(!todo)
//         return console.log('Single TO DO - ID not found');
//     console.log('Single To DO ' , todo);
// });

//Special Case - Find by ID
// Todo.findById(id)
//     .then((todo) => {
//         if(!todo)
//         return console.log('Find By ID - ID not found');
//         console.log('Find by ID : ', todo);
//     })
//     .catch((err) =>{
//        console.log('Error finding by ID, or invalid ID');
//     });


/************************** CHALLENGE *******************/
/**** Perform same operations for users collection      */
/******* Challeng Goals : */
//1) do a find by ID from user collection
//2) 
var {User} = require('./../server/models/user');
var id = '5a8363c4efa98c1494f4d20f';
//var id = '6a8363c4efa98c1494f4d20f11'; //This is an invalid ID.

User.findById(id)
    .then((user) => {
        if(!user)
            return console.log('No User found with that ID');
        console.log('User found with ID : ' , user);
    })
    .catch ((err) => {
        console.log('Error when finding user');
    })
