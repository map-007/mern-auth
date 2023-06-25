const User = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");

const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    setToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide email and password", 400));
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 404));
    }

    setToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

const forgotpassword = (req, res, next) => {
  res.send("forgotpassword");
};

const resetpassword = (req, res, next) => {
  res.send("resetpassword");
};

const setToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};

module.exports = {
  login,
  register,
  forgotpassword,
  resetpassword,
};
