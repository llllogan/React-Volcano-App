function responseMiddleware(req, res, next) {

    res.sendError = function(message) {
        res.statusCode = 400;
        res.json({error: true, message: message});
    }

    res.sendUnauthorised = function(message) {
        res.statusCode = 401;
        res.json({error: true, message: message});
    }

    res.sendForbidden = function(message) {
        res.statusCode = 403;
        res.json({error: true, message: message});
    }

    res.sendNotFound = function(message) {
        res.statusCode = 404;
        res.json({error: true, message: message});
    }

    res.sendConflict = function(message) {
        res.statusCode = 409;
        res.json({error: true, message: message});
    }

    res.sendSuccess = function(data) {
        res.statusCode = 200;
        res.json(data);
    }

    res.sendSuccessMessage = function(message) {
        res.statusCode = 200;
        res.json({message: message});
    }

    next();
}

module.exports = responseMiddleware;