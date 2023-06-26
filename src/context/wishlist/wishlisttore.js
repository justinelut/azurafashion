import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

const Store = (set) => ({
    wishlist: [],
    setWishList: (wishlistItem) => set((state) => ({ wishlist: [wishlistItem, ...state.wishlist] })),
    clearWishlist: () =>
        set((state) => ({
            wishlist: [],
        })),
    deleteWishlistItem: (wishlistItem) =>
        set((state) => ({
            wishlist: state.wishlist.filter(
                (item) => item.id !== wishlistItem.id
            ),
        })),
});

export const useWishListStore = create(
    devtools(
        persist(Store, {
            name: "wishlistitems",
        })
    )
);
