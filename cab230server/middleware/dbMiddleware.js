const dbClient = require('../dbInterface');

const dbMiddleware = (req, res, next) => {
    req.db = dbClient;
    next();
};

module.exports = dbMiddleware;