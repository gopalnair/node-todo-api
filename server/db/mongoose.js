//Load Mongoose Library
var mongoose = require('mongoose');

//Mongoose support call back by default, but we can tell Mongoose to use promises
mongoose.Promise = global.Promise;

//Connect to Mongo DB - This uses mongodb protocol (mongodb://)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose
};