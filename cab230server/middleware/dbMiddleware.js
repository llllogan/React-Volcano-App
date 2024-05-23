const dbClient = require('../dbClient');

const dbMiddleware = (req, res, next) => {
    req.db = dbClient;
    next();
};

module.exports = dbMiddleware;