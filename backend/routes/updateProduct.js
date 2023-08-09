const express = require("express");
const { updateSold, deleteProduct } = require("../controllers/product");

const router = express.Router();

router.patch("/update/:id", updateSold);
router.delete("/delete/:id", deleteProduct);
module.exports = router;
