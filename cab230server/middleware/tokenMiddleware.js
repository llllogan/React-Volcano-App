require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

const tokenMiddleware = (req, res, next) => {




};

module.exports = tokenMiddleware;