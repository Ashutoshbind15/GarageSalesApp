import AuctionItem from "../../../../models/AuctionItem";
import Aunction from "../../../../models/Aunction";
import connectDB from "../../../../utils/db";

const handler = async (req, res) => {
  connectDB();

  const { id } = req.query;

  if (req.method === "GET") {
    const auction = await Aunction.findById(id).populate({
      path: "products",
      model: AuctionItem,
    });

    console.log(auction);
    res.status(200).json(auction);
  }
};

export default handler;
