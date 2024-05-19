const express = require("express");
const app = express();

app.get("/", (req, res) => {

    res.send("Hello World");
})

const meRouter = require("./routes/me");
const volcanoRouter = require("./routes/volcano");
const userRouter = require("./routes/user");

app.use("/me", meRouter);
app.use("/volcano", volcanoRouter);
app.use("/user", userRouter);


app.listen(3000);

