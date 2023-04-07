import React, { useEffect, useState } from "react";

import axios from "axios";
import { useSession } from "next-auth/react";
import Countdown from "react-countdown";
import { useRouter } from "next/router";
import { pusherClient } from "../../utils/pusher";

const AuctionPage = () => {
  const { data: session } = useSession();
  const [bid, setBid] = useState(null);
  const [bidData, setBidData] = useState(null);
  const [msgIp, setMsgIp] = useState("");

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) return;
    const helper = async () => {
      const { data } = await axios.get(`/api/auctionitem/${id}`);
      setBidData(data);
      setBid({ bid: data.currentBid, bidder: data.currBidder });
    };

    helper();
  }, [router.isReady]);

  useEffect(() => {
    if (!router.isReady) return;
    const helper = async () => {
      const { data } = await axios.get(`/api/auctionitem/${id}`);
      setBidData(data);
    };

    helper();
  }, [bid, router.isReady]);

  const sendMsg = async (e) => {
    e.preventDefault();
    await axios.post(`/api/auctionitem/${id}`, {
      bid: msgIp,
      user: session?.user?.id,
    });
  };

  const auctionEndHandler = async () => {
    const { data } = await axios.post(`/api/auctionitem/${id}/finish`);
    setBidData(data);
  };

  useEffect(() => {
    const chatChannel = pusherClient.subscribe("auction");

    chatChannel.bind("bid", (msg) => {
      setBid(msg);
    });

    return () => {
      pusherClient.unsubscribe("auction");
    };
  }, []);
  return (
    <>
      <div>
        {JSON.stringify(bidData)} <br />
        {JSON.stringify(bid)} <br />
        {bidData && !bidData.finish && (
          <Countdown
            date={new Date(bidData?.end).getTime()}
            onComplete={auctionEndHandler}
          />
        )}
      </div>

      {!bidData?.finish && (
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
      )}

      {bidData?.finish && <div>Winner : {bidData.currBidder}</div>}
    </>
  );
};

export default AuctionPage;
