import axios from "axios";

export const getCart = async () => {
  const { data } = await axios.get("/api/cart");

  if (data) {
    return data.map((el) => el.product);
  }
};

export const deleteItem = async ({ productId, userId }) => {
  return await axios.delete("/api/cart", {
    data: {
      productId: productId,
      userId: userId,
    },
  });
};

export const addItem = async ({ productId, userId }) => {
  return await axios.post("/api/cart", {
    productId: productId,
    userId: userId,
  });
};

export const getMe = async () => {
  return await axios.get("/api/auth/me");
};
