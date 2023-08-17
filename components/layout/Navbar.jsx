import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useCart, useUser } from "../../hooks/queries";

const Navbar = () => {
  const { data: session, status } = useSession();
  const isAuth = status === "authenticated";
  const { data: cartState, isLoading } = useCart();
  const { data: userData } = useUser();

  const signoutHandler = () => {
    signOut();
  };

  return (
    <div className=" bg-blue-600 sticky w-full top-0 mb-4 p-4 text-white flex font-bold text-xl items-center z-20 px-12">
      <Link href="/">
        <div className="flex-1">
          <span className="hover:cursor-pointer uppercase">
            Garage Sales App
          </span>
        </div>
      </Link>
      <div className=" mx-2">
        <Link href={"/garages"}>Garages</Link>
      </div>
      <div className=" mx-2">
        <Link href={"/auction"} className="link mx-4">
          Auctions
        </Link>
      </div>
      {session ? (
        <>
          <Link href="/products/cart">
            <div className="mr-4 hover:cursor-pointer">{`Fav ${cartState?.amount}`}</div>
          </Link>

          <div className="mr-4 hover:cursor-pointer" onClick={signoutHandler}>
            Logout
          </div>
        </>
      ) : null}
      {isAuth ? (
        <Link href="/auth/profile">
          <div className="avatar placeholder hover:cursor-pointer">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-12 flex items-center justify-center">
              <span className="text-xl">
                {userData?.username?.toUpperCase()[0]}
              </span>
            </div>
          </div>
        </Link>
      ) : null}

      {!session && <Link href={"/auth/signIn"}>Login</Link>}
    </div>
  );
};

export default Navbar;
