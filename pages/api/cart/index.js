import connectDB from "../../../utils/db";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import Cart from "../../../models/Cart";
import Product from "../../../models/Product";

const handler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  await connectDB();

  if (!session) {
    return res.status(401).json({ msg: "Not Authorized" });
  }

  if (req.method === "POST") {
    const data = await Cart.create({
      product: req.body.productId,
      user: req.body.userId,
    });

    res.status(201).json(data);
  }

  if (req.method === "DELETE") {
    const data = await Cart.deleteOne({
      product: req.body.productId,
      user: req.body.userId,
    });

    res.status(201).json(data);
  }

  if (req.method === "GET") {
    const cartItems = await Cart.find({ user: session.user.id }).populate({
      path: "product",
      Product,
    });

    const tfmd = cartItems.map((el) => el.product);
    res.status(200).json({ cart: tfmd, amount: tfmd.length });
  }
};

export default handler;
