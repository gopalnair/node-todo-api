const MongoClient = require('mongodb').MongoClient;


console.log(JSON.stringify(require('mongodb'), null, 2));

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to Mongo DB server');
    }

    console.log('Connected to MongoDB Server');
  
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Unable to insert to do', err);
    //     }

    //     console.log(JSON.stringify(result.ops), null, 2);
    // });


    // db.collection('Users').insertOne({
    //     name:'Gopal',
    //     age: 38,
    //     location: 'Maple Valley'
    // }, (err, result) => {
    //     if(err) {
    //         console.log('Unable to insert new user' , err);
    //     }

    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),null, 2));
        
    // });

    db.close();
});