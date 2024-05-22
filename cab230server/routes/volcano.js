const express = require("express");
const router = express.Router();

router.get("/:id", async (req, res) => {

    if (req.hasBearerToken() && !req.hasValidBearerToken()) {
        res.sendUnauthorised("JWT token has expired");
        return;
    }

    const id = req.params.id;
    const data = await req.db.getVolcanoById(id);

    if (data == null) {
        res.sendNotFound("Volcano with ID: " + id + " not found.");
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