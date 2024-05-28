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
    let exactMatch = false;

    if (req.getQueryParamsLength() > 1 && req.getQueryParamWithName("exactMatch") == null) 
    {
        res.sendError("Please supply only one query parameter with an option 'exactMatch' flag.");
        return;
    }

    if (req.getQueryParamWithName("volcano") == null && req.getQueryParamWithName("region") == null && req.getQueryParamWithName("subregion") == null && req.getQueryParamWithName("name") == null)
    {
        res.sendError("Please supply a valid query parameter (name, volcano, region, subregion).");
        return;
    }

    if (req.getQueryParamWithName("volcano") != null)
    {
        queryParamKey = "name";
        queryParamValue = req.getQueryParamWithName("volcano");
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

    if (req.getQueryParamWithName("name") != null)
    {
        queryParamKey = "country";
        queryParamValue = req.getQueryParamWithName("name");
    
    }

    if (req.getQueryParamWithName("exactMatch") == "true")
    {
        exactMatch = true;
    }

    const data = await req.db.getCountriesByFilter(queryParamKey, queryParamValue, exactMatch);
    res.sendSuccess(data);
});

module.exports = router;

