import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addItem, deleteItem, getCart, getMe } from "./api";

export const useCartQuery = () => {
  const data = useQuery(["cart"], getCart);
  return data;
};

export const useAuthQuery = () => {
  const data = useQuery(["auth"], getMe);
  return data;
};

export const useCartMutations = () => {
  const queryClient = useQueryClient();

  const deleteItemMutation = useMutation(deleteItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const createItemMutation = useMutation(addItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  return { deleteItemMutation, createItemMutation };
};
