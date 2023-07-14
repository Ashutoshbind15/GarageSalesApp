import mongoose from "mongoose";

const GarageSchema = new mongoose.Schema({
  name: String,
  location: String,
  contact: Number,
  desc: String,

  url: [String],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  featured: Boolean,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Garage = mongoose.models.Garage || mongoose.model("Garage", GarageSchema);

export default Garage;
