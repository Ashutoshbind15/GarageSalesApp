import React from "react";

const Card = ({ children, className }) => {
  return (
    <div className={`shadow-md py-2 px-4 rounded-md  ${className}`}>
      {children}
    </div>
  );
};

export default Card;
