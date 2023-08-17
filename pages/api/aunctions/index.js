import connectDB from "../../../utils/db";
import Aunction from "../../../models/Aunction";
import Garage from "../../../models/Garage";
import AuctionItem from "../../../models/AuctionItem";

const handler = async (req, res) => {
  await connectDB();

  if (req.method === "GET") {
    const aunctions = await Aunction.find({}).populate({
      path: "products",
      model: AuctionItem,
    });
    res.status(200).json(aunctions);
  }

  if (req.method === "POST") {
    const { title, location, contact, gid } = req.body;
    const naunct = new Aunction({ title, location, contact });
    naunct.garage = gid;
    const garage = await Garage.findById(gid);
    garage.auctions.push(naunct._id);
    await naunct.save();
    res.status(200).json(naunct);
  }
};

export default handler;
