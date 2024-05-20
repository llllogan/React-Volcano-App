const express = require("express");
const dbClient = require("../middleware/dbMiddleware");

const router = express.Router();
router.use(dbClient);

router.get("/", async (req, res) => {

    const data = await req.db.getCountriesList();

    res.json(data);
});

module.exports = router;

