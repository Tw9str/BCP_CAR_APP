const PageContent = require("../models/pageContent");
const path = require("path");
const fs = require("fs");

const getPageContent = async (req, res) => {
  PageContent.find({}, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message });
    } else {
      res.status(200).send(data);
    }
  });
};

const editPageContent = async (req, res) => {
  try {
    const newContent = req.body;
    if (req.files && req.files.length > 0) {
      const fileName = req.files[0].filename;
      const fieldName = req.files[0].fieldname;
      const pageContent = await PageContent.find({});
      const oldImg = await pageContent[0][fieldName];
      const imagePath = path.join(__dirname, "../public/assets/imgs/", oldImg);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Old file removed from storage successfully");
        }
      });
      newContent[fieldName] = fileName;
    }
    const pageContent = await PageContent.findOneAndUpdate(
      {},
      { $set: newContent },
      { new: true }
    );
    if (!pageContent) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({
      message: "Successfully updated",
      pageContent,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

module.exports = { editPageContent, getPageContent };
