import React from "react";
import Card from "../UI/Card";

const ProductList = ({ products }) => {
  return (
    <div className="flex overflow-x-auto my-8">
      {products.map((el) => {
        return (
          <Card key={el._id}>
            <h1>{el.price}</h1>
            <h1>{el.title}</h1>
            <h1>{el.quantity}</h1>
          </Card>
        );
      })}
    </div>
  );
};

export default ProductList;
