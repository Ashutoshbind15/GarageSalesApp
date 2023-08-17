import axios from "axios";
import React, { useEffect, useState } from "react";
import AuctionItem from "../../components/auctions/AuctionItem";
import { Form, Formik } from "formik";
import AunctionsList from "../../components/aunctions/AunctionsList";

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
      {/* {JSON.stringify(data)} */}
      <AunctionsList hide={true} aunctions={data} />
    </div>
  );
};

export default AllAuctions;
