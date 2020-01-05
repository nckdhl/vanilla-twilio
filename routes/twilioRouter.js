const Router = require('express').Router;

const { tokenGenerator, voiceResponse } = require('./twilioHandler');
const verify = require('./../middleware/verifyToken');

const router = new Router();

/**
 * Generate a Capability Token for a Twilio Client user - it generates a random
 * username for the client requesting a token.
 */
router.get('/token', verify, (req, res) => {
  res.send(tokenGenerator());
});

router.post('/voice', verify, (req, res) => {
  res.set('Content-Type', 'text/xml');
  res.send(voiceResponse(req.body.To));
});

module.exports = router;
