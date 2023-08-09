const express = require("express");
const { getPageContent } = require("../controllers/pageContent");

const router = express.Router();

router.get("/", getPageContent);

module.exports = router;
