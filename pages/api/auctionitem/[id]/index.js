import AuctionItem from "../../../../models/AuctionItem";
import User from "../../../../models/User";
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

    const user = await User.findById(req.body.user);
    product.currBidder = req.body.user;

    // product.end += 10000;
    const a = dayjs(product.end);
    const b = a.add(10, "seconds").toISOString();
    product.end = b;
    product.currentBid = +currBid;
    product.save();
    pusher.trigger("presence-auction", "bid", {
      bid: currBid,
      userId: user.username,
    });
    res.status(200).json(product);
  }
};

export default handler;
