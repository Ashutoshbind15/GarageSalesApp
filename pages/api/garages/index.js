import connectDB from "../../../utils/db";
import Garage from "../../../models/Garage";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import User from "../../../models/User";

const handler = async (req, res) => {
  await connectDB();

  if (req.method === "GET") {
    const garages = await Garage.find({});
    res.status(200).json(garages);
  }

  if (req.method === "POST") {
    const sess = await unstable_getServerSession(req, res, authOptions);

    if (!sess) {
      return res.status(401).json({ msg: "Unauth" });
    }
    console.log(sess);
    const { id } = sess.user;

    const { name, location, contact, desc } = req.body;
    const garage = await Garage.create({ name, location, contact, desc });
    const user = await User.findById(id);
    garage.owner = user._id;
    user.garages.push(garage._id);
    await garage.save();
    await user.save();
    res.status(200).json(garage);
  }
};

export default handler;
