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

router.post('/voice', twilio.webhook(), (req, res) => {
  res.set('Content-Type', 'text/xml');
  res.send(voiceResponse(req));
});

router.post('/forward', twilio.webhook(), (req, res) => {
  res.set('Content-Type', 'text/xml');
  //forwardResponse(req);
  res.send(forwardResponse(req));
});

// twiml app creation / credentials route
router.post("/twimlapp", verifyToken, (req, res => {
  res.set("Content-Type", "application/json");

  try {
    // check if app is already created
    const { checkError, isExisting } = await checkTwimlApp(req.body);

    // return success / fail object
    if (checkError) {
      return res.status(400).send({ error: checkError.details[0].message });
    }

    if (isExisting) {
      return res.status(200).send({ existing: existing });
    } else {
      const { createError } = await createTwimlApp(req.body);
    }

    if (createError) {
      return res.status(400).send({ error: createError.details[0].message });
    } else {
      return res.status(200).send({ success: true });
    }
    
    // if app not already created, create app
    // return success / fail object
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
})
);

module.exports = router;
