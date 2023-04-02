const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');

const {RequestError, sendMail} = require('../helpers');
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

  const verificationToken = jwt.sign({email}, TOKEN_KEY, {
    expiresIn: '1d',
  });
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: 'Verify your mail',
    // eslint-disable-next-line max-len
    html: `<a target='_blank' href='http:localhost:3000/api/auth/verify/${verificationToken}'>Verify</a>`,
  };

  sendMail(mail);

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
    throw new RequestError(
        401,
        `Not authorized. Wrong ${email} or ${password}`,
    );
  }

  if (!existingUser.verify) {
    throw new RequestError(404, `Not authorized. ${email} is not verified`);
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

const verify = async (req, res, next) => {
  const {verificationToken} = req.params;
  const user = await User.findOne({verificationToken});
  if (!user) {
    throw new RequestError(404, 'User not found');
  }
  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });
  res.json({message: 'Verification successful'});
};

const resendVerificationEmail = async (req, res, next) => {
  const {email} = req.body;

  const user = await User.findOne({email});

  if (!user) {
    throw new RequestError(404, `User with email: ${email} not found`);
  }

  if (user.verify) {
    throw new RequestError(
        400,
        `Verification ${email} has already been passed`,
    );
  }

  const verificationToken = user.verificationToken;
  const mail = {
    to: email,
    subject: 'Verify your mail',
    // eslint-disable-next-line max-len
    html: `<a target='_blank' href='http:localhost:3000/api/auth/verify/${verificationToken}'>Verify</a>`,
  };

  sendMail(mail);

  res.json({
    message: `Verification ${email} has been sent. Please check your inbox`,
  });
};

module.exports = {
  registration,
  login,
  logout,
  verify,
  resendVerificationEmail,
};
