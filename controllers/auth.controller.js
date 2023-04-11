const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

/**
 * Controller for the signup
 */
exports.signup = async (req, res) => {
  const userObj = {
    name: req.body.name,
    userId: req.body.userId,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  };

  try {
    const userCreated = await User.create(userObj);
    const postResponse = {
      name: userCreated.name,
      userId: userCreated.userId,
      email: userCreated.email,
      sentWelcomeEmailStatus: userCreated.sentWelcomeEmailStatus, // welcome email sen status
      createdAt: userCreated.createdAt,
      updatedAt: userCreated.updatedAt,
    };
    res.status(201).send(postResponse);
  } catch (err) {
    console.log("Some error while saving the user in db", err.message);
    res.status(500).send({
      message: "Some internal error while inserting the element",
    });
  }
};

/**
 * Controller for the sign in
 */

exports.signin = async (req, res) => {
  const user = await User.findOne({ userId: req.body.userId });
  console.log(user);
  if (user == null) {
    res.status(400).send({
      message: "Failed! Userid doesn't exist!",
    });
    return;
  }

  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!",
    });
  }

  res.status(200).send({
    name: user.name,
    userId: user.userId,
    email: user.email,
    sentWelcomeEmailStatus: user.sentWelcomeEmailStatus,
  });
};
