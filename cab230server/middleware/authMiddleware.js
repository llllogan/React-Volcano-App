require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = "mocwaj-6vipVu-disjem";

const tokenMiddleware = (req, res, next) => {

    res.makeBearerToken = function(id, username) {

        let payload = {
            id: id,
            email: username
        }

        const token = jwt.sign(payload, secretKey, {expiresIn: '1s'});
        return token;
    }

    req.decodeBearerToken = function() {

        const fullToken = req.getHeaderWithName('Authorization');
        const token = fullToken.split(' ')[1];

        return jwt.verify(token, secretKey, (err, decodedPayload) => {
            if (err.expiredAt) {
                // If the token has expired
                return payload = {
                    isExpired: true,
                    expiredAt: err.expiredAt
                }
            } else if(err) {
                // If there is an issue with the token
                return null;
            } else {
                // If the token is valid and currect
                return decodedPayload;
            }
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
        let authHeader = req.getHeaderWithName('Authorization');
        if (authHeader.toLowerCase().includes('bearer')) {
            return true;
        } else {
            false
        }
    }

    req.hasValidBearerToken = function() {
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

    next();
};

module.exports = tokenMiddleware;