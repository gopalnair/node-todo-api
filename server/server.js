
//Load Mongoose Library
var mongoose = require('mongoose');

//Mongoose support call back by default, but we can tell Mongoose to use promises
mongoose.Promise = global.Promise;

//Connect to Mongo DB - This uses mongodb protocol (mongodb://)
mongoose.connect('mongodb://localhost:27017/TodoApp');

//Create new Model
var Todo = mongoose.model('Todo', {
    text: {
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    completed: {
        type: Boolean,
        default:false
    },
    completedAt:{
        type: Number,
        default:null
    }
});

// //Create a new ToDo
// var newTodo = new Todo({
//     text:'Cook Dinner'
// });

// //Save this to database by calling save.
// newTodo.save()
//     .then((doc) => {
//         console.log('Saved to do : ' , doc);
//     }, (err) => {
//         console.log('Unable to save the new TODO');
//     });

//Create a new To do with all attributes.
// var newFullToDo = new Todo(
//     {
//         text: 'Complete Exercise',
//         completed:false,
//         completedAt: new Date().getUTCSeconds()
//     }
// );

// //Save the ToDo document.
// newFullToDo.save()
//     .then((doc) => {
//         console.log('New To do saved : ' , doc);
//     }, (err) => {
//         console.log('Unable to save : ', err);
//     });


/******************* Exercise - Create User Model and Create a new User **************/
var userModel = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim:true,
        min:1
    }
});

var newUser = new userModel({
    email:'      gopal.nair@gmail.com      '
});

// var newUser = new userModel({
//     email:' '
// });
//Save the new user, and handle the promise.
newUser.save()
    .then((user) => {
        console.log('New User Created : ' , user);
    }, (error)=> {
        console.log('Unable to create new user : ', error)
    });