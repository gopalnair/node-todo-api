//const {MongoClient, ObjectID} = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to Mongo DB server');
    }

    console.log('Connected to MongoDB Server');
  
    // db.collection('Todos').find({"_id": new ObjectId("5a7ca05c28407935dc1d9cdf")}).toArray()
    //     .then((docs) => {
    //         console.log('To Dos');
    //         console.log(JSON.stringify(docs, null, 2));
    //     }, (err) => {
    //         console.log('Unable to fetch todos ', err);
    //     });


    db.collection('Todos').find().count()
    .then((count) => {
        console.log(`To Dos count : ${count} `);
        
    }, (err) => {
        console.log('Unable to fetch todos ', err);
    });

    //db.close();
});