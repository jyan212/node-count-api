const { count } = require('console');
const express = require('express');
const app = express();
const http = require("http");
const server = http.createServer(app)
/*
 Importing routes
*/
const countObjectRoute = require('./routes/countObject');
/*
    Middlewares
*/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  })

app.use(express.json({limit:'50mb'}));
app.use('/countObject', countObjectRoute);


// Default routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(3000,'192.168.0.129', () => {
    console.log('listening on *:3000');
});