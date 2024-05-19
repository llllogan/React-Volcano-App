const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json(
        {
            "name": "Logan Janssen",
            "student_number": "n10797831"
        }
    );
});

module.exports = router;