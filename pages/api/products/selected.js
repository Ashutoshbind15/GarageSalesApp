import connectDB from "../../../utils/db";
import Product from "../../../models/Product";

const handler = async (req, res) => {
  connectDB();

  if (req.method === "GET") {
    const products = await Product.find({ selected: true });
    res.status(200).json(products);
  }
};

export default handler;
