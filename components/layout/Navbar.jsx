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
    const helper = () => {
      axios
        .get("/api/auth/me")
        .then((res) => setUsername(res?.data?.username))
        .catch((e) => console.log(e));
    };

    helper();
  }, []);

  return (
    <div className=" bg-blue-600 sticky w-full top-0 mb-4 p-4 text-white flex font-bold text-xl items-center z-20 px-12">
      <Link href="/">
        <div className="flex-1 ">
          <span className="hover:cursor-pointer uppercase">
            Garage Sales App
          </span>
        </div>
      </Link>
      {session ? (
        <Link href="/products/cart">
          <div className="mr-4 hover:cursor-pointer">{`Cart ${cartState.amount}`}</div>
        </Link>
      ) : null}
      {isAuth ? (
        <Link href="/auth/profile">
          <div className="avatar placeholder hover:cursor-pointer">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-12 flex items-center justify-center">
              <span className="text-xl">{username?.toUpperCase()[0]}</span>
            </div>
          </div>
        </Link>
      ) : null}
    </div>
  );
};

export default Navbar;
