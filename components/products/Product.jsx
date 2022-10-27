import axios from "axios";
import Router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../context/CartContext";
import Button from "../UI/Button";
import Card from "../UI/Card";

const ProductItem = ({ title, price, _id }) => {
  const cartCtx = useContext(cartContext);
  const { cartActionsDispatch, cartState } = cartCtx;
  const [isSel, setIsSel] = useState(false);
  const [inStock, setInStock] = useState(true);
  const [quantity, setQuantity] = useState(0);

  //selected or inclusion in the cart to sync with ctx initially filled in with data from the server
  //fetch quantity from the server here itself to avoid the stale state problem
  //localize the cart State and the quantity state as the crawlers dont need to see them anyway

  useEffect(() => {
    const helper = async () => {
      const { data } = await axios.get(
        `http://localhost:3000/api/products/${_id}`
      );

      setQuantity(data.quantity);
      setIsSel(data.selected);
      if (data.quantity <= 0) setInStock(false);
    };

    helper();
  }, []);

  const favToggler = async () => {
    if (!isSel) {
      cartActionsDispatch({
        type: "addItem",
        payload: { title, price, quantity: quantity - 1, _id },
      });
    } else {
      cartActionsDispatch({
        type: "removeItem",
        payload: { _id: _id },
      });
    }

    await axios.put(`http://localhost:3000/api/products/${_id}`, {
      _id: _id,
      selected: !isSel,
    });
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
