const bcrypt = require('bcrypt');
const saltRounds = 10;

function hashMiddleware(req, res, next) {
    
    req.hashPassword = async function(password) {
        return await bcrypt.hash(password, saltRounds);
    }

    req.checkPassword = async function(password, hash) {
        return await bcrypt.compare(password, hash);
    }


    next();
}

module.exports = hashMiddleware;