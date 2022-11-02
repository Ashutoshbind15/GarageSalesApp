import Router from "next/router";
import React from "react";
import ProductList from "../products/ProductList";
import Button from "../UI/Button";
import Card from "../UI/Card";

const GaragePage = ({ _id, name, location, contact, products }) => {
  return (
    <Card className="p-6">
      <div>
        <h1 className="text-2xl text-center">{name}</h1>
        <h1 className="text-2xl text-center ">{contact}</h1>
        <h1 className="text-2xl text-center ">
          {" "}
          {products ? <ProductList products={products} /> : null}
        </h1>
        <h1 className="text-2xl text-center ">{location}</h1>
        <h1 className="text-2xl text-center ">{_id}</h1>
      </div>

      <Button
        className="bg-pink-500"
        onClick={() => Router.push(`/garages/${_id}/products`)}
      >
        View all products
      </Button>
    </Card>
  );
};

export default GaragePage;
