const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config');

var conn = mongoose.connection;

app.use(cors());

app.use(bodyParser.json());
//Routes
const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');

app.use('/posts', postsRoute)
app.use('/users', usersRoute)

//Routes
app.get('/', (req, res) => {
    res.send('We are on home');
})

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () =>
    console.log('conected to DB')
);

conn.once('open', async function () {
    var collectionsNames = []
    // var collections = await conn.db.getCollectionNames();
    var collections2 = await conn.db.listCollections().toArray()
    var collection = conn.db.collection("users");
    collection.find({}).toArray(function(err, data){
    // console.log(data); // data printed in console
    })
});

//How to we start to listeing to the server
app.listen(3000);