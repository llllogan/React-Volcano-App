const express = require("express");
const router = express.Router();

router.get("/" , async (req, res) => {

    const country = req.getQueryParamWithName("country");

    if (country == null) {
        res.sendError("Country is a required query parameter.");
    }
    
    const data = await req.db.getVolcanoesInCountry(country);
    console.log(data);

    res.sendSuccess(data);
});

module.exports = router;