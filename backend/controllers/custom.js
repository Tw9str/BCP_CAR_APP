const Custom = require("../models/custom");
const { promisify } = require("util");
const { join } = require("path");
const fs = require("fs");

const addCustom = async (req, res) => {
  const { title, description, price, details, productInfo } = req.body;
  const imagesPath = req.files.map((file) => file.filename);

  const custom = new Custom({
    title,
    description,
    price,
    details,
    productInfo,
    imagesPath,
  });
  try {
    await custom.save();
    res.status(201).json({ success: true, message: "Custom created" });
  } catch (err) {
    req.files.forEach((file) => {
      fs.unlinkSync(file.path);
    });
    res.status(500).json({ message: "Faild creating custom" });
  }
};

const getCustoms = async (req, res) => {
  Custom.find({}, (err, customs) => {
    try {
      res.status(200).send(customs);
    } catch {
      res.status(500).json({ messege: "Faild fetching customs" });
    }
  });
};

const getCustom = async (req, res) => {
  const { slug } = req.params;
  try {
    const custom = await Custom.findOne({ slug });
    if (!custom) {
      return res.status(404).send({ message: "Custom not found" });
    }
    res.json(custom);
  } catch (err) {
    res.status(500).send({ message: "Server error" });
  }
};

const updateSold = async (req, res) => {
  try {
    const { id } = req.params;
    const custom = await Custom.findById(id);
    if (!custom) {
      return res.status(404).json({ message: "Custom not found" });
    }
    custom.inStock = !custom.inStock;
    await custom.save();
    res.status(201).json({ success: true, message: "Status updated" });
  } catch (error) {
    res.status(500).json({ message: "Error saving update" });
  }
};

const deleteFile = promisify(fs.unlink);

const deleteCustom = async (req, res) => {
  try {
    const { id } = req.params;
    const custom = await Custom.findById(id);
    if (!custom) {
      return res.status(404).json({ message: "Custom not found" });
    }
    for (const image of custom.imagesPath) {
      const imagePath = join(__dirname, "../public/assets/imgs", image);
      if (fs.existsSync(imagePath)) {
        await deleteFile(imagePath);
      }
    }
    await custom.remove();
    res.json({ message: "Custom deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addCustom, getCustoms, getCustom, updateSold, deleteCustom };
