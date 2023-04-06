import React, { useEffect, useState } from "react";
import { pusherClient } from "../utils/pusher";
import axios from "axios";

const ChatPage = () => {
  const [msgs, setMsgs] = useState([]);
  const [msgIp, setMsgIp] = useState("");

  const sendMsg = async (e) => {
    e.preventDefault();
    await axios.post("/api/realtime", {
      msgIp,
      socketId: pusherClient.connection.socket_id,
    });
  };
  console.log(pusherClient.connection.socket_id);

  useEffect(() => {
    const chatChannel = pusherClient.subscribe("chat");

    chatChannel.bind("msg", (msg) => {
      console.log(msg);
      setMsgs((prev) => [...prev, msg]);
    });

    console.log(pusherClient.connection.socket_id);

    return () => {
      pusherClient.unsubscribe("chat");
    };
  }, []);
  return (
    <>
      <div>{JSON.stringify(msgs)}</div>
      <form action="" onSubmit={sendMsg}>
        <input
          type="text"
          name=""
          id=""
          value={msgIp}
          onChange={(e) => setMsgIp(e.target.value)}
        />
        <button className="btn btn-ghost">Submit</button>
      </form>
    </>
  );
};

export default ChatPage;
