const express = require("express");
const { updateSold, deleteCustom } = require("../controllers/custom");

const router = express.Router();

router.patch("/update/:id", updateSold);
router.delete("/delete/:id", deleteCustom);
module.exports = router;
