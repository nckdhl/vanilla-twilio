const Router = require('express').Router;

const { tokenGenerator, voiceResponse } = require('./twiliohandler');
const { loginHandler } = require('./loginhandler');

const router = new Router();

/**
 * Generate a Capability Token for a Twilio Client user - it generates a random
 * username for the client requesting a token.
 */
router.get('/token', (req, res) => {
  res.send(tokenGenerator());
});

router.post('/voice', (req, res) => {
  res.set('Content-Type', 'text/xml');
  res.send(voiceResponse(req.body.To));
});

router.post('/login', async (req, res) => {
  const response = await loginHandler();
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify(response));
});

module.exports = router;
