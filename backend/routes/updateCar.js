const express = require("express");
const { updateSold, deleteCar } = require("../controllers/cars");

const router = express.Router();

router.patch("/update/:id", updateSold);
router.delete("/delete/:id", deleteCar);
module.exports = router;
