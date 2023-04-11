const authController = require("../controllers/auth.controller");
const verifyUserReqBody = require("../middlewares/verifyUserReqBody");

module.exports = function (app) {
  app.post(
    "/api/v1/auth/signup",
    [verifyUserReqBody.validateUserRequestBody],
    authController.signup
  );

  app.post(
    "/api/v1/auth/signin",
    [verifyUserReqBody.validateUserSigninBody],
    authController.signin
  );
};
