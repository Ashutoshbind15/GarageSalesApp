import Aunction from "../../../../models/Aunction";
import connectDB from "../../../../utils/db";

const handler = async (req, res) => {
  await connectDB();

  const { id } = req.query;

  if (req.method === "POST") {
    const auction = await Aunction.findById(id);
    const { product } = req.body;
    auction.products.push(product);
    await auction.save();
    res.status(200).json(auction);
  }
};

export default handler;
