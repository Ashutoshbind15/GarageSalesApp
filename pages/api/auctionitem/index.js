import connectDB from "../../../utils/db";

import AuctionItem from "../../../models/AuctionItem";

const handler = async (req, res) => {
  await connectDB();

  if (req.method === "POST") {
    const product = await AuctionItem.create(req.body);
    res.status(200).json(product);
  }
};

export default handler;
