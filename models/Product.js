import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: String,
  price: Number,
  quantity: Number,
  url: String,
  garage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Garage",
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
