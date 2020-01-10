const jwt = require('jsonwebtoken');
const cfg = require('../config');

module.exports = function auth(req, res, next) {
    console.log(req.body);
    const token = req.body.authToken;
    console.log(req.body);
    console.log(token);
    if (!token) return res.status(401).send('Access denied');

    try {
        const verified = jwt.verify(token, cfg.JWTSecret);
        req.user = verified;
        res.status(200).send(JSON.stringify({ success: "You're logged in."}));
    } catch (err) {
        res.status(400).send('Invalid Token. Try logging in again.');
    }

    next();
}

///