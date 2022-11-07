import axios from "axios";
import { useSession } from "next-auth/react";
import Router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../context/CartContext";
import Button from "../UI/Button";
import Card from "../UI/Card";

const ProductItem = ({ title, price, _id }) => {
  const cartCtx = useContext(cartContext);
  const { cartActionsDispatch, cartState } = cartCtx;
  const { cart } = cartState;

  const [isSel, setIsSel] = useState(
    cart.find((el) => el._id === _id) ? true : false
  );

  useEffect(() => {
    setIsSel(cart.find((el) => el._id === _id) ? true : false);
  }, [cart]);

  //selected or inclusion in the cart to sync with ctx initially filled in with data from the server
  //fetch quantity from the server here itself to avoid the stale state problem
  //localize the cart State and the quantity state as the crawlers dont need to see them anyway

  const { data: session, status } = useSession();

  const favToggler = async () => {
    if (!isSel) {
      await axios.post(`/api/cart`, {
        userId: session.user.id,
        productId: _id,
      });

      cartActionsDispatch({
        type: "addItem",
        payload: { title, price, _id },
      });
    } else {
      cartActionsDispatch({
        type: "removeItem",
        payload: { _id: _id },
      });
      await axios.delete(`/api/cart`, {
        data: {
          userId: session.user.id,
          productId: _id,
        },
      });
    }

    setIsSel((prev) => !prev);
  };

  return (
    <Card>
      <h1>{title}</h1>
      <h1>{price}</h1>
      <Button onClick={favToggler}>{!isSel ? "Fav" : "remove"}</Button>
      <Button
        onClick={() => Router.push(`http://localhost:3000/products/${_id}`)}
      >
        View
      </Button>
    </Card>
  );
};

export default ProductItem;
