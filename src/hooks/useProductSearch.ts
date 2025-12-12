
import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { products } from '@/data/products';

export interface ProductFilters {
    category?: string;
    brand?: string;
    minRating?: number;
    inStockOnly?: boolean;
}

export const useProductSearch = () => {
    // Memoize the standard products list
    const allProducts = useMemo(() => products, []);

    // Configure Fuse.js options
    const fuseOptions = useMemo(() => ({
        keys: [
            { name: 'name', weight: 0.7 },
            { name: 'category', weight: 0.5 },
            { name: 'brand', weight: 0.4 },
            { name: 'description', weight: 0.3 },
            { name: 'features', weight: 0.2 },
            { name: 'specifications', weight: 0.1 }
        ],
        includeScore: true,
        threshold: 0.4, // Lower threshold = clearer matches (less fuzzy), Higher = fuzzier
        ignoreLocation: true,
        useExtendedSearch: false
    }), []);

    // Create Fuse instance
    const fuse = useMemo(() => new Fuse(allProducts, fuseOptions), [allProducts, fuseOptions]);

    const searchProducts = (query: string, filters: ProductFilters = {}) => {
        let results = allProducts;

        // 1. Text Search using Fuse.js
        if (query && query.trim().length > 0) {
            const fuseResults = fuse.search(query.trim());
            results = fuseResults.map(result => result.item);
        }

        // 2. Apply Filters
        return results.filter(product => {
            // Category Filter
            if (filters.category && filters.category !== 'all') {
                if (product.category !== filters.category) return false;
            }

            // Brand Filter
            if (filters.brand && filters.brand !== 'all') {
                if (product.brand !== filters.brand) return false;
            }

            // Rating Filter
            if (filters.minRating && filters.minRating > 0) {
                if (product.rating < filters.minRating) return false;
            }

            // Stock Filter
            if (filters.inStockOnly) {
                if (!product.inStock) return false;
            }

            return true;
        });
    };

    /**
     * Get suggestions keying off the fuse instance directly
     * useful for autocomplete
     */
    const getSuggestions = (query: string, limit = 5) => {
        if (!query || query.trim().length === 0) return [];
        return fuse.search(query.trim(), { limit }).map(res => res.item);
    };

    return {
        searchProducts,
        getSuggestions
    };
};
