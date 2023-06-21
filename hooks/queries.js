import { useQuery } from "@tanstack/react-query";
import { getCartData, getUserData } from "../utils/api";
import { useSession } from "next-auth/react";

export const useCart = () => {
  const { data: session } = useSession();

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartData,
    enabled: session?.user ? true : false,
  });

  return { data, isError, error, isLoading };
};

export const useUser = () => {
  const { data: session } = useSession();

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUserData,
    enabled: session?.user ? true : false,
  });

  return { data, isError, error, isLoading };
};
