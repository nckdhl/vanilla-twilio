const Router = require('express').Router;
const twilio = require('twilio');

const { tokenGenerator, voiceResponse, forwardResponse } = require('./twilioHandler');
const verify = require('./../middleware/verifyToken');

const router = new Router();

/**
 * Generate a Capability Token for a Twilio Client user - it generates a random
 * username for the client requesting a token.
 */
router.post('/token', verify, (req, res) => {
  res.send(tokenGenerator(req));
});

router.post('/voice', twilio.webhook({ validate: true }), (req, res) => {
  res.set('Content-Type', 'text/xml');
  res.send(voiceResponse(req));
});

router.post('/forward', twilio.webhook( process.env.TWILIO_AUTH_TOKEN, { validate: true, url: 'https://vanilla-twilio.herokuapp.com/twilio/voice'}), (req, res) => {
  res.set('Content-Type', 'text/xml');
  //forwardResponse(req);
  res.send(forwardResponse(req));
});


module.exports = router;
