import mongoose from "mongoose";

const AunctionSchema = new mongoose.Schema(
  {
    title: String,
    location: String,
    aunctioneer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    garage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Garage",
    },
    contact: Number,
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Aunction =
  mongoose.models.Aunction || mongoose.model("Aunction", AunctionSchema);

export default Aunction;
