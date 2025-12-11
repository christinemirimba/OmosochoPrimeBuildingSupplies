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
        'Cement Bag': 'cement-bag.jpg',
        'Concrete Blocks': 'concrete-blocks.jpg',
        'Sand': 'sand.jpg',
        'Gravel': 'gravel.jpg',
        'Reinforcement Bars': 'reinforcement-bars-12mm.jpg',
        'Wheelbarrow': 'wheelbarrow.jpg',
        'Shovel': 'shovel.jpg',
        'Pickaxe': 'pickaxe.jpg',
        'Concrete Mixer': 'concrete-mixer.jpg',
        'Ladder': 'ladder-6ft.jpg',
        'Steel Rods': 'steel-rods-16mm.jpg',
        'Galvanized Pipes': 'galvanized-pipes.jpg',
        'Wire Mesh': 'wire-mesh.jpg',
        'Aluminum Sheets': 'aluminum-sheets.jpg',
        'Nails': 'nails-1kg.jpg',
        'Steel Plates': 'steel-plates.jpg',
        'Binding Wire': 'binding-wire.jpg',
        'Steel Beams': 'steel-beams.jpg',
        'Corrugated Iron Sheets': 'corrugated-iron-sheets.jpg',
        'Metal Pipes': 'metal-pipes.jpg',
        'Hammer': 'hammer.jpg',
        'Screwdriver Set': 'screwdriver-set.jpg',
        'Adjustable Wrench': 'adjustable-wrench.jpg',
        'Electric Drill': 'electric-drill.jpg',
        'Tape Measure': 'tape-measure.jpg',
        'Pliers': 'pliers.jpg',
        'Toolbox': 'toolbox.jpg',
        'Work Light': 'work-light.jpg',
        'Impact Wrench': 'impact-wrench.jpg',
        'Drill Set': 'drill-set.jpg',
        'Socket Set': 'socket-set.jpg',
        'Screwdriver Kit': 'screwdriver-kit.jpg',
        'Safety Helmet': 'safety-helmet.jpg',
        'Safety Gloves': 'safety-gloves.jpg',
        'Safety Goggles': 'safety-goggles.jpg',
        'Reflective Vest': 'reflective-vest.jpg',
        'Ear Protection': 'ear-protection.jpg',
        'Work Boots': 'work-boots.jpg',
        'Dust Mask': 'dust-mask.jpg',
        'Harness': 'harness.jpg',
        'First Aid Kit': 'first-aid-kit.jpg',
        'Fire Extinguisher': 'fire-extinguisher.jpg',
        'Wall Paint': 'wall-paint-5l.jpg',
        'Wall Tiles': 'wall-tiles.jpg',
        'Floor Tiles': 'floor-tiles.jpg',
        'Wood Varnish': 'wood-varnish.jpg',
        'Plaster': 'plaster.jpg',
        'Grout': 'grout-5kg.jpg',
        'Wood Polish': 'wood-polish.jpg',
        'Wallpaper Roll': 'wallpaper-roll.jpg',
        'Curtain Rods': 'curtain-rods.jpg',
        'Ceiling Board': 'ceiling-board.jpg',
        'Ceiling Light': 'ceiling-light.jpg',
        'Light Switch': 'light-switch.jpg',
        'Wall Socket': 'wall-socket.jpg',
        'Extension Cord': 'extension-cord.jpg',
        'Electrical Tape': 'electrical-tape.jpg',
        'Electrical Wires': 'electrical-wires.jpg',
        'Circuit Breaker': 'circuit-breaker.jpg',
        'LED Bulb': 'led-bulb.jpg',
        'Electric Fan': 'electric-fan.jpg',
        'Solar Panel': 'solar-panel.jpg',
        'Water Heater': 'water-heater.jpg',
        'Water Tank': 'water-tank-1000l.jpg',
        'Faucet': 'faucet.jpg',
        'Sink': 'sink.jpg',
        'Shower Head': 'shower-head.jpg',
        'Toilet Bowl': 'toilet-bowl.jpg',
        'Drain Pipe': 'drain-pipe.jpg',
        'PVC Pipe': 'pvc-pipe-3m.jpg',
        'Pipe Fittings Set': 'pipe-fittings-set.jpg',
        'Plunger': 'plunger.jpg',
        'Anchor Bolts': 'anchor-bolts.jpg',
        'Hex Bolts': 'hex-bolts.jpg',
        'Nuts & Bolts Set': 'nuts-bolts-set.jpg',
        'Toggle Bolts': 'toggle-bolts.jpg',
        'Self-Tapping Screws': 'self-tapping-screws.jpg',
        'Drywall Screws': 'drywall-screws.jpg',
        'Wood Screws': 'wood-screws.jpg',
        'Washers': 'washers.jpg',
        'Timber Planks': 'timber-planks.jpg',
        'Plywood Sheet': 'plywood-sheet.jpg',
        'MDF Board': 'mdf-board.jpg',
        'Gypsum Board': 'gypsum-board.jpg',
        'Insulation Roll': 'insulation-roll.jpg',
        'Roofing Tiles': 'roofing-tiles.jpg',
        'Roofing Felt': 'roofing-felt.jpg',
        'Stone Blocks': 'stone-blocks.jpg',
        'Clay Bricks': 'clay-bricks.jpg',
        'Concrete Nails': 'concrete-nails.jpg',
        'Wood Glue': 'wood-glue.jpg',
        'Spirit Level': 'spirit-level.jpg'
    };

    // Find the product name that matches
    for (const [key, filename] of Object.entries(productImageMap)) {
        if (productName.toLowerCase().includes(key.toLowerCase())) {
            return `/assets/products/${filename}`;
        }
    }

    // Default fallback
    return '/assets/products/cement-bag.jpg';
};

/**
 * Get logo path
 */
export const getLogoBase64 = async (): Promise<string> => {
    // In a production environment, this would load and convert the logo
    // For this implementation, we return the path
    return '/assets/logo.png';
};