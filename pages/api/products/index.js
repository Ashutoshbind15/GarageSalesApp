import connectDB from "../../../utils/db";
import Product from "../../../models/Product";
import Garage from "../../../models/Garage";

const handler = async (req, res) => {
  await connectDB();

  if (req.method === "POST") {
    const { title, price, quantity } = req.body;
    const newProd = new Product({ title, price, quantity });
    const { garageId } = req.body;
    newProd.garage = garageId;
    const garage = await Garage.findById(garageId);
    garage.products.push(newProd._id);
    await newProd.save();
    await garage.save();
    res.status(200).json(newProd);
  }

  if (req.method === "GET") {
    const products = await Product.find({});
    res.status(200).json(products);
  }
};

export default handler;
