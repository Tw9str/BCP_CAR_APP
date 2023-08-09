const mongoose = require("mongoose");

const PageShcema = new mongoose.Schema(
  {
    bannerText: String,
    bannerText2: String,
    btnText: String,
    bannerImg: String,
    shopText: String,
    shopText2: String,
    btnShopText: String,
    shopImg: String,
    customText: String,
    customText2: String,
    btnCustomText: String,
    customImg: String,
  },
  { timestamps: true }
);

const PageContent = mongoose.model("PageContent", PageShcema);

module.exports = PageContent;
