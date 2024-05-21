const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {

    let queryParams = req.getQueryParams();

    if (queryParams == null) 
    {
        const data = await req.db.getCountriesList();
        res.sendSuccess(data);
    } else {
        res.sendError("Invalid query parameters. Query parameters are not permitted.");
    }
});

module.exports = router;

