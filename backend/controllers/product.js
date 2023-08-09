const Product = require("../models/product");
const { promisify } = require("util");
const { join } = require("path");
const fs = require("fs");

const addProduct = async (req, res) => {
  const { title, description, price, details, productInfo } = req.body;
  const imagesPath = req.files.map((file) => file.filename);

  const product = new Product({
    title,
    description,
    price,
    details,
    productInfo,
    imagesPath,
  });

  try {
    await product.save();
    res
      .status(201)
      .json({ success: true, message: "Product successfully added" });
  } catch (err) {
    req.files.forEach((file) => {
      fs.unlinkSync(file.path);
    });
    res.status(500).json({ message: "Faild adding product" });
  }
};

const getProducts = async (req, res) => {
  Product.find({}, (err, products) => {
    try {
      res.status(200).send(products);
    } catch {
      res.status(500).json({ messege: "Faild fetching products" });
    }
  });
};

const getProduct = async (req, res) => {
  const { slug } = req.params;
  try {
    const product = await Product.findOne({ slug });
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).send({ message: "Server error" });
  }
};

const updateSold = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.inStock = !product.inStock;
    await product.save();
    res.status(201).json({ success: true, message: "Status updated" });
  } catch (err) {
    res.status(500).json({ message: "Error saving update" });
  }
};

const deleteFile = promisify(fs.unlink);

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    for (const image of product.imagesPath) {
      const imagePath = join(__dirname, "../public/assets/imgs", image);
      if (fs.existsSync(imagePath)) {
        await deleteFile(imagePath);
      }
    }
    await product.remove();
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  updateSold,
  deleteProduct,
};
