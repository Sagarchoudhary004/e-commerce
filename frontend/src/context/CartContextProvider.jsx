import React, { useCallback, useMemo, useState } from "react";
import CartContext from "./CartContext";



const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("shopemate-cart") || "[]");
        } catch {
            return [];
        }
    });

    const addToCart = useCallback((product) => {
        if (!product?._id) return;
        setCart((items) => {
            const existing = items.find((item) => item._id === product._id);
            const nextItems = existing
                ? items.map((item) => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item)
                : [...items, { ...product, quantity: 1 }];
            localStorage.setItem("shopemate-cart", JSON.stringify(nextItems));
            return nextItems;
        });
    }, []);

    const removeFromCart = useCallback((productId) => {
        setCart((items) => {
            const nextItems = items.filter((item) => item._id !== productId);
            localStorage.setItem("shopemate-cart", JSON.stringify(nextItems));
            return nextItems;
        });
    }, []);

    const updateQuantity = useCallback((productId, quantity) => {
        setCart((items) => {
            const nextItems = quantity <= 0
                ? items.filter((item) => item._id !== productId)
                : items.map((item) => item._id === productId ? { ...item, quantity } : item);
            localStorage.setItem("shopemate-cart", JSON.stringify(nextItems));
            return nextItems;
        });
    }, []);

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const value = useMemo(() => ({ cart, cartCount, addToCart, removeFromCart, updateQuantity }), [cart, cartCount, addToCart, removeFromCart, updateQuantity]);
    return (
        <CartContext.Provider value={value}>
        {children}
        </CartContext.Provider>
    )

}


export default CartContextProvider
