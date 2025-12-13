import { useState, useEffect, useCallback } from 'react';

export const useWishlist = () => {
    const [wishlistItems, setWishlistItems] = useState<number[]>([]);

    // Load wishlist from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('wishlist');
        if (saved) {
            try {
                setWishlistItems(JSON.parse(saved));
            } catch (error) {
                console.error('Error loading wishlist:', error);
            }
        }
    }, []);

    // Save to localStorage
    const saveWishlist = useCallback((items: number[]) => {
        localStorage.setItem('wishlist', JSON.stringify(items));
        setWishlistItems(items);
        // Force update for other components listening to storage (optional, but good for multi-tab)
        window.dispatchEvent(new Event('storage'));
    }, []);

    const addToWishlist = useCallback((productId: number) => {
        if (!wishlistItems.includes(productId)) {
            saveWishlist([...wishlistItems, productId]);
        }
    }, [wishlistItems, saveWishlist]);

    const removeFromWishlist = useCallback((productId: number) => {
        const updated = wishlistItems.filter(id => id !== productId);
        saveWishlist(updated);
    }, [wishlistItems, saveWishlist]);

    const toggleWishlist = useCallback((productId: number) => {
        if (wishlistItems.includes(productId)) {
            removeFromWishlist(productId);
            return false; // Removed
        } else {
            addToWishlist(productId);
            return true; // Added
        }
    }, [wishlistItems, addToWishlist, removeFromWishlist]);

    const clearWishlist = useCallback(() => {
        localStorage.removeItem('wishlist');
        setWishlistItems([]);
    }, []);

    const isInWishlist = useCallback((productId: number) => {
        return wishlistItems.includes(productId);
    }, [wishlistItems]);

    return {
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
        isInWishlist
    };
};
