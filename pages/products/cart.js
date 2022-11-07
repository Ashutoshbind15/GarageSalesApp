import { unstable_getServerSession } from "next-auth";
import React, { useContext } from "react";
import ProductItem from "../../components/products/Product";
import { cartContext } from "../../context/CartContext";
import { authOptions } from "../api/auth/[...nextauth]";

const Cart = ({ session }) => {
  const cartCtx = useContext(cartContext);
  const { cartState } = cartCtx;

  return (
    <div>
      {cartState.cart.map((el) => (
        <ProductItem
          key={el._id}
          title={el.title}
          price={el.price}
          _id={el._id}
        />
      ))}
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
