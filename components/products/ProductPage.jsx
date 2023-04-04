import React from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import { useRouter } from "next/router";

const ProductPage = ({ _id, title, price, quantity, garage }) => {
  const router = useRouter();

  return (
    <div className="card bg-base-100 text-white font-semibold">
      <div className="card-body">
        <div className="card-title">
          <h1 className="text-2xl">{title}</h1>
        </div>
        <h1 className="text-2xl">Price: {price}</h1>
        <h1 className="text-2xl"></h1>
        <h1 className="text-2xl">Quantity: {quantity}</h1>
        <div className="card-actions mt-2 w-1/6">
          <button
            className="btn bg-blue-600 active:bg-blue-700 text-white hover:bg-blue-600"
            onClick={() => router.push(`/garages/${garage}`)}
          >
            Garage
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
