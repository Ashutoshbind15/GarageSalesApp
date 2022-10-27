import connectDB from "../../../utils/db";
import Product from "../../../models/Product";

const handler = async (req, res) => {
  connectDB();

  if (req.method === "GET") {
    const { id } = req.query;

    const product = await Product.findById(id);

    res.status(200).json(product);
  }

  if (req.method === "PUT") {
    const { selected, _id } = req.body;
    const product = await Product.findByIdAndUpdate(
      _id,
      { selected: selected },
      { new: true }
    );

    res.status(200).json(product);
  }
};

export default handler;
