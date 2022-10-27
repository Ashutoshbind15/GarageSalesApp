import connectDB from "../../../utils/db";
import Product from "../../../models/Product";

const handler = async (req, res) => {
  await connectDB();

  if (req.method === "POST") {
    const newP = new Product(req.body);
    const product = await Product.create(req.body);
    res.status(200).json(product);
  }

  if (req.method === "GET") {
    const products = await Product.find({});
    res.status(200).json(products);
  }
};

export default handler;
