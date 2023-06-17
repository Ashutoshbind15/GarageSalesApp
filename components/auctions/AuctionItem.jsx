import React from "react";

const AuctionItem = ({ auction }) => {
  return (
    <div>
      {auction.title}
      {auction.products.map((el) => (
        <div key={Math.random().toString()}>
          <div>{JSON.stringify(el)}</div>
          <div>{el?.product?.title}</div>
          <button className="btn btn-primary btn-ghost">Add</button>
        </div>
      ))}
    </div>
  );
};

export default AuctionItem;
