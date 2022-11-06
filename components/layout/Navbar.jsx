import Link from "next/link";
import React, { useContext } from "react";
import { cartContext } from "../../context/CartContext";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();

  const cartCtx = useContext(cartContext);

  const isAuth = status === "authenticated";

  const { cartState } = cartCtx;

  console.log(session, status);

  return (
    <div className="bg-blue-600 sticky top-0 mb-4 p-4 text-white flex justify-between font-bold text-xl">
      <Link href="/">Garage Sales App</Link>
      <Link href="/products/cart">{`Cart ${cartState.amount}`}</Link>
      {isAuth ? <p> {session.user.name}</p> : null}
    </div>
  );
};

export default Navbar;
