const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const twilioRouter = require('./routes/twilioRouter');
const authRouter = require('./routes/authRouter');

// Create Express webapp
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const corsOptions = {
  origin: 'https://vanillavoip.com',
  credentials: true
}

app.use(cors(corsOptions));

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