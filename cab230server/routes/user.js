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


router.param("email", async (req, res, next, email) => {
    console.log("Trying to find user with email of: " + email)

    let existingUser = await req.db.getUserByEmail(email);
    req.existingUser = existingUser;
    next();
});


router.route("/:email/profile")
    .get( (req, res) => {

        if (req.hasBearerToken() && !req.hasValidBearerToken()) {
            res.sendUnauthorised("JWT token has expired");
            return;
        }

        if (req.existingUser == null) {
            res.sendNotFound("User not found");
            return;
        }

        const profile = {
            email: req.existingUser.email,
            firstName: req.existingUser.firstName,
            lastName: req.existingUser.lastName,
        }

        if (req.hasValidBearerToken()) {
            profile.address = req.existingUser.address;
            profile.dob = req.existingUser.dob;
        }

        res.sendSuccess(profile);

    })
    .put((req, res) => {})
    .delete((req, res) => {});



module.exports = router;