"use client"
import { useContext, useEffect, useReducer } from "react";
import { getCookie, setCookie } from "cookies-next";

import wishlistReducer from "./wishlistReducer";
import WishlistContext from "./WishlistContext";
import {
  ADD_TO_WISHLIST,
  DELETE_WISHLIST_ITEM,
  CLEAR_WISHLIST,
  SET_WISHLIST,
} from "./wishlist-type";

export const ProvideWishlist = ({
  children,
}) => {
  const value = useProvideWishlist();
  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

const useProvideWishlist = () => {
  const initPersistState = { wishlist: [] };
  const [state, dispatch] = useReducer(wishlistReducer, initPersistState);

  useEffect(() => {
    const initialWishlist = getCookie("wishlist");
    if (initialWishlist) {
      const wishlistItems = JSON.parse(initialWishlist);
      dispatch({ type: SET_WISHLIST, payload: wishlistItems });
    }
  }, []);

  useEffect(() => {
    setCookie("wishlist", state.wishlist);
  }, [state.wishlist]);

  const addToWishlist = (item) => {
    dispatch({
      type: ADD_TO_WISHLIST,
      payload: item,
    });
  };

  const deleteWishlistItem = (item) => {
    dispatch({
      type: DELETE_WISHLIST_ITEM,
      payload: item,
    });
  };

  const clearWishlist = () => {
    dispatch({
      type: CLEAR_WISHLIST,
    });
  };

  const value = {
    wishlist: state.wishlist,
    addToWishlist,
    deleteWishlistItem,
    clearWishlist,
  };

  return value;
};
