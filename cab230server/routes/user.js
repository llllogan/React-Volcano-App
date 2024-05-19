const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {});

router.post("/login", (req, res) => {});

router.route("/:email/profile")
    .get((req, res) => {})
    .put((req, res) => {})
    .delete((req, res) => {});

router.param("email", (req, res, next, email) => {
    console.log("Trying to find user with email of: " + email)
    req.email = email;
    next();
});

module.exports = router;