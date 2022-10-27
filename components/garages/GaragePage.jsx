import React from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";

const GaragePage = ({ _id, name, location, contact, products }) => {
  return (
    <Card className="p-6">
      <div>
        <h1 className="text-2xl text-center bg-red-400">{name}</h1>
        <h1 className="text-2xl text-center bg-red-400">{contact}</h1>
        <h1 className="text-2xl text-center bg-red-400">
          {" "}
          {products ? products.length : "0"}
        </h1>
        <h1 className="text-2xl text-center bg-red-400">{location}</h1>
        <h1 className="text-2xl text-center bg-red-400">{_id}</h1>
      </div>

      <ul>
        {products.map((el) => (
          <li>{el.title}</li>
        ))}
      </ul>

      <Button className="bg-pink-500">View all products</Button>
    </Card>
  );
};

export default GaragePage;
