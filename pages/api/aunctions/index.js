import connectDB from "../../../utils/db";
import Aunction from "../../../models/Aunction";

const handler = async (req, res) => {
  await connectDB();

  if (req.method === "GET") {
    const aunctions = await Aunction.find({});
    res.status(200).json(aunctions);
  }

  if (req.method === "POST") {
    const aunction = await Aunction.create(req.body);
    res.status(200).json(aunction);
  }
};

export default handler;
