import { createContext } from "react";


export const initialContextValues = {
  cart: [],
};

const CartContext = createContext(initialContextValues);

export default CartContext;
