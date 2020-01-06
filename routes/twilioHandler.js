const ClientCapability = require("twilio").jwt.ClientCapability;
const VoiceResponse = require("twilio").twiml.VoiceResponse;

const nameGenerator = require("../name_generator");
const config = require("../config");

exports.tokenGenerator = function tokenGenerator(req) {
  const identity = req.user._name;
  const capability = new ClientCapability({
    accountSid: config.accountSid,
    authToken: config.authToken
  });

  capability.addScope(new ClientCapability.IncomingClientScope(identity));
  capability.addScope(
    new ClientCapability.OutgoingClientScope({
      applicationSid: config.twimlAppSid,
      clientName: identity
    })
  );

  // Include identity and token in a JSON response
  return {
    identity: identity,
    token: capability.toJwt()
  };
};

exports.voiceResponse = function voiceResponse(req) {
  // Create a TwiML voice response
  const twiml = new VoiceResponse();
  const toNumber = req.body.To;

  const dial = twiml.dial({
    callerId: config.callerId
  });

  if (isIncomingPhoneNumber(toNumber)) {
    const clientName = "Nick";
    dial.client(clientName);
    dial.number(+12896893069);
    console.log("Dialing client")
  } else if (isAValidPhoneNumber(toNumber)) {
    dial.number(toNumber);
    console.log("Dialing number")
  }
  return twiml.toString();
};

function isIncomingPhoneNumber(number) {
  console.log("Incoming number: ", number);
  console.log("This number: ", config.callerId);
  if (number == config.callerId) {
    return true;
    ////
  }
}

exports.forwardResponse = function forwardResponse(req) {
  // const twiml = new VoiceResponse();

  


  // const dial = twiml.dial({
  //   callerId: 
  // });
}

/**
 * Checks if the given value is valid as phone number
 * @param {Number|String} number
 * @return {Boolean}
 */
function isAValidPhoneNumber(number) {
  return /^[\d\+\-\(\) ]+$/.test(number);
}
