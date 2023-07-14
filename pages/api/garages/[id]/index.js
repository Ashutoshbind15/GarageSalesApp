import Garage from "../../../../models/Garage";
import connectDB from "../../../../utils/db";

const handler = async (req, res) => {
  await connectDB();

  const { id } = req.query;

  if (req.method === "GET") {
    const garage = await Garage.findById(id);
    res.status(200).json(garage);
  }
};

export default handler;
