import Router, { useRouter } from "next/router";
import React from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";

const AunctionsList = ({ aunctions, hide = false }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col overflow-x-auto my-8 justify-center items-center">
      <div className="carousel w-full">
        {aunctions.map((el) => {
          return (
            <div
              className="card w-96 bg-base-100 shadow-xl text-white mx-2"
              key={el._id}
            >
              <div className="card-body">
                <h2 className="card-title"> {el.title} </h2>
                <p> {el.location} </p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    onClick={() => router.push(`/auction/${el._id}`)}
                  >
                    Visit
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!hide && (
        <button
          onClick={() => Router.push("/auction")}
          className="btn btn-primary w-4/5 my-4"
        >
          All Aunctions
        </button>
      )}
    </div>
  );
};

export default AunctionsList;
