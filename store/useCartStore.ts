import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SquareProduct } from "@/lib/square";

export interface CartItem {
    product: SquareProduct;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    isOpen: boolean;
    addItem: (product: SquareProduct, quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    getCartTotalCents: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            addItem: (product, quantity = 1) => {
                set((state) => {
                    const existingItem = state.items.find((i) => i.product.id === product.id);
                    if (existingItem) {
                        return {
                            items: state.items.map((i) =>
                                i.product.id === product.id
                                    ? { ...i, quantity: i.quantity + quantity }
                                    : i
                            ),
                        };
                    }
                    return { items: [...state.items, { product, quantity }] };
                });
                get().openCart();
            },
            removeItem: (productId) =>
                set((state) => ({
                    items: state.items.filter((i) => i.product.id !== productId),
                })),
            updateQuantity: (productId, quantity) =>
                set((state) => ({
                    items: state.items.map((i) =>
                        i.product.id === productId ? { ...i, quantity: Math.max(1, quantity) } : i
                    ),
                })),
            clearCart: () => set({ items: [] }),
            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),
            getCartTotalCents: () => {
                return get().items.reduce(
                    (total, item) => total + item.product.priceCents * item.quantity,
                    0
                );
            },
        }),
        {
            name: "2treatsdown-cart",
            // Exclude UI state from persistence
            partialize: (state) => ({ items: state.items }),
        }
    )
);
