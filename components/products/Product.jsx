import axios from "axios";
import { useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../UI/Button";
import { useCart } from "../../hooks/queries";
import { useCartMutations } from "../../hooks/mutations";

const ProductItem = ({ title, price, _id }) => {
  const router = useRouter();
  const { data: cart } = useCart();
  const isSel = cart?.cart?.find((el) => el._id === _id) ? true : false;
  const { data: session, status } = useSession();
  const { addCartMutation, deleteCartMutation } = useCartMutations();

  const favToggler = async () => {
    if (!isSel) {
      addCartMutation.mutate({
        userId: session.user.id,
        productId: _id,
      });
    } else {
      deleteCartMutation.mutate({
        userId: session.user.id,
        productId: _id,
      });
    }
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
