import { pusher } from "../../../utils/pusher";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);
    pusher.trigger(
      "chat",
      "msg",
      { msg: req.body.msgIp },
      {
        socket_id: req.body.socketId,
      }
    );
    res.status(200).json({ msg: "hello" });
  }
}
