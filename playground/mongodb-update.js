//const {MongoClient, ObjectID} = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to Mongo DB server');
    }

    console.log('Connected to MongoDB Server');
  
    // db.collection('Todos').findOneAndUpdate({_id: new ObjectId('5a81cf1c4961701c50c395a9')}, 
    //     {
    //         $set: {completed:true}
    //     }, {returnOriginal:false})

    //     .then((result) => {
    //         console.log(result);
    //     });


    /********** Exercise - Update User collection with my name, and increment age by 1. */

    db.collection('Users').findOneAndUpdate({_id: new ObjectId('5a81d4d54961701c50c395ab')},
        {
            $set: {name:'Gopal'},
            $inc: {'age':1}  
        }, 
        {returnOriginal:false}
        ).then((result) => {
            console.log(result);
        })
        


  //{"_id":"5a81d4d54961701c50c395ab","name":"Shalini","age":38,"location":"Maple Valley"}
   

    //db.close();
});