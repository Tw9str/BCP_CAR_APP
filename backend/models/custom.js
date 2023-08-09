const mongoose = require("mongoose");

const customSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    productInfo: {
      type: String,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    imagesPath: {
      type: [String],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

customSchema.pre("save", function (next) {
  this.slug = generateSlug(this.title, this.description);
  next();
});

function generateSlug(title, description) {
  const slug = `${title} ${description}`.toLowerCase().replace(/\s+/g, "-");
  return slug;
}

const Custom = mongoose.model("Custom", customSchema);

module.exports = Custom;
