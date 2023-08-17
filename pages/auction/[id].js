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
  const [active, setActive] = useState([]);
  const [bidItems, setBidItems] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;
    const helper = async () => {
      const { data: auction } = await axios.get(`/api/aunctions/${id}`);
      setBidItems(auction.products);
      setBidData(auction.products[0]);
      console.log(auction);
      setBid({ bid: bidData?.currentBid, bidder: bidData?.currBidder });
    };

    helper();
  }, [router.isReady, id]);

  const sendMsg = async (e) => {
    e.preventDefault();
    await axios.post(`/api/auctionitem/${bidData?._id}`, {
      bid: msgIp,
      user: session?.user?.id,
    });
  };

  const auctionEndHandler = async () => {
    const { data } = await axios.post(`/api/auctionitem/${bidData._id}/finish`);
    setBidData(data);
  };

  useEffect(() => {
    const chatChannel = pusherClient.subscribe("presence-auction");
    chatChannel.bind("bid", (msg) => {
      setBid(msg);
    });

    chatChannel.bind("pusher:subscription_succeeded", (res) => {
      const t = [];
      chatChannel.members.each((mem) => t.push(mem));
      setActive(t);
    });

    chatChannel.bind("pusher:member_added", (member) => {
      const t = [];
      chatChannel.members.each((mem) => t.push(mem));
      setActive(t);
    });

    chatChannel.bind("pusher:member_removed", (member) => {
      const t = [];
      chatChannel.members.each((mem) => t.push(mem));
      setActive(t);
    });

    return () => {
      pusherClient.unsubscribe("presence-auction");
    };
  }, []);
  return (
    <>
      <div>
        {JSON.stringify(bidData)} <br />
        {/* {JSON.stringify(bid)} <br /> */}
        {/* style the countdown suggest classes in tailwind */}
      </div>

      <div className="shadow-md rounded-md px-4 py-2 bg-slate-800 text-white font-semibold">
        Bidder : {bid?.userId} <br />
        Bid : {bid?.bid} <br />
      </div>

      <div className="flex items-center">
        <div className="mr-2 font-semibold text-red-400">Time Left for end</div>
        {bidData && !bidData.finish && (
          <Countdown
            date={new Date(bidData?.end).getTime()}
            onComplete={auctionEndHandler}
            className="text-2xl text-red-600 font-semibold text-center"
          />
        )}
      </div>
      {!bidData?.finish && (
        <form
          action=""
          onSubmit={sendMsg}
          className="flex flex-col text-center"
        >
          {/* heading text classnames give  */}
          <div className="my-4 text-xl text-purple-800 font-bold">
            Send a bid!
          </div>
          <div className="flex items-center justify-center mb-4">
            <input
              type="text"
              name=""
              id=""
              value={msgIp}
              onChange={(e) => setMsgIp(e.target.value)}
              className="border-2 border-gray-500 rounded-md px-4 py-2 mr-4 text-white"
            />
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      )}

      {bidData?.finish && <div>Winner : {bidData.currBidder}</div>}
      {/* {JSON.stringify(active)} */}
      <div className="text-green-600 font-semibold text-center">
        Members online : {active.length}
      </div>
    </>
  );
};

export default AuctionPage;
