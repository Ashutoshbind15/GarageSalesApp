import connectDB from "../../../utils/db";
import Aunction from "../../../models/Aunction";
import AuctionItem from "../../../models/AuctionItem";
import Product from "../../../models/Product";

const handler = async (req, res) => {
  await connectDB();

  if (req.method === "GET") {
    const aunctions = await Aunction.find({}).populate({ path: "products" });
    res.status(200).json(aunctions);
  }

  if (req.method === "POST") {
    const aunction = await Aunction.create(req.body);
    res.status(200).json(aunction);
  }
};

export default handler;
