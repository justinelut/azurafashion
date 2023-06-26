import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

const Store = (set) => ({
    cart: [],
    setCart: (cartItem) => set((state) => ({ cart: [cartItem, ...state.cart] })),
    addItem: (item) =>
        set((state) => ({
            cart: [...state.cart, item],
        })),
    addOne: (cartItem) =>
        set((state) => ({
            cart: [cartItem, state.cart, true],
        })),
    clearCart: () =>
        set((state) => ({
            cart: [],
        })),
    removeItem: (item) =>
        set((state) => ({
            cart: state.cart.filter((cartItem) => cartItem.id !== item.id),
        })),
    deleteItem: (item) =>
        set((state) => ({
            cart: state.cart.filter((cartItem) => cartItem.id !== item.id),
        })),
});

export const useCartStore = create(
    devtools(
        persist(Store, {
            name: "cartitems",
        })
    )
);
