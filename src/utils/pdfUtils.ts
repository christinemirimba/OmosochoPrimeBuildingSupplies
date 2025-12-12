/**
 * PDF Utilities for Omosocho Prime Building Supplies
 *
 * This utility provides helper functions for PDF generation
 * without requiring direct image imports that cause build issues.
 */

/**
 * Get product image path based on product name
 * Returns the relative path to the product image
 */
export const getProductImage = (productName: string): string => {
    // Map product names to their image filenames
    const productImageMap: Record<string, string> = {
        'Cement Bag': 'cement-bag.webp',
        'Concrete Blocks': 'concrete-blocks.webp',
        'Sand': 'sand.webp',
        'Gravel': 'gravel.webp',
        'Reinforcement Bars': 'reinforcement-bars-12mm.webp',
        'Wheelbarrow': 'wheelbarrow.webp',
        'Shovel': 'shovel.webp',
        'Pickaxe': 'pickaxe.webp',
        'Concrete Mixer': 'concrete-mixer.webp',
        'Ladder': 'ladder-6ft.webp',
        'Steel Rods': 'steel-rods-16mm.webp',
        'Galvanized Pipes': 'galvanized-pipes.webp',
        'Wire Mesh': 'wire-mesh.webp',
        'Aluminum Sheets': 'aluminum-sheets.webp',
        'Nails': 'nails-1kg.webp',
        'Steel Plates': 'steel-plates.webp',
        'Binding Wire': 'binding-wire.webp',
        'Steel Beams': 'steel-beams.webp',
        'Corrugated Iron Sheets': 'corrugated-iron-sheets.webp',
        'Metal Pipes': 'metal-pipes.webp',
        'Hammer': 'hammer.webp',
        'Screwdriver Set': 'screwdriver-set.webp',
        'Adjustable Wrench': 'adjustable-wrench.webp',
        'Electric Drill': 'electric-drill.webp',
        'Tape Measure': 'tape-measure.webp',
        'Pliers': 'pliers.webp',
        'Toolbox': 'toolbox.webp',
        'Work Light': 'work-light.webp',
        'Impact Wrench': 'impact-wrench.webp',
        'Drill Set': 'drill-set.webp',
        'Socket Set': 'socket-set.webp',
        'Screwdriver Kit': 'screwdriver-kit.webp',
        'Safety Helmet': 'safety-helmet.webp',
        'Safety Gloves': 'safety-gloves.webp',
        'Safety Goggles': 'safety-goggles.webp',
        'Reflective Vest': 'reflective-vest.webp',
        'Ear Protection': 'ear-protection.webp',
        'Work Boots': 'work-boots.webp',
        'Dust Mask': 'dust-mask.webp',
        'Harness': 'harness.webp',
        'First Aid Kit': 'first-aid-kit.webp',
        'Fire Extinguisher': 'fire-extinguisher.webp',
        'Wall Paint': 'wall-paint-5l.webp',
        'Wall Tiles': 'wall-tiles.webp',
        'Floor Tiles': 'floor-tiles.webp',
        'Wood Varnish': 'wood-varnish.webp',
        'Plaster': 'plaster.webp',
        'Grout': 'grout-5kg.webp',
        'Wood Polish': 'wood-polish.webp',
        'Wallpaper Roll': 'wallpaper-roll.webp',
        'Curtain Rods': 'curtain-rods.webp',
        'Ceiling Board': 'ceiling-board.webp',
        'Ceiling Light': 'ceiling-light.webp',
        'Light Switch': 'light-switch.webp',
        'Wall Socket': 'wall-socket.webp',
        'Extension Cord': 'extension-cord.webp',
        'Electrical Tape': 'electrical-tape.webp',
        'Electrical Wires': 'electrical-wires.webp',
        'Circuit Breaker': 'circuit-breaker.webp',
        'LED Bulb': 'led-bulb.webp',
        'Electric Fan': 'electric-fan.webp',
        'Solar Panel': 'solar-panel.webp',
        'Water Heater': 'water-heater.webp',
        'Water Tank': 'water-tank-1000l.webp',
        'Faucet': 'faucet.webp',
        'Sink': 'sink.webp',
        'Shower Head': 'shower-head.webp',
        'Toilet Bowl': 'toilet-bowl.webp',
        'Drain Pipe': 'drain-pipe.webp',
        'PVC Pipe': 'pvc-pipe-3m.webp',
        'Pipe Fittings Set': 'pipe-fittings-set.webp',
        'Plunger': 'plunger.webp',
        'Anchor Bolts': 'anchor-bolts.webp',
        'Hex Bolts': 'hex-bolts.webp',
        'Nuts & Bolts Set': 'nuts-bolts-set.webp',
        'Toggle Bolts': 'toggle-bolts.webp',
        'Self-Tapping Screws': 'self-tapping-screws.webp',
        'Drywall Screws': 'drywall-screws.webp',
        'Wood Screws': 'wood-screws.webp',
        'Washers': 'washers.webp',
        'Timber Planks': 'timber-planks.webp',
        'Plywood Sheet': 'plywood-sheet.webp',
        'MDF Board': 'mdf-board.webp',
        'Gypsum Board': 'gypsum-board.webp',
        'Insulation Roll': 'insulation-roll.webp',
        'Roofing Tiles': 'roofing-tiles.webp',
        'Roofing Felt': 'roofing-felt.webp',
        'Stone Blocks': 'stone-blocks.webp',
        'Clay Bricks': 'clay-bricks.webp',
        'Concrete Nails': 'concrete-nails.webp',
        'Wood Glue': 'wood-glue.webp',
        'Spirit Level': 'spirit-level.webp'
    };

    // Find the product name that matches
    for (const [key, filename] of Object.entries(productImageMap)) {
        if (productName.toLowerCase().includes(key.toLowerCase())) {
            return `/assets/products/${filename}`;
        }
    }

    // Default fallback
    return '/assets/products/cement-bag.webp';
};

/**
 * Get logo path
 */
export const getLogoBase64 = async (): Promise<string> => {
    // In a production environment, this would load and convert the logo
    // For this implementation, we return the path
    return '/assets/logo.webp';
};