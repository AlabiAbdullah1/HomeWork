const { Router } = require("express");
const postSolution = require("../controller/postSolution");
const getSolution = require("../controller/getSolution");
const validator = require("../../../middleware/validation.middleware");
const { solution } = require("../../../validation/auth.validation");

const solutionRoute = Router();

solutionRoute.post(
  "/:id",
  validator.validateSchema(solution),
  postSolution.postSolution
);
solutionRoute.get("/:id", getSolution.getQuestionSolution);

module.exports = solutionRoute;
