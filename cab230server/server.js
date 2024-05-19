const express = require("express");
const app = express();

app.get("/", (req, res) => {

    res.send("Hello World");
})

const meRouter = require("./routes/me");

app.use("/me", meRouter);

app.listen(3000);

