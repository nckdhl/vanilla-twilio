const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const corsHeader = require('./middleware/cors');

const twilioRouter = require('./routes/twilioRouter');
const authRouter = require('./routes/authRouter');

// Create Express webapp
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// TODO change this middleware function to use 
// 3rd party cors package functionality
app.use(corsHeader);

// Add Twilio routes
app.use('/twilio', twilioRouter);

// Add authentication routes
app.use('/auth', authRouter);

// Create http server and run it
const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, function() {
  console.log('Express server running on *:' + port);
});
