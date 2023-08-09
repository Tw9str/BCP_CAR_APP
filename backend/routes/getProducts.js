const express = require("express");
const { getProducts, getProduct } = require("../controllers/product");

const router = express.Router();

router.get("/", getProducts);
router.get("/product/:slug", getProduct);

module.exports = router;
