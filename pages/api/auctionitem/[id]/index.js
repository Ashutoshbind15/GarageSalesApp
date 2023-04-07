import AuctionItem from "../../../../models/AuctionItem";
import connectDB from "../../../../utils/db";
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
    const currBid = req.body.bid;
    // const { user } = unstable_getServerSession(req, res, authOptions);
    product.currBidder = req.body.user;

    // product.end += 10000;
    const a = dayjs(product.end);
    const b = a.add(10, "seconds").toISOString();
    product.end = b;
    product.currentBid = +currBid;
    product.save();
    pusher.trigger("presence-auction", "bid", {
      bid: currBid,
      userId: req.body.user,
    });
    res.status(200).json({ msg: "success" });
  }
};

export default handler;
