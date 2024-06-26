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

    const bearerToken = res.makeBearerToken(existingUser.id, existingUser.email);

    let tokenResponse = {
        token: bearerToken,
        token_type: "Bearer",
        expires_in: 86400
    }

    res.sendSuccess(tokenResponse);
});


router.param("email", async (req, res, next, email) => {

    let existingUser = await req.db.getUserByEmail(email);
    req.existingUser = existingUser;
    next();
});


router.route("/:email/profile")
    .get( (req, res) => {

        if (req.authTypeIsBearer() && !req.hasValidBearerToken()) {
            res.sendUnauthorised("Invalid JWT token");
            return;
        }

        if (req.authTypeIsBearer() && req.bearerTokenHasExpired()) {
            res.sendUnauthorised("JWT token has expired");
            return;
        }

        if (req.hasAuthHeader() && !req.authTypeIsBearer()) {
            res.sendUnauthorised("Authorization header is malformed");
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

        if (!req.hasAuthHeader()) {
            res.sendSuccess(profile);
            return;
        }

        if (req.existingUser.id != req.bearerToken.id) {
            res.sendSuccess(profile);
            return;
        }

        if (req.hasValidBearerToken()) {
            profile.address = req.existingUser.address;
            profile.dob = req.existingUser.dob;
        }

        res.sendSuccess(profile);

    })
    .put( async (req, res) => {

        if (!req.hasAuthHeader()) {
            res.sendUnauthorised("Authorization header ('Bearer token') not found");
            return;
        }

        if (req.authTypeIsBearer() && !req.hasValidBearerToken()) {
            res.sendUnauthorised("Invalid JWT token");
            return;
        }

        if (req.authTypeIsBearer() && req.bearerTokenHasExpired()) {
            res.sendUnauthorised("JWT token has expired");
            return;
        }

        if (req.hasAuthHeader() && !req.authTypeIsBearer()) {
            res.sendUnauthorised("Authorization header is malformed");
            return;
        }

        if (req.existingUser == null) {
            res.sendNotFound("User not found");
            return;
        }

        if (req.existingUser.id != req.bearerToken.id) {
            res.sendForbidden("Forbidden");
            return;
        }

        if (req.getProfileInformation() == null) {
            res.sendError("Request body incomplete: firstName, lastName, dob and address are required.");
            return;
        }

        const updatedInformation = req.getProfileInformation();

        const error = await req.db.updateUser(req.existingUser.id, req.existingUser.email, updatedInformation.firstName, updatedInformation.lastName, updatedInformation.dob, updatedInformation.address);

        if (error != null) {
            res.sendError("An error occurred updating the user profile.");
            return;
        }

        const updatedUser = await req.db.getUserByEmail(req.existingUser.email);
        const payload = {
            email: updatedUser.email,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            dob: updatedUser.dob,
            address: updatedUser.address
        }

        res.sendSuccess(payload);
    })



module.exports = router;