// ** Change Log ** //
// - change import initiate from var to const
// - change link sub page from "users" to "history"
// - change db method name from "..User" to "..History"

'use strict';

const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    cors = require('cors'),
    http = require('http'),
    fs = require('fs'),
    db = require('./queries');

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
app.get('/history', db.getHistory)
app.get('/history/:id', db.getHistoryById)
app.post('/history', db.createHistory)
app.put('/history/:id', db.updateHistory)
app.delete('/history/:id', db.deleteHistory)

// start server
app.listen(port);

console.log('API server started on: ' + port);

module.exports = app;
