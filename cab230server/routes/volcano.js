const express = require("express");
const router = express.Router();

router.param("id", async (req, res, next, id) => {

    let volcano = await req.db.getVolcanoById(id);
    req.volcano = volcano;
    next();
});

router.get("/:id", async (req, res) => {

    if (!req.hasAuthHeader()) {
        res.sendUnauthorised("Authorization header ('Bearer token') not found");
        return;
    }

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

    let payload = {
        id: req.volcano.id,
        name: req.volcano.name,
        country: req.volcano.country,
        region: req.volcano.region,
        subregion: req.volcano.subregion,
        last_eruption: req.volcano.last_eruption,
        summit: req.volcano.summit,
        elevation: req.volcano.elevation,
        latitude: req.volcano.latitude,
        longitude: req.volcano.longitude,
    }

    if (req.hasValidBearerToken() && !req.bearerTokenHasExpired()) {
        payload.population_5km = req.volcano.population_5km;
        payload.population_10km = req.volcano.population_10km;
        payload.population_30km = req.volcano.population_30km;
        payload.population_100km = req.volcano.population_100km;
    }

    res.sendSuccess(payload);
});


router.route("/:id/reviews")
    .get( async (req, res) => {

        if (req.volcano == null) {
            res.sendError("Volcano with ID: " + id + " not found.");
            return;
        }

        let reviews = await req.db.getReviewsForVolcano(req.volcano.id);

        res.sendSuccess(reviews);
    })
    .post( async (req, res) => {

        if (!req.hasAuthHeader()) {
            res.sendUnauthorised("Authorization header ('Bearer token') not found");
            return;
        }

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

        if (req.volcano == null) {
            res.sendError("Volcano with ID: " + id + " not found.");
            return;
        }

        let review = req.getVolcanoReviewFromBody();

        if (review == null) {
            res.sendBadRequest("Review is missing required fields");
            return;
        }

        review.volcanoId = req.volcano.id;
        review.userId = req.bearerToken.id;

        const error = await req.db.addReiviewForVolcano(review.userId, review.volcanoId, review.title, review.rating, review.comment);

        if (error) {
            res.sendError("SQL error. Please check payload");
            return;
        }
        res.sendSuccess(review);

    }).put( async (req, res) => {
        
        if (!req.hasAuthHeader()) {
            res.sendUnauthorised("Authorization header ('Bearer token') not found");
            return;
        }

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

        let review = req.getPartialReviewFromBody();

        if (review == null) {
            res.sendBadRequest("Review is missing id field");
            return;
        }

        let existingReview = await req.db.getVolcanoReviewById(req.body.id);

        if (existingReview == null) {
            res.sendError("Review with ID: " + req.body.id + " not found");
            return;
        }

        if (existingReview.userId != req.bearerToken.id) {
            res.sendForbidden("Forbidden");
            return;
        }

        delete review.id;

        for (const [key, value] of Object.entries(review)) {
            const error = await req.db.updateFieldOfVolcanoReview(existingReview.id, key, value);

            if (error) {
                res.sendError("SQL error. Please check payload");
                return;
            }
        }

        review.id = existingReview.id;
        review.userId = existingReview.userId;
        review.volcanoId = existingReview.volcanoId;

        res.sendSuccess(review);
        
    });

module.exports = router;