import passport from "../config/passport.js";
import User from "../models/user.js";

const authController = {};

authController.processLogin = (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ user });
    });
  })(req, res, next);
};

authController.logout = function (req, res, next) {
  req.logout();
  res.redirect("/");
};

export default authController;
