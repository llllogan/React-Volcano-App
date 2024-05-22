const express = require("express");
const hashMiddleware = require("../middleware/hashMiddleware");
const router = express.Router();
router.use(hashMiddleware);

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

    const hashedPassword = await req.hashPassword(user.password);

    await req.db.createUser(user.email, hashedPassword);

    res.sendCreated("User created");
});

router.post("/login", async (req, res) => {

    const user = req.getEmailAndPassword();

    if (user == null) {
        res.sendError("Request body incomplete, both email and password are required");
        return;
    }

    const existingUser = await req.db.getUserByEmail(user.email);

    if (existingUser == null) {
        res.sendUnauthorised("Incorrect email or password");
        return;
    }

    const correctPassword = await req.checkPassword(user.password, existingUser.password);

    if (!correctPassword) {
        res.sendUnauthorised("Incorrect email or password");
        return;
    }

    let tokenResponse = {
        token: "Bearer token",
        token_type: "Bearer",
        expires_in: 86400
    }

    res.sendSuccess(tokenResponse);
});

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