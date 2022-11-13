import { unstable_getServerSession } from "next-auth";
import React from "react";
import ProductItem from "../../components/products/Product";
import { useCartQuery } from "../../utils/query/hooks";
import { authOptions } from "../api/auth/[...nextauth]";

const Cart = () => {
  const { data: cart, error, isError, isLoading } = useCartQuery();
  let content;

  if (isLoading) {
    content = <p>Loadign ...</p>;
  } else if (isError) {
    content = <p>{error.message}</p>;
  } else {
    content = (
      <div>
        {cart?.map((el) => (
          <ProductItem
            key={el._id}
            title={el.title}
            price={el.price}
            _id={el._id}
          />
        ))}
      </div>
    );
  }

  return content;
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
