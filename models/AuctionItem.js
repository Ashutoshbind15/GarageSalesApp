import mongoose from "mongoose";

const AuctionItemSchema = new mongoose.Schema(
  {
    aunctioneer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    currBidder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    garage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Garage",
    },
    contact: Number,
    currentBid: Number,
    start: Date,
    end: Date,
    basePrice: Number,
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    finish: Boolean,
  },
  { timestamps: true }
);

const AuctionItem =
  mongoose.models.AuctionItem ||
  mongoose.model("AuctionItem", AuctionItemSchema);

export default AuctionItem;
