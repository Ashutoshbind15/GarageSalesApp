import axios from "axios";
import { useSession } from "next-auth/react";

export const getCartData = async () => {
  const { data } = await axios.get("/api/cart");
  return data;
};

export const getUserData = async () => {
  const { data } = await axios.get("/api/auth/me");
  return data;
};

export const editUserData = async (payload) => {
  await axios.put("/api/auth/me", payload);
};

export const postCartData = async (payload) => {
  await axios.post("/api/cart", payload);
};

export const deleteCartData = async (payload) => {
  await axios.delete("/api/cart", { data: payload });
};
