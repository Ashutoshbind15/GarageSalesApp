import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  contact: Number,
  email: String,
  role: Number,
  selected: Boolean,
  garages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Garage",
    },
  ],
  password: String,
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
