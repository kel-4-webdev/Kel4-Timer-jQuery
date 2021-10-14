'use strict';

var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    cors = require('cors'),
    http = require('http'),
    fs = require('fs');

const db = require('./queries')

app.use(express.json());
app.use(cors());

app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/img', express.static(__dirname + '/public /img'));

app.set('view engine', 'ejs');

app.get('/',(req,res) => {
    res.render(__dirname + '/views/index.ejs');
    // res.json({ info: 'Node.js, Express, and Postgres API' })
})
//require("./layout/index.html")(app);

app.use(express.json());
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

// start server
app.listen(port);

console.log('RESTful API server started on: ' + port);

module.exports = app;
