import React from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";

const ProductPage = ({ _id, title, price, quantity }) => {
  return (
    <Card className="p-6">
      <div>
        <h1 className="text-2xl text-center bg-red-400">{title}</h1>
        <h1 className="text-2xl text-center bg-red-400">{price}</h1>
        <h1 className="text-2xl text-center bg-red-400"> </h1>
        <h1 className="text-2xl text-center bg-red-400">{quantity}</h1>
        <h1 className="text-2xl text-center bg-red-400">{_id}</h1>
      </div>

      <Button className="bg-pink-500">Garage</Button>
    </Card>
  );
};

export default ProductPage;
