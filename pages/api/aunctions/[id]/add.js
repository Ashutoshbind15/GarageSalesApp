import AuctionItem from "../../../../models/AuctionItem";
import Aunction from "../../../../models/Aunction";
import Product from "../../../../models/Product";
import connectDB from "../../../../utils/db";

const handler = async (req, res) => {
  await connectDB();

  const { id } = req.query;

  if (req.method === "POST") {
    console.log("sfjan");
    const auction = await Aunction.findById(id);
    const { product } = req.body;
    const prod = await Product.findById(product);
    const auctionItem = new AuctionItem({
      garage: prod.garage,
      start: Date.now(),
      end: Date.now() + 1000 * 60 * 60 * 24,
      basePrice: prod.price,
      product: prod._id,
      finish: false,
    });

    await auctionItem.save();

    auction.products.push(auctionItem._id);
    await auction.save();
    res.status(200).json(auction);
  }
};

export default handler;
