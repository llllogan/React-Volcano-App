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

router.get("/filter", async (req, res) => {

    let queryParamKey = null;
    let queryParamValue = null;

    if (req.getQueryParamsLength() > 1) 
    {
        res.sendError("Please supply only one query parameter.");
        return;
    }

    if (req.getQueryParamWithName("name") == null && req.getQueryParamWithName("region") == null && req.getQueryParamWithName("subregion") == null)
    {
        res.sendError("Please supply a valid query parameter (name, region, subregion).");
        return;
    }

    if (req.getQueryParamWithName("name") != null)
    {
        queryParamKey = "name";
        queryParamValue = req.getQueryParamWithName("name");
    }

    if (req.getQueryParamWithName("region") != null)
    {
        queryParamKey = "region";
        queryParamValue = req.getQueryParamWithName("region");
    }

    if (req.getQueryParamWithName("subregion") != null)
    {
        queryParamKey = "subregion";
        queryParamValue = req.getQueryParamWithName("subregion");
    }

    const data = await req.db.getCountriesByFilter(queryParamKey, queryParamValue);
    res.sendSuccess(data);
});

module.exports = router;

