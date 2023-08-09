const express = require("express");
const { getCustoms, getCustom } = require("../controllers/custom");

const router = express.Router();

router.get("/", getCustoms);
router.get("/custom/:slug", getCustom);

module.exports = router;
