const express = require("express");
const errorHandlers = require("./helpers/errorHandlers");

const { product, customer } = require("./routers");
const { expressMiddlewares } = require("./middlewares");

const app = express();
app.use(expressMiddlewares);

app.use("/api", product);
app.use('/api', customer)

app.use(errorHandlers);
module.exports = app;
