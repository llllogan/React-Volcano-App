const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json(
        [
            {
                "name": "Australia",
                "population": 25000000
            },
            {
                "name": "New Zealand",
                "population": 5000000
            },
            {
                "name": "Fiji",
                "population": 1000000
            }
        ]
    );
});

module.exports = router;