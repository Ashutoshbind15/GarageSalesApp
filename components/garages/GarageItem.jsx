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

        <button onClick={() => Router.push(`/garages/${id}`)}>Visit</button>
      </ul>
    </Card>
  );
};

export default GarageItem;
