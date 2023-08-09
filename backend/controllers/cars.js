const Car = require("../models/car");
const { promisify } = require("util");
const { join } = require("path");
const fs = require("fs");

const getCars = async (req, res) => {
  Car.find({}, (err, data) => {
    if (err) {
      res.status(500).send("Error retrieving data from database");
    } else {
      res.status(200).send(data);
    }
  });
};

const getCar = async (req, res) => {
  const { slug } = req.params;
  try {
    const car = await Car.findOne({ slug });
    if (!car) {
      return res.status(404).send({ message: "Car not found" });
    }
    res.json(car);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const addCar = async (req, res) => {
  const { make, model, km, year, fuel, price, transmission, description } =
    req.body;
  const imagesPath = req.files.map((file) => file.filename);

  const car = new Car({
    make,
    model,
    km,
    year,
    fuel,
    price,
    transmission,
    description,
    imagesPath,
  });

  try {
    await car.save();
    res.status(201).json({ success: true, message: "Car saved" });
  } catch (err) {
    req.files.forEach((file) => {
      fs.unlinkSync(file.path);
    });
    res.status(500).json({ message: err.message });
  }
};

const updateSold = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    car.sold = !car.sold;
    await car.save();
    res.status(201).json({ success: true, message: "Sold status updated" });
  } catch (error) {
    res.status(500).json({ message: "Error saving update" });
  }
};

const deleteFile = promisify(fs.unlink);

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    for (const image of car.imagesPath) {
      const imagePath = join(__dirname, "../public/assets/imgs", image);
      console.log("imagePath:", imagePath);
      if (fs.existsSync(imagePath)) {
        await deleteFile(imagePath);
      }
    }
    await car.remove();
    res.json({ message: "Car deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getCars, getCar, addCar, updateSold, deleteCar };
