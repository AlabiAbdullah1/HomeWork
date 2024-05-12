// TUTOR:
const express = require("express");
const bodyParser = require("body-parser");
const httpLogger = require("../logger/httpLogger");
const logger = require("../logger/logger");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();
app.use(httpLogger);
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.listen(3004, () => {
  logger.info(`Listening at port ${PORT}`);
});
