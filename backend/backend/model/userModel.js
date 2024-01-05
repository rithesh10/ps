// const { urlencoded } = require('express');
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      // unique:true,
    },
    section: {
      type: String,
      required: [true, "Please add a section"],
      // unique:true,
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      // unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
    },
    rollno: {
      type: String,
      unique: true,
    },
    phoneno: {
      type: String,
      // unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
