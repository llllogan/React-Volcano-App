const express = require("express");
const dbClient = require("./middleware/dbMiddleware");
const responseMethods = require("./middleware/responseMiddleware");

const app = express();
app.use(dbClient);
app.use(responseMethods);

app.get("/", (req, res) => {

    res.send("Hello World");
})

const meRouter = require("./routes/me");
const volcanoRouter = require("./routes/volcano");
const volcanoesRouter = require("./routes/volcanoes");
const userRouter = require("./routes/user");
const countriesRouter = require("./routes/countries");

app.use("/me", meRouter);
app.use("/volcano", volcanoRouter);
app.use("/volcanoes", volcanoesRouter);
app.use("/user", userRouter);
app.use("/countries", countriesRouter);


app.listen(3000);

