import React, { useContext } from "react";
import ProductItem from "../../components/products/Product";
import { cartContext } from "../../context/CartContext";

const Cart = () => {
  const cartCtx = useContext(cartContext);
  const { cartState, cartActionsDispatch } = cartCtx;

  return (
    <div>
      {cartState.cart.map((el) => (
        <ProductItem
          key={el._id}
          title={el.title}
          price={el.price}
          quantity={el.quantity}
          selected={true}
          _id={el._id}
        />
      ))}
    </div>
  );
};

export default Cart;
