import Link from "next/link";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useAuthQuery, useCartQuery } from "../../utils/query/hooks";

const Navbar = () => {
  const { data: cart } = useCartQuery();
  const { data: session, status } = useSession();
  const isAuth = status === "authenticated";

  const { data: user } = useAuthQuery();
  const [username, setUsername] = useState(user?.data.username);

  return (
    <div className="bg-blue-600 sticky top-0 mb-4 p-4 text-white flex justify-between font-bold text-xl">
      <Link href="/">Garage Sales App</Link>
      {session ? (
        <Link href="/products/cart">{`Cart ${cart?.length}`}</Link>
      ) : (
        ""
      )}
      {isAuth ? <Link href="/auth/profile">{username || "ash"}</Link> : null}
    </div>
  );
};

export default Navbar;
