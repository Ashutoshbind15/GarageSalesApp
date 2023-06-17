import axios from "axios";
import React, { useEffect, useState } from "react";
import AuctionItem from "../../components/auctions/AuctionItem";

const AllAuctions = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const helper = async () => {
      const { data } = await axios.get("/api/aunctions");

      setData(data);
    };

    helper();
  }, []);

  return (
    <div>
      {JSON.stringify(data)}
      {data.map((el) => (
        <AuctionItem auction={el} key={el._id} />
      ))}
    </div>
  );
};

export default AllAuctions;
