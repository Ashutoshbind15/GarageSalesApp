import connectDB from "../../../utils/db";
import Garage from "../../../models/Garage";

const handler = async (req, res) => {
  await connectDB();

  if (req.method === "GET") {
    const garages = await Garage.find({});
    res.status(200).json(garages);
  }

  if (req.method === "POST") {
    const garage = await Garage.create(req.body);
    res.status(200).json(garage);
  }
};

export default handler;
