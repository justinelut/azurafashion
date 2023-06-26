import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

const Store = (set) => ({
    cartItems: [],
    addToCart: (product) => {
        set((state) => {
            const existingItem = state.cartItems.find((item) => item.id === product.id);

            if (existingItem) {
                return {
                    cartItems: state.cartItems.map((item) =>
                        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
                    ),
                };
            }

            return {
                cartItems: [...state.cartItems, { ...product, qty: 1 }],
            };
        });
    },
    removeFromCart: (productId) => {
        set((state) => ({
            cartItems: state.cartItems.filter((item) => item.id !== productId),
        }));
    },
    clearCart: () => {
        set({ cartItems: [] });
    },
    decrementQuantity: (productId) => {
        set((state) => ({
            cartItems: state.cartItems.map((item) =>
                item.id === productId ? { ...item, qty: item.qty - 1 } : item
            ),
        }));
    },
    incrementQuantity: (productId) => {
        set((state) => ({
            cartItems: state.cartItems.map((item) =>
                item.id === productId ? { ...item, qty: item.qty + 1 } : item
            ),
        }));
    },
    getTotalPrice: () => {
        return state.cartItems.reduce(
            (total, item) => total + item.price * item.qty,
            0
        );
    },
});

export const useCart = create(
    devtools(
        persist(Store, {
            name: "cartitems",
        })
    )
);
