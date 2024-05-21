const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {

    let queryParams = req.getQueryParams();

    if (queryParams != null) 
    {
        res.sendError("Invalid query parameters. Query parameters are not permitted.");   
    }

    const data = await req.db.getCountriesList();
    res.sendSuccess(data);
});

module.exports = router;

