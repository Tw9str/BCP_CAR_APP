const express = require("express");
const { getCars, getCar } = require("../controllers/cars");

const router = express.Router();

router.get("/", getCars);
router.get("/car/:slug", getCar);

module.exports = router;
