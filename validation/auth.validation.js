const joi = require("joi");

exports.studentValidation = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

exports.studentQuestion = joi.object({
  question: joi.string().required(),
  dateCreated: joi.date().default(Date.now()),
  updatedAt: joi.date().default(Date.now()),
});

exports.forgetPasswordValidation = joi.object({
  email: joi.string().email().required(),
});

exports.resetPasswordValidation = joi.object({
  password: joi.string().required(),
});

exports.tutorValidation = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

exports.solution = joi.object({
  solution: joi.string().required(),
  dateCreated: joi.date().default(Date.now()),
  updatedAt: joi.date().default(Date.now()),
});
