import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SquareProduct } from "@/lib/square";

export interface CartItem {
    product: SquareProduct;
    quantity: number;
    variationId?: string;
    variationName?: string;
}

interface CartStore {
    items: CartItem[];
    isOpen: boolean;
    addItem: (product: SquareProduct, quantity?: number, variationId?: string, variationName?: string) => void;
    removeItem: (productId: string, variationId?: string) => void;
    updateQuantity: (productId: string, quantity: number, variationId?: string) => void;
    clearCart: () => void;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    getCartTotalCents: () => number;
}

function itemKey(id: string, variationId?: string): string {
    return variationId ? `${id}::${variationId}` : id;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            addItem: (product, quantity = 1, variationId?, variationName?) => {
                set((state) => {
                    const key = itemKey(product.id, variationId);
                    const existingItem = state.items.find(
                        (i) => itemKey(i.product.id, i.variationId) === key
                    );
                    if (existingItem) {
                        return {
                            items: state.items.map((i) =>
                                itemKey(i.product.id, i.variationId) === key
                                    ? { ...i, quantity: i.quantity + quantity }
                                    : i
                            ),
                        };
                    }
                    return { items: [...state.items, { product, quantity, variationId, variationName }] };
                });
                get().openCart();
            },
            removeItem: (productId, variationId) =>
                set((state) => {
                    const key = itemKey(productId, variationId);
                    return {
                        items: state.items.filter((i) => itemKey(i.product.id, i.variationId) !== key),
                    };
                }),
            updateQuantity: (productId, quantity, variationId) =>
                set((state) => {
                    const key = itemKey(productId, variationId);
                    return {
                        items: state.items.map((i) =>
                            itemKey(i.product.id, i.variationId) === key ? { ...i, quantity: Math.max(1, quantity) } : i
                        ),
                    };
                }),
            clearCart: () => set({ items: [] }),
            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),
            getCartTotalCents: () => {
                return get().items.reduce(
                    (total, item) => {
                        const price = item.variationId
                            ? item.product.variations.find(v => v.id === item.variationId)?.priceCents ?? item.product.priceCents
                            : item.product.priceCents;
                        return total + price * item.quantity;
                    },
                    0
                );
            },
        }),
        {
            name: "2treatsdown-cart",
            partialize: (state) => ({ items: state.items }),
        }
    )
);
