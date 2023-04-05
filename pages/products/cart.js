import { unstable_getServerSession } from "next-auth";
import React, { useContext } from "react";
import ProductItem from "../../components/products/Product";

import { authOptions } from "../api/auth/[...nextauth]";
import { useCart } from "../../hooks/queries";

const Cart = ({ session }) => {
  const { data: cartState } = useCart();

  return (
    <div>
      {cartState?.cart?.map((el) => {
        return (
          <ProductItem
            key={el._id}
            title={el.title}
            price={el.price}
            _id={el._id}
          />
        );
      })}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // const UserCart = Cart.find({ user: session.user.name });

  return {
    props: {
      logSession: session,
    },
  };
};

export default Cart;
