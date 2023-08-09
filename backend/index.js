const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const multer = require("multer");
const verifyToken = require("./middleware/auth");
// Controllers - Files Imports
const { addCar } = require("./controllers/cars");
const { createSeedUser } = require("./controllers/auth");
const { addProduct } = require("./controllers/product");
const { addCustom } = require("./controllers/custom");
const checkout = require("./controllers/stripe");
// Routes Imports
const authRoutes = require("./routes/auth");
const carRoutes = require("./routes/getCars");
const updateCarRoutes = require("./routes/updateCar");
const reviewRoutes = require("./routes/getReviews");
const updateReviewRoutes = require("./routes/updateReview");
const productRoutes = require("./routes/getProducts");
const updateProductRoutes = require("./routes/updateProduct");
const customRoutes = require("./routes/getCustoms");
const updateCustomRoutes = require("./routes/updateCustom");
const pageContentRoutes = require("./routes/pageContentRoutes");
const { editPageContent } = require("./controllers/pageContent");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", () => console.log("connection error"));
db.once("open", () => console.log("Connected to MongoDB Atlas"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets/imgs");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes With Images
app.post("/api/car/add", verifyToken, upload.array("images"), addCar);
app.post("/api/product/add", verifyToken, upload.array("images"), addProduct);
app.post("/api/custom/add", verifyToken, upload.array("images"), addCustom);
app.patch(
  "/api/pageContent/update",
  verifyToken,
  upload.any(),
  editPageContent
);

/* Routes */
app.use("/api/auth", authRoutes);

app.use("/api/cars", carRoutes);
app.use("/api/car", verifyToken, updateCarRoutes);

app.use("/api/review", reviewRoutes);
app.use("/api/review", verifyToken, updateReviewRoutes);

app.use("/api/products", productRoutes);
app.use("/api/product", verifyToken, updateProductRoutes);

app.use("/api/customs", customRoutes);
app.use("/api/custom", verifyToken, updateCustomRoutes);

app.use("/api/pageContent", pageContentRoutes);

/* Seed User */
app.get("/api/createSeedUser", createSeedUser);

/* Stripe Checkout */
app.post("/create-checkout-session", checkout);

/* Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
