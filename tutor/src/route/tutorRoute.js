const { Router } = require("express");
const verifyController = require("../controller/verifyTutor");
const registerController = require("../controller/Register");
const signinController = require("../controller/signin");
const validator = require("../../../middleware/validation.middleware");
const getController = require("../controller/tutor");
const {
  forgetPasswordValidation,
  resetPasswordValidation,
  tutorValidation,
} = require("../../../validation/auth.validation");
const forgetPasswordController = require("../controller/forgetPassword");

const tutorRoute = Router();
tutorRoute.get("/", getController.getTutorSolution_get);

tutorRoute.post(
  "/signup",
  validator.validateSchema(tutorValidation),
  registerController.registerTutor
);
tutorRoute.post(
  "/login",
  // validator.validateSchema(studentValidation),
  signinController.signinTutor
);

tutorRoute.post("/verify/:token", verifyController.verifyuser_post);

tutorRoute.post(
  "/forgetPassword",
  validator.validateSchema(forgetPasswordValidation),
  forgetPasswordController.forgetPassword
);

tutorRoute.post(
  "/resetPassword/:token/:email",
  validator.validateSchema(resetPasswordValidation)
);

module.exports = tutorRoute;
