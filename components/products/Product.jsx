import { useSession } from "next-auth/react";
import Router from "next/router";
import React, { useState } from "react";
import { useCartQuery, useCartMutations } from "../../utils/query/hooks";
import Button from "../UI/Button";
import Card from "../UI/Card";

const ProductItem = ({ title, price, _id }) => {
  const { data: cart } = useCartQuery();
  const { deleteItemMutation, createItemMutation } = useCartMutations();

  const [isSel, setIsSel] = useState(
    cart?.find((el) => el._id === _id) ? true : false
  );

  const { data: session } = useSession();

  const favToggler = async () => {
    if (!isSel) {
      createItemMutation.mutate({
        productId: _id,
        userId: session.user.id,
      });
    } else {
      deleteItemMutation.mutate({
        productId: _id,
        userId: session.user.id,
      });
    }

    setIsSel((prev) => !prev);
  };

  return (
    <Card>
      <h1>{title}</h1>
      <h1>{price}</h1>
      {session ? (
        <Button onClick={favToggler}>{!isSel ? "Fav" : "remove"}</Button>
      ) : null}
      <Button
        onClick={() => Router.push(`http://localhost:3000/products/${_id}`)}
      >
        View
      </Button>
    </Card>
  );
};

export default ProductItem;
