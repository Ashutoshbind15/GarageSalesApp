import connectDB from "../../../utils/db";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

const handler = async (req, res) => {
  await connectDB();

  if (req.method === "POST") {
    const { password } = req.body;

    const pwd = await bcrypt.hash(password, 12);

    const user = new User({
      ...req.body,
      password: pwd,
    });

    await user.save();

    res.status(200).json(user);
  }
};

export default handler;
