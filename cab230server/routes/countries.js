const express = require("express");
const router = express.Router();

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'admin',
      database: 'volcanoes',
    },
  });

router.get("/", (req, res) => {

    let countries = [];

    knex.select().distinct('country').from('data').then((rows) => {
        rows.forEach((row) => {
            countries.push(row.country);
        });
        res.json(countries);
    } );
});

module.exports = router;

