const mongoose = require('mongoose');

const resetPasswordSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    accesstoken: {
      type: String,
      required: true,
    },
    isValid: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const resetPasswordToken = mongoose.model(
  'reset_password_token',
  resetPasswordSchema
);

module.exports = resetPasswordToken;
