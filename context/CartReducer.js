export const cartInitialState = {
  amount: 0,
  cart: [],
};

const cartContextReducer = (state, action) => {
  switch (action.type) {
    case "seed": {
      return {
        ...state,
        cart: action.payload,
        amount: action.payload.length,
      };
    }
    case "addItem": {
      return {
        ...state,
        cart: [...state.cart, action.payload],
        amount: state.amount + 1,
      };
    }
    case "removeItem": {
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload._id),
      };
    }
    case "clear": {
      return cartInitialState;
    }
    default: {
      return cartInitialState;
    }
  }
};

export default cartContextReducer;
