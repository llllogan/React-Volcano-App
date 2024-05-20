const express = require("express");
const router = express.Router();

const knex = require('knex')({
    client: 'mysql',
    version: '8.3.0',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'admin',
      database: 'volcanoes',
    },
  });

router.get("/" , (req, res) => {});

module.exports = router;