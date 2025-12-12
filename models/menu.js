// const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    taste: {
      type: String,
      enum: ["sweet", "spicy", "bitter", "sour", "salty"],
      required: true,
    },
    is_drink: {
      type: Boolean,
      default: false,
    },
    ingrediaents: {
      type: [String],
      default: [],
    },
    num_sales: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const menu = mongoose.model("menu", menuSchema);
module.exports = menu;
