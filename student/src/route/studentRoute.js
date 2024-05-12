const { Router } = require("express");
const verifyController = require("../controller/auth/verifyStudent");
const registerController = require("../controller/auth/Register");
const signinController = require("../controller/auth/signin");
const validator = require("../../../middleware/validation.middleware");
const getController = require("../controller/auth/students");
const {
  studentValidation,
  forgetPasswordValidation,
  resetPasswordValidation,
} = require("../../../validation/auth.validation");
const forgetPasswordController = require("../controller/auth/forgetPassword");

const studentRoute = Router();

studentRoute.get("/", getController.getStudentProblem_get);

studentRoute.post(
  "/signup",
  validator.validateSchema(studentValidation),
  registerController.registerStudent
);
studentRoute.post(
  "/login",
  // validator.validateSchema(studentValidation),
  signinController.signinStudent
);

studentRoute.post("/verify/:token", verifyController.verifyuser_post);

studentRoute.post(
  "/forgetPassword",
  validator.validateSchema(forgetPasswordValidation),
  forgetPasswordController.forgetPassword
);

studentRoute.post(
  "/resetPassword/:token/:email",
  validator.validateSchema(resetPasswordValidation)
);

module.exports = studentRoute;
