const express = require("express");
const router = express.Router();

router.post("/register", async (req, res) => {

    const user = req.getEmailAndPassword();

    if (user == null || !user.email.includes("@")) {
        res.sendError("Request body incomplete, both email and password are required");
        return;
    }

    const existingUser = await req.db.getUserByEmail(user.email);

    if (existingUser != null) {
        res.sendConflict("User already exists");
        return;
    }

    const hashedPassword = 

    await req.db.createUser(user.email, user.password);




});

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