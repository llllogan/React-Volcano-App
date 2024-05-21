const express = require("express");
const router = express.Router();

router.get("/" , async (req, res) => {

    const country = req.getQueryParamWithName("country");

    if (country == null) {
        res.sendError("Country is a required query parameter.");
        return;
    }

    const queryParams = req.getQueryParams();
    let invalidParams = false;
    Object.keys(queryParams).forEach(param => {
        if (param != "country" && param != "populatedWithin") {
            invalidParams = true;
            console.log(param);
        }
    });
    if (invalidParams) {
        res.sendError("Invalid query parameters. Only country and populatedWithin are permitted.");
        return;
    }

    const populatedWithinFilter = req.getQueryParamWithName("populatedWithin");

    if (populatedWithinFilter == null) {
        const data = await req.db.getVolcanoesInCountry(country);
        res.sendSuccess(data);
        return;
    }

    const data = await req.db.getVolcanoesWithPopulationFilter(country, populatedWithinFilter);

    if (data == null) {
        res.sendError("Invalid value for populatedWithin. Only: 5km,10km,30km,100km are permitted.");
        return;
    }
    res.sendSuccess(data);

});

module.exports = router;