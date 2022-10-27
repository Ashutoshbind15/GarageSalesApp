import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: String,
  price: Number,
  quantity: Number,
  url: String,
  selected: Boolean,
});

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
