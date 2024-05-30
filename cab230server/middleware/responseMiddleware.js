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

    res.sendCreated = function(message) {
        res.statusCode = 201;
        res.json({message: message});
    }

    res.sendIAmATeaPot = function() {
        res.statusCode = 418;
        res.json({error: true, message: "I cannot brew coffee as I am a teapot.", link: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418"});
    }

    next();
}

module.exports = responseMiddleware;