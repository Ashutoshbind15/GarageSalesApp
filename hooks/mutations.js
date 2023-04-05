import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCartData, getCartData, postCartData } from "../utils/api";

export const useCartMutations = () => {
  const queryClient = useQueryClient();

  const addCartMutation = useMutation({
    mutationFn: postCartData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const deleteCartMutation = useMutation({
    mutationFn: deleteCartData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return { addCartMutation, deleteCartMutation };
};
