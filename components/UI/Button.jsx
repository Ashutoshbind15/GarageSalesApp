import React from "react";

const Button = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-md p-4 hover:scale-110 hover:transition-all ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
