const express = require("express");
const router = express.Router();

router.param("id", async (req, res, next, id) => {

    let volcano = await req.db.getVolcanoById(id);
    req.volcanoId = id;
    req.volcano = volcano;
    next();
});

router.param("reviewId", async (req, res, next, reviewId) => {
    
    let review = await req.db.getVolcanoReviewById(reviewId);
    req.reviewId = reviewId;
    req.existingReview = review;
    next();
});

router.get("/:id", async (req, res) => {

    if (req.hasAuthHeader() && !req.authTypeIsBearer()) {
        res.sendUnauthorised("Authorization header is malformed");
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

    if (req.getQueryParams() != null) {
        res.sendError("Invalid query parameters. Query parameters are not permitted.");
        return;
    }

    if (req.volcano == null) {
        res.sendNotFound("Volcano with ID: " + req.volcanoId + " not found.");
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
            res.sendError("");
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

        if (req.hasAuthHeader() && !req.authTypeIsBearer()) {
            res.sendUnauthorised("Authorization header is malformed");
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

        if (req.volcano == null) {
            res.sendNotFound("Volcano with ID: " + id + " not found.");
            return;
        }

        let review = req.getVolcanoReviewFromBody();

        if (review == null) {
            res.sendError("Review is missing required fields");
            return;
        }

        review.volcanoId = req.volcano.id;
        review.userId = req.bearerToken.id;

        const error = await req.db.addReiviewForVolcano(review.userId, review.volcanoId, review.title, review.rating, review.comment);

        if (error) {
            res.sendError("SQL error. Please check payload");
            return;
        }
        res.sendCreated(review);

    });

router.put("/:id/reviews/:reviewId", async (req, res) => {

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
        res.sendError("Review update payload must have at least one field.");
        return;
    }

    if (req.existingReview == null) {
        res.sendNotFound("Review with ID: " + req.reviewId + " not found");
        return;
    }

    if (req.existingReview.volcanoId != req.volcano.id) {
        res.sendNotFound("Review with ID: " + req.reviewId + " does not belong to volcano with ID: " + req.volcano.id);
        return;
    }

    if (req.existingReview.userId != req.bearerToken.id) {
        res.sendForbidden("Forbidden");
        return;
    }

    for (const [key, value] of Object.entries(review)) {
        const error = await req.db.updateFieldOfVolcanoReview(req.existingReview.id, key, value);

        if (error) {
            res.sendError("SQL error. Please check payload");
            return;
        }
    }

    let modifiedReview = await req.db.getVolcanoReviewById(req.existingReview.id);

    res.sendSuccess(modifiedReview);

});

module.exports = router;