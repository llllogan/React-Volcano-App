const express = require("express");
const bodyParser = require("body-parser");
const dbClient = require("./middleware/dbMiddleware");
const requestMiddleware = require("./middleware/requestMiddleware");
const responseMethods = require("./middleware/responseMiddleware");
const tokenMiddleware = require("./middleware/authMiddleware");

const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(dbClient);
app.use(requestMiddleware);
app.use(responseMethods);
app.use(tokenMiddleware);

app.use("/", swaggerUI.serve);
app.get("/", swaggerUI.setup(swaggerDocument));

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


app.get("/brewcoffee", (req, res) => {
    res.sendIAmATeaPot();
    return;
});


app.listen(3000);

