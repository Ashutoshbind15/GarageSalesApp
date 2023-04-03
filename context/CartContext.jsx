import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";
import cartContextReducer, { cartInitialState } from "./CartReducer";

export const cartContext = createContext(cartInitialState);

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartContextReducer, cartInitialState);
  const [fetch, setFetch] = useState([]);

  useEffect(() => {
    const helper = async () => {
      axios
        .get("/api/cart")
        .then((res) => {
          const productsArray = res?.data.map((el) => el.product);
          setFetch(productsArray);
        })
        .catch((e) => console.log(e));
    };

    helper();
  }, []);

  useEffect(() => {
    dispatch({ type: "seed", payload: fetch });
  }, [fetch]);

  return (
    <cartContext.Provider
      value={{ cartState: state, cartActionsDispatch: dispatch }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
