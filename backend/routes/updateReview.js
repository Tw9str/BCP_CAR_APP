const express = require("express");
const { deleteReview, approveReview } = require("../controllers/review");

const router = express.Router();

router.delete("/delete/:id", deleteReview);
router.patch("/approve/:id", approveReview);
module.exports = router;
