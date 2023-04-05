import { useQuery } from "@tanstack/react-query";
import { getCartData, getUserData } from "../utils/api";

export const useCart = () => {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartData,
  });

  return { data, isError, error, isLoading };
};

export const useUser = () => {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUserData,
  });
  return { data, isError, error, isLoading };
};
