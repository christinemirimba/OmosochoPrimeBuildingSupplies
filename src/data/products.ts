// Shared product data for Products and ProductDetail pages
export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  brand?: string;
  image: string;
  inStock: boolean;
  rating: number;
  reviews?: number;
  specifications?: Record<string, string>;
  features?: string[];
}

export const products: Product[] = [
  // Construction Materials
  {
    id: '1',
    name: 'Premium Portland Cement',
    description: 'High-grade Portland cement suitable for all types of construction projects. This cement provides excellent strength and durability for both residential and commercial applications.',
    category: 'construction',
    brand: 'simba',
    image: '/src/assets/category-cement.jpg',
    inStock: true,
    rating: 4.8,
    reviews: 124,
    specifications: {
      'Weight': '50 kg',
      'Type': 'Portland Cement',
      'Grade': 'Grade 53',
      'Compressive Strength': '53 MPa',
      'Setting Time': '30 minutes initial, 600 minutes final',
    },
    features: [
      'Superior strength and durability',
      'Consistent quality and performance',
      'Suitable for all weather conditions',
      'Meets international standards',
      'Eco-friendly production process',
    ],
  },
  {
    id: '2',
    name: 'Sand & Gravel',
    description: 'Quality sand and gravel for concrete mixing. Essential for all construction projects requiring strong foundations and concrete work.',
    category: 'construction',
    brand: 'simba',
    image: '/src/assets/category-cement.jpg',
    inStock: true,
    rating: 4.7,
    reviews: 89,
    specifications: {
      'Type': 'River Sand & Crushed Gravel',
      'Grade': 'Fine to Coarse',
      'Moisture Content': 'Less than 5%',
    },
    features: [
      'Clean and well-graded',
      'Ideal for concrete mixing',
      'Available in bulk quantities',
    ],
  },
  {
    id: '3',
    name: 'Bricks & Blocks',
    description: 'Durable bricks and concrete blocks for wall construction. High-quality materials for lasting structures.',
    category: 'construction',
    image: '/src/assets/category-cement.jpg',
    inStock: true,
    rating: 4.6,
    reviews: 76,
    specifications: {
      'Size': 'Standard 6" and 8" blocks',
      'Type': 'Hollow and Solid',
      'Compressive Strength': 'Minimum 3.5 N/mm²',
    },
    features: [
      'High compressive strength',
      'Uniform size and shape',
      'Cost-effective construction',
    ],
  },
  {
    id: '4',
    name: 'Tiles',
    description: 'Floor and wall tiles for finishing. Beautiful and durable tiles for interior and exterior applications.',
    category: 'finishing',
    brand: 'twyford',
    image: '/src/assets/category-cement.jpg',
    inStock: true,
    rating: 4.5,
    reviews: 92,
    specifications: {
      'Material': 'Ceramic and Porcelain',
      'Size': 'Various (30x30cm, 60x60cm)',
      'Finish': 'Glossy and Matte options',
    },
    features: [
      'Scratch-resistant surface',
      'Easy to clean and maintain',
      'Available in various designs',
    ],
  },
  
  // Metals & Steel
  {
    id: '5',
    name: 'Reinforcing Steel Bars (Rebar)',
    description: 'High-strength steel bars for reinforced concrete. Essential for structural integrity in construction projects.',
    category: 'metals',
    brand: 'maisha',
    image: '/src/assets/category-steel.jpg',
    inStock: true,
    rating: 4.9,
    reviews: 156,
    specifications: {
      'Material': 'High Yield Steel',
      'Sizes': '8mm, 10mm, 12mm, 16mm',
      'Grade': 'Fe 500',
      'Length': '12 meters standard',
    },
    features: [
      'High tensile strength',
      'Ribbed for better bonding',
      'Corrosion-resistant coating available',
    ],
  },
  {
    id: '6',
    name: 'Steel Beams & Channels',
    description: 'Structural steel beams and channels for construction frameworks and support structures.',
    category: 'metals',
    image: '/src/assets/category-steel.jpg',
    inStock: true,
    rating: 4.8,
    reviews: 67,
    specifications: {
      'Type': 'I-Beams, H-Beams, C-Channels',
      'Material': 'Structural Steel',
      'Sizes': 'Various standard sizes',
    },
    features: [
      'High load-bearing capacity',
      'Precision manufactured',
      'Various profiles available',
    ],
  },
  {
    id: '7',
    name: 'Pipes & Tubes',
    description: 'Steel pipes and tubes for construction, plumbing, and structural applications.',
    category: 'metals',
    image: '/src/assets/category-steel.jpg',
    inStock: true,
    rating: 4.7,
    reviews: 54,
    specifications: {
      'Material': 'Galvanized Steel',
      'Sizes': '½" to 4" diameter',
      'Length': '6 meters standard',
    },
    features: [
      'Rust-resistant coating',
      'Smooth internal finish',
      'Easy to cut and install',
    ],
  },
  {
    id: '8',
    name: 'Wire Mesh',
    description: 'Welded wire mesh for reinforcement in slabs, foundations, and walls.',
    category: 'metals',
    image: '/src/assets/category-steel.jpg',
    inStock: true,
    rating: 4.6,
    reviews: 43,
    specifications: {
      'Wire Gauge': '6mm to 10mm',
      'Mesh Size': '100mm x 100mm, 150mm x 150mm',
      'Sheet Size': '2.4m x 1.2m',
    },
    features: [
      'Factory welded joints',
      'Consistent spacing',
      'Easy to handle and install',
    ],
  },
  
  // Tools & Equipment
  {
    id: '9',
    name: 'Hand Tools',
    description: 'Essential hand tools including hammers, screwdrivers, wrenches, and pliers for all construction needs.',
    category: 'tools',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.8,
    reviews: 112,
    specifications: {
      'Material': 'Chrome Vanadium Steel',
      'Handle': 'Ergonomic grip',
      'Types': 'Hammers, Screwdrivers, Wrenches, Pliers',
    },
    features: [
      'Durable construction',
      'Comfortable grip handles',
      'Professional quality',
    ],
  },
  {
    id: '10',
    name: 'Power Tools',
    description: 'Professional power tools including drills, saws, and grinders for efficient construction work.',
    category: 'tools',
    brand: 'bosch',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.9,
    reviews: 187,
    specifications: {
      'Power': '500W to 2000W',
      'Voltage': '220-240V',
      'Types': 'Drills, Saws, Grinders, Sanders',
    },
    features: [
      'High-performance motors',
      'Safety features included',
      'Warranty coverage',
    ],
  },
  {
    id: '11',
    name: 'Measuring Tools',
    description: 'Precision measuring tools including tape measures, levels, and calipers.',
    category: 'tools',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.7,
    reviews: 78,
    specifications: {
      'Types': 'Tape Measures, Spirit Levels, Calipers',
      'Accuracy': 'Professional grade',
    },
    features: [
      'High accuracy readings',
      'Durable construction',
      'Easy to read markings',
    ],
  },
  {
    id: '12',
    name: 'Cutting Tools',
    description: 'Precision cutting tools including blades, cutters, and chisels for detailed work.',
    category: 'tools',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.6,
    reviews: 56,
    specifications: {
      'Material': 'High Carbon Steel',
      'Types': 'Blades, Cutters, Chisels, Saws',
    },
    features: [
      'Sharp and durable edges',
      'Various sizes available',
      'Safe to handle',
    ],
  },
  
  // Fasteners & Fittings
  {
    id: '13',
    name: 'Nails & Screws',
    description: 'Various nails and screws for construction, woodworking, and general applications.',
    category: 'fasteners',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.5,
    reviews: 134,
    specifications: {
      'Material': 'Steel, Galvanized',
      'Sizes': 'Various lengths and gauges',
      'Types': 'Common, Finishing, Roofing, Wood Screws',
    },
    features: [
      'Corrosion-resistant options',
      'Strong holding power',
      'Bulk packaging available',
    ],
  },
  {
    id: '14',
    name: 'Bolts & Nuts',
    description: 'Heavy-duty bolts and nuts for structural connections and mechanical applications.',
    category: 'fasteners',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.7,
    reviews: 89,
    specifications: {
      'Material': 'High Tensile Steel',
      'Sizes': 'M6 to M24',
      'Grade': 'Grade 8.8 and 10.9',
    },
    features: [
      'High tensile strength',
      'Zinc plated finish',
      'Metric and Imperial sizes',
    ],
  },
  {
    id: '15',
    name: 'Anchors & Hooks',
    description: 'Wall anchors and mounting hooks for secure installations.',
    category: 'fasteners',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.6,
    reviews: 67,
    specifications: {
      'Types': 'Expansion, Toggle, Sleeve Anchors',
      'Material': 'Steel, Zinc Plated',
      'Load Capacity': 'Various ratings',
    },
    features: [
      'Secure wall mounting',
      'Easy installation',
      'Various weight capacities',
    ],
  },
  
  // Building Hardware
  {
    id: '16',
    name: 'Hinges & Locks',
    description: 'Door hinges, locks, and latches for secure and functional doors.',
    category: 'hardware',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.8,
    reviews: 98,
    specifications: {
      'Material': 'Stainless Steel, Brass',
      'Types': 'Butt Hinges, Mortise Locks, Deadbolts',
      'Finish': 'Chrome, Satin, Antique',
    },
    features: [
      'Smooth operation',
      'Security-rated locks',
      'Corrosion-resistant',
    ],
  },
  {
    id: '17',
    name: 'Handles & Knobs',
    description: 'Door handles and cabinet knobs for interior and exterior applications.',
    category: 'hardware',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.5,
    reviews: 76,
    specifications: {
      'Material': 'Stainless Steel, Aluminum, Brass',
      'Types': 'Lever, Pull, Knob',
      'Finish': 'Various finishes available',
    },
    features: [
      'Ergonomic design',
      'Easy to install',
      'Stylish options',
    ],
  },
  
  // Electrical Hardware
  {
    id: '18',
    name: 'Switches & Sockets',
    description: 'Electrical switches and power sockets for residential and commercial installations.',
    category: 'electrical',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.7,
    reviews: 112,
    specifications: {
      'Rating': '16A, 250V',
      'Type': 'Single, Double, Triple Gang',
      'Standard': 'Kenya/UK Standard',
    },
    features: [
      'Fire-resistant plastic',
      'Easy clip installation',
      'Child safety shutters',
    ],
  },
  {
    id: '19',
    name: 'Cables & Wires',
    description: 'Electrical cables and wiring for all installation requirements.',
    category: 'electrical',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.6,
    reviews: 87,
    specifications: {
      'Sizes': '1.5mm², 2.5mm², 4mm², 6mm²',
      'Type': 'Single Core, Twin & Earth',
      'Insulation': 'PVC',
    },
    features: [
      'KEBS certified',
      'Fire-resistant insulation',
      'Flexible and durable',
    ],
  },
  {
    id: '20',
    name: 'Circuit Breakers',
    description: 'Electrical circuit breakers and panels for safe power distribution.',
    category: 'electrical',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.8,
    reviews: 65,
    specifications: {
      'Rating': '6A to 63A',
      'Type': 'MCB, MCCB, RCD',
      'Breaking Capacity': '6kA to 10kA',
    },
    features: [
      'Overload protection',
      'Easy trip indication',
      'DIN rail mounting',
    ],
  },
  
  // Plumbing Hardware
  {
    id: '21',
    name: 'Plumbing Pipes & Fittings',
    description: 'Water pipes and plumbing fittings for complete plumbing systems.',
    category: 'plumbing',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.7,
    reviews: 94,
    specifications: {
      'Material': 'PPR, PVC, HDPE',
      'Sizes': '½" to 4"',
      'Pressure Rating': 'PN10, PN16, PN20',
    },
    features: [
      'Lead-free materials',
      'Easy to install',
      'Long service life',
    ],
  },
  {
    id: '22',
    name: 'Taps & Faucets',
    description: 'Kitchen and bathroom taps in various styles and finishes.',
    category: 'plumbing',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.6,
    reviews: 78,
    specifications: {
      'Material': 'Brass, Chrome Plated',
      'Type': 'Mixer, Pillar, Wall-mounted',
      'Finish': 'Chrome, Brushed Nickel',
    },
    features: [
      'Ceramic disc cartridge',
      'Water-saving design',
      'Easy maintenance',
    ],
  },
  {
    id: '23',
    name: 'Water Tanks',
    description: 'Plastic and steel water storage tanks for residential and commercial use.',
    category: 'plumbing',
    image: '/src/assets/category-tools.jpg',
    inStock: true,
    rating: 4.8,
    reviews: 56,
    specifications: {
      'Material': 'Food-grade Plastic, Stainless Steel',
      'Capacity': '500L to 10,000L',
      'UV Protection': 'Yes',
    },
    features: [
      'UV stabilized',
      'Food-grade safe',
      'Easy to clean',
    ],
  },
  
  // Safety Gear
  {
    id: '24',
    name: 'Safety Helmets',
    description: 'Hard hats and protective helmets for construction site safety.',
    category: 'safety',
    image: '/src/assets/category-safety.jpg',
    inStock: true,
    rating: 4.9,
    reviews: 145,
    specifications: {
      'Material': 'HDPE Shell',
      'Standard': 'EN 397 Certified',
      'Suspension': 'Adjustable 6-point',
    },
    features: [
      'Impact-resistant shell',
      'Comfortable fit',
      'Ventilation slots',
    ],
  },
  {
    id: '25',
    name: 'Safety Gloves & Boots',
    description: 'Protective gloves and safety boots for construction workers.',
    category: 'safety',
    image: '/src/assets/category-safety.jpg',
    inStock: true,
    rating: 4.8,
    reviews: 123,
    specifications: {
      'Gloves': 'Cut-resistant, Chemical-resistant',
      'Boots': 'Steel toe, Slip-resistant sole',
      'Sizes': 'Various sizes available',
    },
    features: [
      'Comfortable for all-day wear',
      'Meets safety standards',
      'Durable construction',
    ],
  },
  {
    id: '26',
    name: 'Goggles & Face Shields',
    description: 'Eye protection and face shields for safe working conditions.',
    category: 'safety',
    image: '/src/assets/category-safety.jpg',
    inStock: true,
    rating: 4.7,
    reviews: 87,
    specifications: {
      'Type': 'Safety Goggles, Full Face Shield',
      'Lens': 'Anti-fog, Anti-scratch',
      'Standard': 'EN 166 Certified',
    },
    features: [
      'Clear vision',
      'Anti-fog coating',
      'Comfortable fit',
    ],
  },
  {
    id: '27',
    name: 'Reflective Jackets',
    description: 'High-visibility safety jackets for construction sites and road work.',
    category: 'safety',
    image: '/src/assets/category-safety.jpg',
    inStock: true,
    rating: 4.6,
    reviews: 65,
    specifications: {
      'Class': 'Class 2 & Class 3',
      'Material': 'Polyester with reflective tape',
      'Colors': 'Orange, Yellow, Green',
    },
    features: [
      '360° visibility',
      'Breathable fabric',
      'Multiple pockets',
    ],
  },
  
  // Finishing Materials
  {
    id: '28',
    name: 'Paints & Primers',
    description: 'Interior and exterior paints and primers for beautiful finishes.',
    category: 'finishing',
    brand: 'crown',
    image: '/src/assets/category-cement.jpg',
    inStock: true,
    rating: 4.7,
    reviews: 156,
    specifications: {
      'Type': 'Emulsion, Gloss, Primer',
      'Finish': 'Matt, Silk, Gloss',
      'Coverage': '10-12 m²/litre',
    },
    features: [
      'Excellent coverage',
      'Fade-resistant colors',
      'Easy to apply',
    ],
  },
  {
    id: '29',
    name: 'Varnishes & Sealants',
    description: 'Wood varnishes and waterproof sealants for protection and finishing.',
    category: 'finishing',
    image: '/src/assets/category-cement.jpg',
    inStock: true,
    rating: 4.5,
    reviews: 67,
    specifications: {
      'Type': 'Polyurethane, Acrylic, Silicone',
      'Finish': 'Clear, Tinted',
      'Application': 'Brush, Spray',
    },
    features: [
      'UV protection',
      'Weather-resistant',
      'Long-lasting finish',
    ],
  },
  {
    id: '30',
    name: 'Adhesives & Grout',
    description: 'Construction adhesives and tile grout for secure installations.',
    category: 'finishing',
    image: '/src/assets/category-cement.jpg',
    inStock: true,
    rating: 4.6,
    reviews: 89,
    specifications: {
      'Type': 'Tile Adhesive, Construction Adhesive, Grout',
      'Setting Time': 'Various options',
      'Application': 'Interior and Exterior',
    },
    features: [
      'Strong bonding',
      'Water-resistant options',
      'Easy mixing',
    ],
  },
];

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'construction', name: '🧱 Construction Materials' },
  { id: 'metals', name: '🔩 Metals & Steel' },
  { id: 'tools', name: '🛠️ Tools & Equipment' },
  { id: 'fasteners', name: '🧰 Fasteners & Fittings' },
  { id: 'hardware', name: '🚪 Building Hardware' },
  { id: 'electrical', name: '⚡ Electrical Hardware' },
  { id: 'plumbing', name: '💧 Plumbing Hardware' },
  { id: 'safety', name: '🦺 Safety Gear' },
  { id: 'finishing', name: '🎨 Finishing Materials' },
];

export const brands = [
  { id: 'all', name: 'All Brands' },
  { id: 'crown', name: 'Crown Paints' },
  { id: 'simba', name: 'Simba Cement' },
  { id: 'maisha', name: 'Maisha Mabati' },
  { id: 'twyford', name: 'Twyford Tiles' },
  { id: 'bosch', name: 'Bosch' },
];

export const quickSearches = [
  { id: 'cement', label: 'Cement' },
  { id: 'paint', label: 'Paint' },
  { id: 'hammer', label: 'Hammer' },
  { id: 'nails', label: 'Nails' },
  { id: 'tiles', label: 'Tiles' },
  { id: 'power tools', label: 'Power Tools' },
];

// Helper function to get product by ID
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
