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
});

const Garage = mongoose.models.Garage || mongoose.model("Garage", GarageSchema);

export default Garage;
