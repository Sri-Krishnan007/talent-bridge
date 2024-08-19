const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      validate: {
        validator: function (v) {
          return v === "" || /\+\d{1,3}\d{10}/.test(v);
        },
        message: "Phone number is invalid!",
      },
    },
    bio: {
      type: String,
    },
  }
);

module.exports = mongoose.model("RecruiterInfo", schema);
