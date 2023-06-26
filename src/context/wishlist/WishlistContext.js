"use client"
import { createContext } from "react";


export const initialContextValues = {
  wishlist: [],
};

const WishlistContext = createContext(initialContextValues);

export default WishlistContext;
