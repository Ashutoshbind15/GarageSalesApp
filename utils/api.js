import axios from "axios";
import { useSession } from "next-auth/react";

export const getCartData = async () => {
  const { data } = await axios.get("/api/cart");
  return data;
};

export const postCartData = async (payload) => {
  await axios.post("/api/cart", payload);
};

export const deleteCartData = async (payload) => {
  await axios.delete("/api/cart", { data: payload });
};
