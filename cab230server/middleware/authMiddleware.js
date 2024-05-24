require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = "mocwaj-6vipVu-disjem";

const tokenMiddleware = (req, res, next) => {

    res.makeBearerToken = function(id, username) {

        let payload = {
            id: id,
            email: username
        }

        const token = jwt.sign(payload, secretKey, {expiresIn: '24h'});
        return token;
    }

    req.decodeBearerToken = function() {

        const fullToken = req.getHeaderWithName('Authorization');
        const token = fullToken.split(' ')[1];

        return jwt.verify(token, secretKey, (err, decodedPayload) => {

            if (err) {
                let expiredAt = err.expiredAt;

                if (expiredAt) {
                    // If the token has expired
                    return payload = {
                        isExpired: true,
                        expiredAt: err.expiredAt
                    }
                } else {
                    // If there is an issue with the token
                    return null;
                }
            }

            return decodedPayload;
        });
    }

    // Check if the request has an Authorization header
    req.hasAuthHeader = function() {
        let authHeader = req.getHeaderWithName('Authorization');
        if (authHeader != null) {
            return true;
        } else {
            false
        }
    }

    // Check if the Authorization header is a Bearer token
    req.authTypeIsBearer = function() {
        if (!req.hasAuthHeader()) {
            return false;
        }

        let authHeader = req.getHeaderWithName('Authorization');
        if (authHeader.toLowerCase().includes('bearer')) {
            return true;
        } else {
            false
        }
    }

    req.hasValidBearerToken = function() {

        if (req.authTypeIsBearer() == false) {
            return false;
        }

        let decodedPayload = req.decodeBearerToken();
        if (decodedPayload == null) {
            return false;
        } else {
            return true;
        }
    }

    req.bearerTokenHasExpired = function() {
        let decodedPayload = req.decodeBearerToken();
        if (decodedPayload.isExpired) {
            return true;
        } else {
            return false;
        }
    }

    if (req.authTypeIsBearer() && req.hasValidBearerToken()) {
        req.bearerToken = decodedPayload = req.decodeBearerToken();
    }

    next();
};

module.exports = tokenMiddleware;