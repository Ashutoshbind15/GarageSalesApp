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
    const user = await User.findById(session.user.id).select("-password");
    if (!user) return res.json({ message: "Something went wrong" });

    return res.status(201).json(user);
  }
};

export default handler;
