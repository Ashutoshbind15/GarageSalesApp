import { unstable_getServerSession } from "next-auth";
import AuctionItem from "../../../../models/AuctionItem";
import Aunction from "../../../../models/Aunction";
import connectDB from "../../../../utils/db";
import { authOptions } from "../../auth/[...nextauth]";
import { pusher } from "../../../../utils/pusher";
import dayjs from "dayjs";

const handler = async (req, res) => {
  await connectDB();

  if (req.method === "GET") {
    const { id } = req.query;
    const aunctions = await AuctionItem.findById(id);
    res.status(200).json(aunctions);
  }

  if (req.method === "POST") {
    const { id } = req.query;
    const product = await AuctionItem.findById(id);
    product.finish = true;
    product.save();
    res.status(200).json(product);
  }
};

export default handler;
