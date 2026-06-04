import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SquareProduct } from "@/lib/square";

export interface CartItem {
    product: SquareProduct;
    variationId: string | null;
    variationName: string | null;
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
            addItem: (product, quantity = 1, variationId?: string, variationName?: string) => {
                set((state) => {
                    const itemKey = variationId ? `${product.id}-${variationId}` : product.id;
                    const existingItem = state.items.find((i) => {
                        const key = i.variationId ? `${i.product.id}-${i.variationId}` : i.product.id;
                        return key === itemKey;
                    });
                    if (existingItem) {
                        return {
                            items: state.items.map((i) => {
                                const key = i.variationId ? `${i.product.id}-${i.variationId}` : i.product.id;
                                return key === itemKey
                                    ? { ...i, quantity: i.quantity + quantity }
                                    : i
                            }),
                        };
                    }
                    const newItem: CartItem = { product, variationId: variationId || null, variationName: variationName || null, quantity };
                    return { items: [...state.items, newItem] };
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
                    (total, item) => {
                        const vPrice = item.variationId && item.product.variations
                            ? item.product.variations.find(v => v.id === item.variationId)?.priceCents ?? item.product.priceCents
                            : item.product.priceCents;
                        return total + vPrice * item.quantity;
                    },
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
