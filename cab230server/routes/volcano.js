const express = require("express");
const router = express.Router();

router.param("id", async (req, res, next, id) => {

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

router.route("/:id/eruptions")
    .get((req, res) => {
        
        if (req.volcano == null) {
            res.sendError("Volcano with ID: " + id + " not found.");
            return;
        }




    })
    .post((req, res) => {});


router.route("/:id/reviews")
    .get( async (req, res) => {

        if (req.volcano == null) {
            res.sendError("Volcano with ID: " + id + " not found.");
            return;
        }

        let reviews = await req.db.getReviewsForVolcano(req.volcano.id);

        res.sendSuccess(reviews);
    })
    .post((req, res) => {

        



    });

module.exports = router;