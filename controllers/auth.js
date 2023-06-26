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

const forgotpassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("Email could not be sent", 404));
    }

    const resetToken = user.getRestPasswordToken();

    await user.save();

    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please go to this link to reset your password</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;
    try {
      
    } catch (error) {
      
    }

  } catch (error) {}
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
