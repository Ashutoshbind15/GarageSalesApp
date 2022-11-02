import Router from "next/router";
import React from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";

const AunctionsList = ({ aunctions }) => {
  return (
    <div className="flex overflow-x-auto">
      {aunctions.map((el) => {
        return (
          <Card key={el._id}>
            <h1>{el.title}</h1>
            <h1>{el.contact}</h1>

            <Button
              className="bg-pink-700"
              onClick={() => {
                Router.push(`/aunctions/${el._id}`);
              }}
            >
              {" "}
              Visit
            </Button>
          </Card>
        );
      })}

      <Button onClick={() => Router.push("/aunctions")}>
        View all Aunctions
      </Button>
    </div>
  );
};

export default AunctionsList;
