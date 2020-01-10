const jwt = require('jsonwebtoken');
const cfg = require('../config');

module.exports = function auth(req, res, next) {
    console.log(req.body);
    const token = req.body.authToken;
    if (!token) return res.status(401).send('Access denied');

    try {
        const verified = jwt.verify(token, cfg.JWTSecret);
        req.user = verified;
    } catch (err) {
        res.status(400).send('Invalid Token. Try logging in again.');
    }

    next();
}

///