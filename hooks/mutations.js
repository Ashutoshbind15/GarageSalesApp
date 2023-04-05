import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteCartData,
  editUserData,
  getCartData,
  postCartData,
} from "../utils/api";

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

export const useUserMutations = () => {
  const queryClient = useQueryClient();

  const editProfileMutation = useMutation({
    mutationFn: editUserData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { editProfileMutation };
};
