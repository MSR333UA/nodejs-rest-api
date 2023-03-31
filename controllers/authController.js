const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');

const {RequestError} = require('../helpers');
const User = require('../models/user');

const {TOKEN_KEY} = process.env;

const registration = async (req, res, next) => {
  const {email, name, password} = req.body;

  const existingUser = await User.findOne({email});
  if (existingUser) {
    throw new RequestError(409, `Email: ${email} in use`);
  }
  const hashedPassword = await bcryptjs.hash(password, 10);
  const avatarURL = gravatar.url(email, {protocol: 'https', s: '100'});
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    avatarURL,
  });

  res.status(201).json({
    name: user.name,
    email: user.email,
  });
};

const login = async (req, res, next) => {
  const {email, password} = req.body;

  const existingUser = await User.findOne({email});
  const isPasswordValid = await bcryptjs.compare(
      password,
      existingUser.password,
  );
  if (!existingUser || !isPasswordValid) {
    throw new RequestError(401, `Not authorized. Wrong 'Email' or 'Password'`);
  }

  const token = jwt.sign({id: existingUser._id}, TOKEN_KEY, {
    expiresIn: '1h',
  });
  await User.findByIdAndUpdate(existingUser._id, {token});
  res.json({token});
};

const logout = async (req, res, next) => {
  const {_id} = req.user;
  await User.findByIdAndUpdate(_id, {token: ''});
  res.json({message: 'Bearer {{token}}'});
};

module.exports = {
  registration,
  login,
  logout,
};
