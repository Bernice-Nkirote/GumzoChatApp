const User = require('../models/userSchema');
const { StatusCodes } = require('http-status-codes');

const checkIfUserExists = async (req, res, next) => {
  try {
    const { username, email } = req.body;

    // check if user with same username and email already exists
    const existingUser = await User.findOne({
      $or: [{ username, email }],
    });

    if (existingUser) {
      return res.render('error.ejs', {
        message:
          'User already exists. Please go to Login page and login to your account ',
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(
      StatusCodes.INTERNAL_SERVER_ERROR.json({ error: 'Server error' })
    );
  }
};

module.exports = checkIfUserExists;
