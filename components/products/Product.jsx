import axios from "axios";
import { useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../context/CartContext";
import Button from "../UI/Button";
import Card from "../UI/Card";

const ProductItem = ({ title, price, _id }) => {
  const router = useRouter();

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
    <div className="card bg-base-100 text-white my-4">
      <div className="card-body">
        <div className="card-title">
          <h1>{title}</h1>
        </div>
        <h1>{price}</h1>
        <div className="card-actions">
          <button onClick={favToggler} className="btn btn-primary">
            {!isSel ? "Fav" : "remove"}
          </button>
          <Button
            onClick={() => router.push(`/products/${_id}`)}
            className={"btn btn-primary"}
          >
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
