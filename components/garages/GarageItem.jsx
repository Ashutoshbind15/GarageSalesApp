import Router from "next/router";
import React from "react";
import Card from "../UI/Card";

const GarageItem = ({ name, location, contact, id }) => {
  return (
    <Card>
      <ul>
        <li>{name}</li>
        <li>{location}</li>
        <li>{contact}</li>

        <button
          onClick={() => Router.push(`http://localhost:3000/garages/${id}`)}
        >
          Visit
        </button>
      </ul>
    </Card>
  );
};

export default GarageItem;
