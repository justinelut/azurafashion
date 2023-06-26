"use client"
import { useContext, useEffect, useReducer } from "react";
import cartReducer from "./cartReducer";
import CartContext from "./CartContext";
import { getCookie, setCookie } from "cookies-next";
import {
  ADD_ITEM,
  ADD_ONE,
  REMOVE_ITEM,
  DELETE_ITEM,
  CLEAR_CART,
  SET_CART,
} from "./cart-types";

export const ProvideCart = ({ children }) => {
  const value = useProvideCart();
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);

const useProvideCart = () => {
  const initPersistState = { cart: [] };
  const [state, dispatch] = useReducer(cartReducer, initPersistState);

  useEffect(() => {
    const initialCart = getCookie("cart");
    if (initialCart) {
      const cartItems = JSON.parse(initialCart);
      dispatch({ type: SET_CART, payload: cartItems });
    }
  }, []);

  useEffect(() => {
    setCookie("cart", state.cart);
  }, [state.cart]);

  const addItem = (item) => {
    dispatch({
      type: ADD_ITEM,
      payload: item,
    });
  };

  const addOne = (item) => {
    dispatch({
      type: ADD_ONE,
      payload: item,
    });
  };

  const removeItem = (item) => {
    dispatch({
      type: REMOVE_ITEM,
      payload: item,
    });
  };

  const deleteItem = (item) => {
    dispatch({
      type: DELETE_ITEM,
      payload: item,
    });
  };

  const clearCart = () => {
    dispatch({
      type: CLEAR_CART,
    });
  };

  const value = {
    cart: state.cart,
    addItem,
    addOne,
    removeItem,
    deleteItem,
    clearCart,
  };

  return value;
};
