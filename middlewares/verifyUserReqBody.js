/**
 * This file will contain the middlewares for valdiating the userId and email
 */
const User = require("../models/user.model");
const validator = require("validator");

validateUserRequestBody = async (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Failed! Username is not provided !",
    });
    return;
  }
  if (!req.body.userId) {
    res.status(400).send({
      message: "Failed! UserId is not provided !",
    });
    return;
  }
  //Validating the userId
  const user = await User.findOne({ userId: req.body.userId });
  if (user != null) {
    res.status(400).send({
      message: "Failed! Userid  already exists!",
    });
    return;
  }
  //Validating the email Id
  if (!validator.isEmail(req.body.email)) {
    res.status(400).send({
      message: "Failed! Email is not valid!",
    });
    return;
  }

  const email = await User.findOne({ email: req.body.email });
  if (email != null) {
    res.status(400).send({
      message: "Failed! Email already exists!",
    });
    return;
  }

  next();
};

const validateUserSigninBody = function (req, res, next) {
  if (!req.body.userId) {
    res.status(400).send({
      message: "Failed! UserId is not provided !",
    });
    return;
  }

  if (!req.body.password) {
    res.status(400).send({
      message: "Failed! Password is not provided !",
    });
    return;
  }
  next();
};

const verifyUserRequestBody = {
  validateUserRequestBody: validateUserRequestBody,
  validateUserSigninBody: validateUserSigninBody,
};

module.exports = verifyUserRequestBody;
