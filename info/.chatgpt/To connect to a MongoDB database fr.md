To connect to a MongoDB database from a Node.js application, you can follow these steps:

Import the MongoClient from the MongoDB driver:
JavaScript

const { MongoClient } = require('mongodb');
AI-generated code. Review and use carefully. More info on FAQ.
Create a connection URL. This will typically look like mongodb://localhost:27017/myproject, where myproject is the name of the database you want to use.
Connect to the MongoDB server with the MongoClient’s connect method:
JavaScript

const url = 'mongodb://localhost:27017/myproject';
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Connected successfully to server");
  db.close();
});
AI-generated code. Review and use carefully. More info on FAQ.
In this code, MongoClient.connect is used to connect to the server specified by the given URL12.

Please replace 'mongodb://localhost:27017/myproject' with your actual MongoDB connection string. If you’re using MongoDB Atlas, the connection string would be provided in the Atlas dashboard1.

Remember, it’s important to handle errors that may occur during the connection and to close the connection when you’re done2.