const express = require("express");
const { addReview, getReviews } = require("../controllers/review");

const router = express.Router();

router.get("/", getReviews);
router.post("/add", addReview);

module.exports = router;
