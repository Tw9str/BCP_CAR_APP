const mongoose = require("mongoose");

const reviewScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewScheme);

module.exports = Review;
