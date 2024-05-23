const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

const tokenMiddleware = (req, res, next) => {

    res.makeBearerToken = function(id, username) {

        let payload = {
            id: id,
            username: username
        }

        const token = jwt.sign(payload, secretKey, {expiresIn: '24h'});
        return token;
    }

    req.decodeBearerToken = function() {

        const fullToken = req.getHeaderWithName('Authorization');
        const token = fullToken.split(' ')[1];

        jwt.verify(token, secretKey, (err, decodedPayload) => {
            if (err) {
                return null;
            } else {
                return decodedPayload;
            }
        });
    }
};

module.exports = tokenMiddleware;