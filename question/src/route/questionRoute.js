const { Router } = require("express");
const question = require("../controller/studentProblem/questions");
const postQuestion = require("../controller/studentProblem/postQuestion");
const deleteQuestion = require("../controller/studentProblem/deleteQuestion");
const validator = require("../../../middleware/validation.middleware");
const { studentQuestion } = require("../../../validation/auth.validation");

const questionRoute = Router();

questionRoute.get("/:id", question.questions);
questionRoute.post(
  "/",
  validator.validateSchema(studentQuestion),
  postQuestion.postQuestion
);
questionRoute.delete("/:id", deleteQuestion.deleteQuestion);
module.exports = questionRoute;
