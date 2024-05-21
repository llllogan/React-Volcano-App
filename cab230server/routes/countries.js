const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {

    let queryParams = req.query;

    if (Object.keys(queryParams).length > 0) 
    {
        const data = await req.db.getCountriesList();

        res.statusCode = 200;
        res.json(data);

    } else {

    }

});

module.exports = router;

