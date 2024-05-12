// STUDENT:
const express = require("express");
const studentRoute = require("./route/studentRoute");
const httpLogger = require("../../logger/httpLogger");
const logger = require("../../logger/logger");
require("dotenv").config();

const app = express();
app.use(httpLogger);
const PORT = process.env.PORT;
app.use(express.json());

app.get("/dummy", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  logger.info(`Listening at port ${PORT}`);
});
