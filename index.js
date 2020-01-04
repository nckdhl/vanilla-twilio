const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const router = require('./src/router');

// Create Express webapp
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

// TODO change this middleware function to use cors package functionality
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://friendly-raman-a250a4.netlify.com');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(router);

// Create http server and run it
const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, function() {
  console.log('Express server running on *:' + port);
});
