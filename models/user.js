const {Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
      password: {
        type: String,
        required: [true, 'Set password for user'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        match: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
        unique: true,
      },
      subscription: {
        type: String,
        minlength: 6,
        enum: ['starter', 'pro', 'business'],
        default: 'starter',
      },
      token: {
        type: String,
        default: '',
      },
      avatarURL: {
        type: String,
        default: null,
      },
      role: {
        type: String,
        default: 'user',
      },
      verify: {
        type: Boolean,
        default: false,
      },
      verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
      },
    },
    {versionKey: false, timestamps: true},
);

const User = model('User', userSchema);

module.exports = User;