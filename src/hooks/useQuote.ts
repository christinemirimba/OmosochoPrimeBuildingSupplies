import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/data/products';

export interface QuoteItem {
    productId: number;
    quantity: number;
}

export const useQuote = () => {
    const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);

    // Load quote from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('quote');
        if (saved) {
            try {
                setQuoteItems(JSON.parse(saved));
            } catch (error) {
                console.error('Error loading quote:', error);
            }
        }
    }, []);

    // Save to localStorage whenever quote changes
    const saveQuote = useCallback((items: QuoteItem[]) => {
        localStorage.setItem('quote', JSON.stringify(items));
        setQuoteItems(items);
    }, []);

    const addToQuote = useCallback((productId: number, quantity: number = 1) => {
        const existing = quoteItems.find(item => item.productId === productId);
        if (existing) {
            const updated = quoteItems.map(item =>
                item.productId === productId
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
            saveQuote(updated);
        } else {
            saveQuote([...quoteItems, { productId, quantity }]);
        }
    }, [quoteItems, saveQuote]);

    const removeFromQuote = useCallback((productId: number) => {
        const updated = quoteItems.filter(item => item.productId !== productId);
        saveQuote(updated);
    }, [quoteItems, saveQuote]);

    const updateQuantity = useCallback((productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromQuote(productId);
            return;
        }
        const updated = quoteItems.map(item =>
            item.productId === productId ? { ...item, quantity } : item
        );
        saveQuote(updated);
    }, [quoteItems, saveQuote, removeFromQuote]);

    const clearQuote = useCallback(() => {
        localStorage.removeItem('quote');
        setQuoteItems([]);
    }, []);

    const isInQuote = useCallback((productId: number) => {
        return quoteItems.some(item => item.productId === productId);
    }, [quoteItems]);

    const getQuoteCount = useCallback(() => {
        return quoteItems.reduce((sum, item) => sum + item.quantity, 0);
    }, [quoteItems]);

    return {
        quoteItems,
        addToQuote,
        removeFromQuote,
        updateQuantity,
        clearQuote,
        isInQuote,
        getQuoteCount
    };
};
