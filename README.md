# Twilio Programmable Voice Client Back-end for Node.js

This application was originally a fork of the official Twilio repo [client-quickstart-node](https://github.com/TwilioDevEd/client-quickstart-node)
I made significant changes such as removing the front-end, adding a POSTGRES db and using Node.js purely as a separate REST API to control calling
through the TWIML programmable voice API.

The front-end repo is located here [vanilla-twilio-client](https://github.com/nckdhl/vanilla-twilio-client)

I created this app to use personally in order to buy phone numbers in other countries and make/receive calls using local numbers.

### Some of the other functionality added:

1. Login and registration routes
2. JWT auth. protection of certain routes
3. Call forwarding to hard-coded number when browser client is offline
4. Postgresql database integration for storage of user data / authentication

### Future functionality to add:

1. Account registration and automatic creation of TWIML apps
2. Remove hard-coded configurations and add phone number options to UI

***

This app is currently hosted at vanillavoip.com. 
Account creation upon invitation is not yet possible but will be as soon as I figure out how to integrate that securely with the Twilio Account and Application API. 
