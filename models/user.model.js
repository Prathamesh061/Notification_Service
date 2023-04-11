const mongoose = require("mongoose");
const constants = require("../utils/constants");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      minLength: 10,
      unique: true,
    },
    sentWelcomeEmailStatus: {
      type: String,
      enum: [constants.mailStatus.unsent, constants.mailStatus.sent],
      default: constants.mailStatus.unsent,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("User", userSchema);
