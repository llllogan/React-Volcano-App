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

module.exports = router;