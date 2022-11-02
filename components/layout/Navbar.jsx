import Link from "next/link";
import React, { useContext } from "react";
import { cartContext } from "../../context/CartContext";

const Navbar = () => {
  const cartCtx = useContext(cartContext);

  const { cartState } = cartCtx;

  return (
    <div className="bg-blue-600 sticky top-0 mb-4 p-4 text-white flex justify-between font-bold text-xl">
      <Link href="/">Garage Sales App</Link>
      <Link href="/products/cart">{`Cart ${cartState.amount}`}</Link>
    </div>
  );
};

export default Navbar;
