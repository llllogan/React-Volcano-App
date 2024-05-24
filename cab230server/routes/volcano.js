const express = require("express");
const router = express.Router();

router.param("id", async (req, res, next, id) => {

    console.log("Trying to find volcano with id of: " + id)
    let volcano = await req.db.getVolcanoById(id);
    req.volcano = volcano;
    next();
});

router.get("/:id", async (req, res) => {

    if (req.authTypeIsBearer() && !req.hasValidBearerToken()) {
        res.sendUnauthorised("Invalid JWT token");
        return;
    }

    if (req.authTypeIsBearer() && req.bearerTokenHasExpired()) {
        res.sendUnauthorised("JWT token has expired");
        return;
    }

    if (req.hasAuthHeader() && !req.authTypeIsBearer()) {
        res.sendUnauthorised("Authorization header is malformed");
        return;
    }

    if (req.getQueryParams() != null) {
        res.sendBadRequest("Invalid query parameters. Query parameters are not permitted.");
        return;
    }

    if (req.volcano == null) {
        res.sendError("Volcano with ID: " + id + " not found.");
        return;
    }

    res.sendSuccess(data);
});

router.route("/:id/eruptions")
    .get((req, res) => {})
    .post((req, res) => {});


router.route("/:id/reviews")
    .get((req, res) => {})
    .post((req, res) => {});

router.param("id", (req, res, next, id) => {
    console.log("Trying to find volcano with id of: " + id)
    req.id = id;
    next();
});



module.exports = router;