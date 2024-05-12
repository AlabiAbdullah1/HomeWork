const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy"); //Will help to redirect our request to the adequate quarter
const studentRoute = require("../student/src/route/studentRoute");
const questionRoute = require("../question/src/route/questionRoute");
const tutorRoute = require("../tutor/src/route/tutorRoute");
const solutionRoute = require("../solution/src/route/solutionRoute");
const httpLogger = require("../logger/httpLogger");
const logger = require("../logger/logger");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

const limiter = rateLimit({
  windowMs: 0.5 * 60 * 1000,
  max: 4,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(httpLogger);
app.use(limiter);
app.use(helmet());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Student Route
app.use("/student", studentRoute, proxy("http://localhost:3001"));
app.use("/tutor", tutorRoute, proxy("http://localhost:3002"));
app.use("/question", questionRoute, proxy("http://localhost:3003"));
app.use("/solutions", solutionRoute, proxy("http://localhost:3004"));

app.listen(PORT, () => {
  logger.info(`Gateway Listening on port 3000`);
});
