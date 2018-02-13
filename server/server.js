
//Load Mongoose Library
var mongoose = require('mongoose');

//Mongoose support call back by default, but we can tell Mongoose to use promises
mongoose.Promise = global.Promise;

//Connect to Mongo DB - This uses mongodb protocol (mongodb://)
mongoose.connect('mongodb://localhost:27017/TodoApp');

//Create new Model
var Todo = mongoose.model('Todo', {
    text: {
        type:String
    },
    completed: {
        type: Boolean
    },
    completedAt:{
        type: Number
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
var newFullToDo = new Todo(
    {
        text: 'Complete Exercise',
        completed:false,
        completedAt: new Date().getUTCSeconds()
    }
);

//Save the ToDo document.
newFullToDo.save()
    .then((doc) => {
        console.log('New To do saved : ' , doc);
    }, (err) => {
        console.log('Unable to save : ', err);
    });
