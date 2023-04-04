import React from "react";
import Card from "../UI/Card";
import { useRouter } from "next/router";

const ProductList = ({ products }) => {
  const router = useRouter();
  return (
    <div className="flex my-8">
      {products.map((el) => {
        return (
          <div
            key={el._id}
            className="card bg-base-100 text-white mr-2 hover:cursor-pointer hover:scale-105 px-12 py-2"
            onClick={() => router.push(`/products/${el._id}`)}
          >
            <div className="card-body">
              <div className="card-title">
                <h1>{el.title}</h1>
              </div>
              <div className="text-base">Price: {el.price}</div>
              <div className="text-base">Quantity: {el.quantity}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
