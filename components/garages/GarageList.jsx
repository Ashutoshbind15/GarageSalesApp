import Router from "next/router";
import React from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";

const GarageList = ({ garages }) => {
  return (
    <div className="flex overflow-x-auto my-8">
      {garages.map((el) => {
        return (
          <Card key={el._id}>
            <h1>{el.name}</h1>
            <h1>{el.location}</h1>
            <h1>{el.products}</h1>

            <Button
              className="bg-pink-700"
              onClick={() => Router.push(`/garages/${el._id}`)}
            >
              Visit
            </Button>
          </Card>
        );
      })}

      <Button onClick={() => Router.push("/garages")}>View all garages</Button>
    </div>
  );
};

export default GarageList;
