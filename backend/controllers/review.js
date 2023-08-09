const Review = require("../models/review");

const addReview = async (req, res) => {
  const { name, review } = req.body;

  const newReview = new Review({
    name,
    review,
  });
  try {
    await newReview.save();
    res.status(201).json({ success: true, message: "Verzonden" });
  } catch (error) {
    res
      .status(500)
      .json({ error: error, success: false, message: "Error niet verzonden" });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const approveReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    review.approved = true;
    await review.save();
    res.status(201).json({ success: true, message: "Review Approved" });
  } catch (error) {
    res
      .status(500)
      .json({ error: error, success: false, message: "Error saving update" });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    await review.remove();
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addReview, getReviews, approveReview, deleteReview };
