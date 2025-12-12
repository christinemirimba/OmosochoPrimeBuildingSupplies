// Category image mappings
export const categoryImages = {
    'Construction': '/assets/category-images/Construction_Materials.webp',
    'Metals': '/assets/category-images/Metals&Steel.webp',
    'Tools': '/assets/category-images/Tools&Equipment.webp',
    'Fasteners': '/assets/category-images/Fasteners&Fittings.webp',
    'Building': '/assets/category-images/Building_Hardware.webp',
    'Electrical': '/assets/category-images/Electrical_Hardware.webp',
    'Plumbing': '/assets/category-images/Plumbing_Hardware.webp',
    'Safety': '/assets/category-images/Safety_Gear.webp',
    'Finishing': '/assets/category-images/Finishing_Materials.webp',
};

// Get category image by category name
export const getCategoryImage = (category: string): string => {
    return categoryImages[category as keyof typeof categoryImages] || '/assets/category-images/Construction_Materials.png';
};

// Category data with images and descriptions
export const categoryData = [
    {
        id: 'Construction',
        name: 'Construction',
        description: 'Premium cement, blocks, sand, gravel, and building materials',
        image: categoryImages.Construction,
        productCount: 10,
    },
    {
        id: 'Metals',
        name: 'Metals & Steel',
        description: 'High-strength steel rods, pipes, wire mesh, and metal materials',
        image: categoryImages.Metals,
        productCount: 10,
    },
    {
        id: 'Tools',
        name: 'Tools & Equipment',
        description: 'Professional-grade construction tools and equipment',
        image: categoryImages.Tools,
        productCount: 10,
    },
    {
        id: 'Fasteners',
        name: 'Fasteners & Fittings',
        description: 'Screws, bolts, nails, washers, and assembly hardware',
        image: categoryImages.Fasteners,
        productCount: 10,
    },
    {
        id: 'Building',
        name: 'Building Hardware',
        description: 'Timber, plywood, bricks, tiles, and structural materials',
        image: categoryImages.Building,
        productCount: 10,
    },
    {
        id: 'Electrical',
        name: 'Electrical Hardware',
        description: 'Wiring, switches, sockets, lighting, and electrical supplies',
        image: categoryImages.Electrical,
        productCount: 10,
    },
    {
        id: 'Plumbing',
        name: 'Plumbing Hardware',
        description: 'Pipes, fittings, faucets, tanks, and plumbing fixtures',
        image: categoryImages.Plumbing,
        productCount: 10,
    },
    {
        id: 'Safety',
        name: 'Safety Gear',
        description: 'Helmets, gloves, goggles, vests, and protective equipment',
        image: categoryImages.Safety,
        productCount: 10,
    },
    {
        id: 'Finishing',
        name: 'Finishing Materials',
        description: 'Paint, tiles, varnish, wallpaper, and decorative finishes',
        image: categoryImages.Finishing,
        productCount: 10,
    },
];
