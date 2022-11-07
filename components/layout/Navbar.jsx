import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../context/CartContext";
import { useSession } from "next-auth/react";
import axios from "axios";

const Navbar = () => {
  const { data: session, status } = useSession();
  const cartCtx = useContext(cartContext);
  const isAuth = status === "authenticated";
  const { cartState } = cartCtx;

  const [username, setUsername] = useState("");

  useEffect(() => {
    const helper = async () => {
      const { data } = await axios.get("/api/auth/me");
      setUsername(data.username);
    };

    helper();
  }, []);

  return (
    <div className="bg-blue-600 sticky top-0 mb-4 p-4 text-white flex justify-between font-bold text-xl">
      <Link href="/">Garage Sales App</Link>
      {session ? (
        <Link href="/products/cart">{`Cart ${cartState.amount}`}</Link>
      ) : (
        ""
      )}
      {isAuth ? <Link href="/auth/profile">{username || "ash"}</Link> : null}
    </div>
  );
};

export default Navbar;
