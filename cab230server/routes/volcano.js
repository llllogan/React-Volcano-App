const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
    const id = req.params.id;
    res.json(
        {
            "name": "Volcano",
            "id": id
        }
    );
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