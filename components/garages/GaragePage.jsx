import Router from "next/router";
import React from "react";
import ProductList from "../products/ProductList";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Image from "next/image";

const GaragePage = ({ _id, name, location, contact, products, desc }) => {
  return (
    <div className="p-6 ">
      <div className="hero bg-base-200 rounded-lg text-white">
        <div className="hero-content w-full py-8 flex-col lg:flex-row  lg:justify-around">
          <div className="flex flex-col">
            <Image
              src="/images/garage1.jpg"
              className="max-w-sm rounded-lg shadow-2xl"
              alt="g1"
            />
            <div className="mt-2 flex w-full justify-around">
              <div>{location}</div>
              <div>{contact}</div>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold"> {name} </h1>
            <p className="py-6">{desc}</p>
            <button
              className="btn btn-primary"
              onClick={() => Router.push(`/garages/${_id}/products`)}
            >
              View all products
            </button>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl text-center ">
          {" "}
          {products ? <ProductList products={products} /> : null}
        </h1>
      </div>
    </div>
  );
};

export default GaragePage;
