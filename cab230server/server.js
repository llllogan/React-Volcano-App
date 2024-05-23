const express = require("express");
const bodyParser = require("body-parser");
const dbClient = require("./middleware/dbMiddleware");
const requestMiddleware = require("./middleware/requestMiddleware");
const responseMethods = require("./middleware/responseMiddleware");
const tokenMiddleware = require("./middleware/tokenMiddleware");

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(dbClient);
app.use(requestMiddleware);
app.use(responseMethods);
app.use(tokenMiddleware);

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

