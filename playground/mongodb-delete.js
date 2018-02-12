//const {MongoClient, ObjectID} = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to Mongo DB server');
    }

    console.log('Connected to MongoDB Server');
  
//The 3 methods to delete data are:
//1) deleteMany
//2) deleteOne
//3) findOneAndDelete


//1: deleteMany
// db.collection('Todos').deleteMany({text:'Eat Lunch'})
//     .then((result) => {
//         console.log(result);
//     });


//2: deleteOne
// db.collection('Todos').deleteOne({text:'Eat Lunch'})
//     .then((result) => {
//         console.log(result);
//     });

//3: findOneAndDelete
// db.collection('Todos').findOneAndDelete({completed:false})
//     .then((result) => {
//         console.log(result);
//     });

/************************** Exercise ***********************/
//Use deleteMany to delete all records from Users collection, with name "Gopal"
// db.collection('Users').deleteMany({name:'Gopal'})
//     .then((results) => {
//         console.log(results);
//     });

//Use ID to delete a specific record
db.collection('Users').findOneAndDelete({_id: new ObjectId('5a81d4984961701c50c395aa')})
    .then((result) => {
        console.log(result);
    })
    .catch((error)=> {
        console.log(error);
    });
    

    //db.close();
});