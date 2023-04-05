import { useQuery } from "@tanstack/react-query";
import { getCartData } from "../utils/api";

export const useCart = () => {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartData,
  });

  return { data, isError, error, isLoading };
};
