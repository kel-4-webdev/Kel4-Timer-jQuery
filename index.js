'use strict';

var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    cors = require('cors');

app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

// start server
app.listen(port);

console.log('RESTful API server started on: ' + port);

module.exports = app;
