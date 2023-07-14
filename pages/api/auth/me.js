import connectDB from "../../../utils/db";
import User from "../../../models/User";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./[...nextauth]";

const handler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({
      message: "Not logged in",
    });

    return;
  }

  await connectDB();

  if (req.method === "GET") {
    const user = await User.findById(session.user.id)
      .populate({ path: "garages", select: "name location contact desc _id" })
      .select("-password");
    if (!user) return res.json({ message: "Something went wrong" });

    return res.status(201).json(user);
  } else if (req.method === "PUT") {
    const { username } = req.body;

    const user = await User.findByIdAndUpdate(session.user.id, req.body, {
      new: true,
    }).select("-password");
    if (!user) return res.json({ message: "Something went wrong" });
    return res.status(201).json(user);
  }
};

export default handler;
