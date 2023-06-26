"use client"
import addWishlist from "../Util/addWishlist";
import {
  ADD_TO_WISHLIST,
  DELETE_WISHLIST_ITEM,
  CLEAR_WISHLIST,
  SET_WISHLIST,
} from "./wishlist-type";



const wishlistReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: addWishlist(state.wishlist, action.payload),
      };
    case DELETE_WISHLIST_ITEM:
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (wishlistItem) => wishlistItem.id !== (action.payload).id
        ),
      };
    case SET_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
      };
    case CLEAR_WISHLIST:
      return {
        ...state,
        wishlist: [],
      };
    default:
      return state;
  }
};

export default wishlistReducer;
