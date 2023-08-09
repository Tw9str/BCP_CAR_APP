require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Product = require("../models/product");

const STRIPE_REDIRECT_BASE_URL = process.env.BASE_URL;
const STRIPE_IMG_BASE_URL = process.env.STRIPE_IMG_BASE_URL;

const checkout = async (req, res) => {
  const { items } = req.body;

  try {
    const products = await Product.find({
      _id: { $in: items.map((item) => item.id) },
    });

    const lineItems = products.map((product, index) => {
      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: product.title,
            description: product.description,
            images: [`${STRIPE_IMG_BASE_URL}/assets/imgs/${items[index].img}`],
          },
          unit_amount: product.price * 100,
        },
        adjustable_quantity: { enabled: true, minimum: 1 },
        quantity: items[index].quantity,
      };
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "ideal"],
      billing_address_collection: "auto",
      line_items: lineItems,
      mode: "payment",
      success_url: `${STRIPE_REDIRECT_BASE_URL}/success`,
      cancel_url: `${STRIPE_REDIRECT_BASE_URL}/cancel`,
    });
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during checkout." });
  }
};

module.exports = checkout;
