import Router from "next/router";
import React from "react";
import Card from "../UI/Card";

const GarageItem = ({ name, location, contact, id }) => {
  return (
    <div className="card bg-base-100 text-white my-2">
      <div className="card-body">
        <div className="card-title"></div>
        {name}
        <div></div>

        <div>{location}</div>
        <div>{contact}</div>
        <div className="card-actions">
          <button
            onClick={() => Router.push(`/garages/${id}`)}
            className="btn btn-primary"
          >
            Visit
          </button>
        </div>
      </div>
    </div>
  );
};

export default GarageItem;
