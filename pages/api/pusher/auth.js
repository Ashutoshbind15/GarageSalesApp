import { unstable_getServerSession } from "next-auth";
import { pusher } from "../../../utils/pusher";
import { authOptions } from "../../api/auth/[...nextauth]";

export default async function handler(req, res) {
  // const { socketId, channel_name } = req.body;
  const session = await unstable_getServerSession(req, res, authOptions);

  const [socketId, channel_name] = req.body
    .split("&")
    .map((str) => str.split("=")[1]);

  if (!session) return res.status(403).json({ msg: "unauth" });
  const { user } = session;
  if (!user) return res.status(403).json({ msg: "unauth" });
  const { id } = user;

  const presenceData = {
    user_id: id,
    userData: { userId: id, role: user?.role },
  };

  const auth = pusher.authorizeChannel(socketId, channel_name, presenceData);
  res.send(auth);
}
