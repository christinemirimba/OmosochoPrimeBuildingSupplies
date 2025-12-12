export interface Product {
    id: number;
    name: string;
    category: string;
    brand: string;
    description: string;
    image: string;
    inStock?: boolean;
    rating?: number;
    reviews?: number;
    specifications?: Record<string, string>;
    features?: string[];
}

export const products: Product[] = [
    // =========================
    // Construction (10)
    // =========================
    {
        id: 1,
        name: "Cement Bag (50kg)",
        category: "Construction",
        brand: "Simba Cement",
        description: "Premium 32.5R grade cement from Simba Cement, perfect for all construction needs in Kenya. Excellent for concrete work, plastering, and masonry with consistent quality.",
        image: "/assets/products/cement-bag.webp",
        inStock: true,
        rating: 4.8,
        reviews: 156
    },
    {
        id: 2,
        name: "Concrete Blocks",
        category: "Construction",
        brand: "Bamburi",
        description: "High-quality concrete blocks manufactured by Bamburi Cement. Durable, load-bearing blocks ideal for walls, foundations, and structural elements in Kenyan construction projects.",
        image: "/assets/products/concrete-blocks.webp",
        inStock: true,
        rating: 4.7,
        reviews: 98
    },
    {
        id: 3,
        name: "Sand (Ton)",
        category: "Construction",
        brand: "Natural River",
        description: "Clean, washed river sand sourced from Kenyan rivers. Perfect for concrete mixing and plastering work, free from impurities and contaminants.",
        image: "/assets/products/sand.webp",
        inStock: true,
        rating: 4.6,
        reviews: 203
    },
    {
        id: 4,
        name: "Gravel (Ton)",
        category: "Construction",
        brand: "Bamburi",
        description: "Quality crushed stone gravel from Bamburi Quarries. Ideal for concrete aggregate, drainage systems, and landscaping projects across Kenya.",
        image: "/assets/products/gravel.webp",
        inStock: true,
        rating: 4.7,
        reviews: 145
    },
    {
        id: 5,
        name: "Reinforcement Bars (12mm)",
        category: "Construction",
        brand: "Apex Steel",
        description: "High-strength TMT reinforcement bars manufactured in Kenya. Perfect for concrete structures with excellent bonding properties and earthquake resistance.",
        image: "/assets/products/reinforcement-bars-12mm.webp",
        inStock: true,
        rating: 4.9,
        reviews: 267
    },
    {
        id: 6,
        name: "Wheelbarrow",
        category: "Construction",
        brand: "Truper",
        description: "Heavy-duty wheelbarrow designed for Kenyan construction sites. Features sturdy steel construction and pneumatic wheels for easy material transport.",
        image: "/assets/products/wheelbarrow.webp",
        inStock: true,
        rating: 4.5,
        reviews: 89
    },
    {
        id: 7,
        name: "Shovel",
        category: "Construction",
        brand: "Stanley",
        description: "Professional-grade shovel with fiberglass handle. Perfect for digging, moving soil, and construction work on Kenyan building sites.",
        image: "/assets/products/shovel.webp",
        inStock: true,
        rating: 4.6,
        reviews: 134
    },
    {
        id: 8,
        name: "Pickaxe",
        category: "Construction",
        brand: "Rohi",
        description: "Durable pickaxe designed for tough Kenyan soil conditions. Ideal for breaking hard ground, rocks, and concrete in construction projects.",
        image: "/assets/products/pickaxe.webp",
        inStock: true,
        rating: 4.7,
        reviews: 76
    },
    {
        id: 9,
        name: "Concrete Mixer",
        category: "Construction",
        brand: "Honda",
        description: "Portable concrete mixer with Honda engine. Perfect for small to medium construction projects across Kenya, ensuring consistent concrete mixing.",
        image: "/assets/products/concrete-mixer.webp",
        inStock: true,
        rating: 4.8,
        reviews: 45
    },
    {
        id: 10,
        name: "Ladder (6ft)",
        category: "Construction",
        brand: "Zucchini",
        description: "Aluminum folding ladder made for Kenyan construction and maintenance work. Lightweight yet sturdy, perfect for various height requirements.",
        image: "/assets/products/ladder-6ft.webp",
        inStock: true,
        rating: 4.5,
        reviews: 92
    },

    // =========================
    // Metals (10)
    // =========================
    {
        id: 11,
        name: "Steel Rods (16mm)",
        category: "Metals",
        brand: "Devki Steel",
        description: "High-quality steel reinforcement rods from Devki Steel Mills. Manufactured in Kenya to meet local construction standards and requirements.",
        image: "/assets/products/steel-rods-16mm.webp",
        inStock: true,
        rating: 4.9,
        reviews: 312
    },
    {
        id: 12,
        name: "Galvanized Pipes",
        category: "Metals",
        brand: "Diamond",
        description: "Galvanized steel pipes resistant to rust and corrosion. Ideal for water supply and construction applications in Kenya's varied climate.",
        image: "/assets/products/galvanized-pipes.webp",
        inStock: true,
        rating: 4.7,
        reviews: 178
    },
    {
        id: 13,
        name: "Wire Mesh",
        category: "Metals",
        brand: "Apex",
        description: "Steel wire mesh for construction reinforcement and fencing. Made from high-tensile steel wire, perfect for Kenyan building standards.",
        image: "/assets/products/wire-mesh.webp",
        inStock: true,
        rating: 4.6,
        reviews: 145
    },
    {
        id: 14,
        name: "Aluminum Sheets",
        category: "Metals",
        brand: "Maisha Rolling Mabati",
        description: "Quality aluminum sheets from Maisha Rolling Mabati. Lightweight, corrosion-resistant, perfect for roofing and cladding in Kenyan buildings.",
        image: "/assets/products/aluminum-sheets.webp",
        inStock: true,
        rating: 4.8,
        reviews: 201
    },
    {
        id: 15,
        name: "Nails (1kg)",
        category: "Metals",
        brand: "Mabati",
        description: "Assorted steel nails pack. Galvanized for rust resistance, suitable for various construction and woodworking projects in Kenya.",
        image: "/assets/products/nails-1kg.webp",
        inStock: true,
        rating: 4.5,
        reviews: 289
    },
    {
        id: 16,
        name: "Steel Plates",
        category: "Metals",
        brand: "Devki",
        description: "Structural steel plates from Devki Steel. Available in various thicknesses for construction, manufacturing, and industrial applications in Kenya.",
        image: "/assets/products/steel-plates.webp",
        inStock: true,
        rating: 4.8,
        reviews: 156
    },
    {
        id: 17,
        name: "Binding Wire",
        category: "Metals",
        brand: "Apex",
        description: "Steel binding wire for tying reinforcement bars in concrete construction. Essential for Kenyan building projects and structural work.",
        image: "/assets/products/binding-wire.webp",
        inStock: true,
        rating: 4.6,
        reviews: 234
    },
    {
        id: 18,
        name: "Steel Beams",
        category: "Metals",
        brand: "Devki Steel",
        description: "Structural steel beams for building frameworks and support structures. Manufactured to Kenyan construction standards for safety and durability.",
        image: "/assets/products/steel-beams.webp",
        inStock: true,
        rating: 4.9,
        reviews: 187
    },
    {
        id: 19,
        name: "Corrugated Iron Sheets",
        category: "Metals",
        brand: "Maisha Rolling Mabati",
        description: "Quality corrugated iron sheets from Maisha Rolling Mabati. Pre-painted and galvanized for long-lasting roofing solutions in Kenya.",
        image: "/assets/products/corrugated-iron-sheets.webp",
        inStock: true,
        rating: 4.8,
        reviews: 298
    },
    {
        id: 20,
        name: "Metal Pipes",
        category: "Metals",
        brand: "Diamond",
        description: "Various diameter metal pipes for construction and plumbing. Durable and reliable for Kenyan infrastructure and building projects.",
        image: "/assets/products/metal-pipes.webp",
        inStock: true,
        rating: 4.7,
        reviews: 165
    },

    // =========================
    // Tools (10)
    // =========================
    {
        id: 21,
        name: "Hammer",
        category: "Tools",
        brand: "Stanley",
        description: "Professional claw hammer with fiberglass handle. Essential tool for Kenyan construction sites and DIY projects with shock absorption.",
        image: "/assets/products/hammer.webp",
        inStock: true,
        rating: 4.7,
        reviews: 342
    },
    {
        id: 22,
        name: "Screwdriver Set",
        category: "Tools",
        brand: "Truper",
        description: "Complete screwdriver set with various tips. Perfect for electrical work, furniture assembly, and maintenance tasks in Kenyan homes and sites.",
        image: "/assets/products/screwdriver-set.webp",
        inStock: true,
        rating: 4.6,
        reviews: 267
    },
    {
        id: 23,
        name: "Adjustable Wrench",
        category: "Tools",
        brand: "Stanley",
        description: "Adjustable wrench for plumbing and mechanical work. Versatile tool suitable for various bolt sizes in Kenyan construction and repair.",
        image: "/assets/products/adjustable-wrench.webp",
        inStock: true,
        rating: 4.7,
        reviews: 198
    },
    {
        id: 24,
        name: "Electric Drill",
        category: "Tools",
        brand: "Bosch",
        description: "Corded electric drill with variable speed. Powerful tool for drilling in wood, metal, and concrete on Kenyan construction sites.",
        image: "/assets/products/electric-drill.webp",
        inStock: true,
        rating: 4.9,
        reviews: 423
    },
    {
        id: 25,
        name: "Tape Measure",
        category: "Tools",
        brand: "Stanley",
        description: "25-foot tape measure with durable case. Essential for accurate measurements in Kenyan construction and carpentry projects.",
        image: "/assets/products/tape-measure.webp",
        inStock: true,
        rating: 4.5,
        reviews: 289
    },
    {
        id: 26,
        name: "Spirit Level",
        category: "Tools",
        brand: "Truper",
        description: "Professional spirit level for precise leveling. Crucial for ensuring straight installations in Kenyan building and renovation projects.",
        image: "/assets/products/spirit-level.webp",
        inStock: true,
        rating: 4.6,
        reviews: 176
    },
    {
        id: 27,
        name: "Hand Saw",
        category: "Tools",
        brand: "Stanley",
        description: "Traditional hand saw for wood cutting. Reliable tool for carpentry and construction work across Kenya.",
        image: "/assets/products/hand-saw.webp",
        inStock: true,
        rating: 4.5,
        reviews: 145
    },
    {
        id: 28,
        name: "Pliers",
        category: "Tools",
        brand: "Truper",
        description: "Combination pliers for gripping and cutting. Versatile tool for electrical work and general repairs in Kenyan households and sites.",
        image: "/assets/products/pliers.webp",
        inStock: true,
        rating: 4.6,
        reviews: 234
    },
    {
        id: 29,
        name: "Toolbox",
        category: "Tools",
        brand: "Stanley",
        description: "Durable toolbox for organizing tools. Perfect for Kenyan technicians and construction workers to keep tools secure and accessible.",
        image: "/assets/products/toolbox.webp",
        inStock: true,
        rating: 4.7,
        reviews: 198
    },
    {
        id: 30,
        name: "Angle Grinder",
        category: "Tools",
        brand: "Bosch",
        description: "Powerful angle grinder for cutting and grinding. Essential for metalwork and construction tasks on Kenyan job sites.",
        image: "/assets/products/angle-grinder.webp",
        inStock: true,
        rating: 4.8,
        reviews: 312
    },

    // =========================
    // Fasteners (10)
    // =========================
    {
        id: 31,
        name: "Wood Screws (100pcs)",
        category: "Fasteners",
        brand: "Truper",
        description: "Assorted wood screws for carpentry and furniture. Various sizes suitable for Kenyan woodworking and construction projects.",
        image: "/assets/products/wood-screws.webp",
        inStock: true,
        rating: 4.5,
        reviews: 267
    },
    {
        id: 32,
        name: "Nuts & Bolts Set",
        category: "Fasteners",
        brand: "Truper",
        description: "Complete set of nuts and bolts for assembly. Essential for mechanical and construction applications in Kenya.",
        image: "/assets/products/nuts-bolts-set.webp",
        inStock: true,
        rating: 4.6,
        reviews: 189
    },
    {
        id: 33,
        name: "Washers (100pcs)",
        category: "Fasteners",
        brand: "Truper",
        description: "Steel washers for bolt assemblies. Prevents loosening and distributes load in Kenyan construction and mechanical applications.",
        image: "/assets/products/washers.webp",
        inStock: true,
        rating: 4.5,
        reviews: 156
    },
    {
        id: 34,
        name: "Hex Bolts (50pcs)",
        category: "Fasteners",
        brand: "Truper",
        description: "Hex head bolts for structural connections. High-strength bolts suitable for Kenyan building and machinery applications.",
        image: "/assets/products/hex-bolts.webp",
        inStock: true,
        rating: 4.7,
        reviews: 201
    },
    {
        id: 35,
        name: "Concrete Nails (1kg)",
        category: "Fasteners",
        brand: "Mabati",
        description: "Hardened concrete nails for masonry work. Designed to penetrate concrete and brick in Kenyan construction projects.",
        image: "/assets/products/concrete-nails.webp",
        inStock: true,
        rating: 4.6,
        reviews: 178
    },
    {
        id: 36,
        name: "Anchor Bolts",
        category: "Fasteners",
        brand: "Truper",
        description: "Heavy-duty anchor bolts for concrete. Essential for securing structures to concrete foundations in Kenyan buildings.",
        image: "/assets/products/anchor-bolts.webp",
        inStock: true,
        rating: 4.8,
        reviews: 145
    },
    {
        id: 37,
        name: "Toggle Bolts",
        category: "Fasteners",
        brand: "Truper",
        description: "Toggle bolts for hollow wall mounting. Perfect for installing fixtures on drywall and hollow surfaces in Kenyan homes.",
        image: "/assets/products/toggle-bolts.webp",
        inStock: true,
        rating: 4.6,
        reviews: 123
    },
    {
        id: 38,
        name: "Wood Glue",
        category: "Fasteners",
        brand: "Ponal",
        description: "Strong wood adhesive for carpentry projects. Water-resistant glue suitable for Kenyan climate conditions and woodworking.",
        image: "/assets/products/wood-glue.webp",
        inStock: true,
        rating: 4.7,
        reviews: 234
    },
    {
        id: 39,
        name: "Drywall Screws",
        category: "Fasteners",
        brand: "Truper",
        description: "Specialized screws for drywall installation. Fine threads designed for securing drywall in Kenyan interior construction.",
        image: "/assets/products/drywall-screws.webp",
        inStock: true,
        rating: 4.5,
        reviews: 167
    },
    {
        id: 40,
        name: "Self-tapping Screws",
        category: "Fasteners",
        brand: "Truper",
        description: "Self-tapping screws for metal and wood. Creates own threads, perfect for various assembly tasks in Kenyan projects.",
        image: "/assets/products/self-tapping-screws.webp",
        inStock: true,
        rating: 4.6,
        reviews: 198
    },

    // =========================
    // Building (10)
    // =========================
    {
        id: 41,
        name: "Timber Planks",
        category: "Building",
        brand: "Local Kenyan",
        description: "Quality timber planks from sustainable Kenyan forests. Perfect for construction, formwork, and carpentry projects.",
        image: "/assets/products/timber-planks.webp",
        inStock: true,
        rating: 4.7,
        reviews: 289
    },
    {
        id: 42,
        name: "Plywood Sheet",
        category: "Building",
        brand: "Timberland",
        description: "Structural plywood sheets for construction and furniture. Made from quality wood veneers, suitable for Kenyan building standards.",
        image: "/assets/products/plywood-sheet.webp",
        inStock: true,
        rating: 4.8,
        reviews: 234
    },
    {
        id: 43,
        name: "MDF Board",
        category: "Building",
        brand: "Timberland",
        description: "Medium Density Fiberboard for interior applications. Smooth surface perfect for painting and furniture in Kenyan homes.",
        image: "/assets/products/mdf-board.webp",
        inStock: true,
        rating: 4.6,
        reviews: 176
    },
    {
        id: 44,
        name: "Roofing Tiles",
        category: "Building",
        brand: "Maisha Rolling Mabati",
        description: "Decorative and durable roofing tiles from Maisha. Available in various colors and styles to suit Kenyan architectural preferences.",
        image: "/assets/products/roofing-tiles.webp",
        inStock: true,
        rating: 4.8,
        reviews: 312
    },
    {
        id: 45,
        name: "Gypsum Board",
        category: "Building",
        brand: "Gyproc",
        description: "Gypsum boards for interior walls and ceilings. Fire-resistant and easy to install, perfect for modern Kenyan construction.",
        image: "/assets/products/gypsum-board.webp",
        inStock: true,
        rating: 4.7,
        reviews: 267
    },
    {
        id: 46,
        name: "Clay Bricks",
        category: "Building",
        brand: "Bamburi",
        description: "Traditional clay bricks from Bamburi. Durable and thermally efficient, ideal for Kenyan residential and commercial buildings.",
        image: "/assets/products/clay-bricks.webp",
        inStock: true,
        rating: 4.9,
        reviews: 398
    },
    {
        id: 47,
        name: "Stone Blocks",
        category: "Building",
        brand: "Local Quarry",
        description: "Natural stone blocks from Kenyan quarries. Perfect for foundations, walls, and decorative elements in construction.",
        image: "/assets/products/stone-blocks.webp",
        inStock: true,
        rating: 4.7,
        reviews: 189
    },
    {
        id: 48,
        name: "Paint Bucket (20L)",
        category: "Building",
        brand: "Crown Paints",
        description: "Premium paint from Crown Paints Kenya. Weather-resistant and durable, available in various colors for Kenyan homes and buildings.",
        image: "/assets/products/paint-bucket-20l.webp",
        inStock: true,
        rating: 4.8,
        reviews: 456
    },
    {
        id: 49,
        name: "Roofing Felt",
        category: "Building",
        brand: "Dalsan",
        description: "Waterproof roofing felt for moisture protection. Essential underlayment for Kenyan roofs to prevent leaks and water damage.",
        image: "/assets/products/roofing-felt.webp",
        inStock: true,
        rating: 4.6,
        reviews: 178
    },
    {
        id: 50,
        name: "Insulation Roll",
        category: "Building",
        brand: "Knauf",
        description: "Thermal insulation rolls for energy efficiency. Helps maintain comfortable temperatures in Kenyan buildings throughout the year.",
        image: "/assets/products/insulation-roll.webp",
        inStock: true,
        rating: 4.7,
        reviews: 145
    },

    // =========================
    // Electrical (10)
    // =========================
    {
        id: 51,
        name: "LED Bulb",
        category: "Electrical",
        brand: "Philips",
        description: "Energy-efficient LED bulbs for Kenyan homes and offices. Long-lasting and cost-effective lighting solution with various color temperatures.",
        image: "/assets/products/led-bulb.webp",
        inStock: true,
        rating: 4.8,
        reviews: 534
    },
    {
        id: 52,
        name: "Extension Cord",
        category: "Electrical",
        brand: "Meco",
        description: "Heavy-duty extension cord with surge protection. Safe and reliable power extension for Kenyan households and construction sites.",
        image: "/assets/products/extension-cord.webp",
        inStock: true,
        rating: 4.6,
        reviews: 289
    },
    {
        id: 53,
        name: "Electrical Tape",
        category: "Electrical",
        brand: "3M",
        description: "Vinyl electrical tape for insulation and protection. Essential for electrical work and repairs in Kenyan installations.",
        image: "/assets/products/electrical-tape.webp",
        inStock: true,
        rating: 4.5,
        reviews: 412
    },
    {
        id: 54,
        name: "Circuit Breaker",
        category: "Electrical",
        brand: "Schneider Electric",
        description: "Safety circuit breaker for electrical panels. Protects Kenyan homes and buildings from electrical overloads and short circuits.",
        image: "/assets/products/circuit-breaker.webp",
        inStock: true,
        rating: 4.9,
        reviews: 267
    },
    {
        id: 55,
        name: "Wall Socket",
        category: "Electrical",
        brand: "MK",
        description: "UK standard wall sockets for Kenyan electrical systems. Durable and safe power outlets for homes and offices.",
        image: "/assets/products/wall-socket.webp",
        inStock: true,
        rating: 4.7,
        reviews: 345
    },
    {
        id: 56,
        name: "Light Switch",
        category: "Electrical",
        brand: "MK",
        description: "Single-pole light switches for Kenyan lighting circuits. Reliable and easy to install for residential and commercial use.",
        image: "/assets/products/light-switch.webp",
        inStock: true,
        rating: 4.6,
        reviews: 298
    },
    {
        id: 57,
        name: "Electrical Wires",
        category: "Electrical",
        brand: "Diamond",
        description: "Copper electrical wires for building installations. Various gauges available to meet Kenyan electrical standards and requirements.",
        image: "/assets/products/electrical-wires.webp",
        inStock: true,
        rating: 4.8,
        reviews: 423
    },
    {
        id: 58,
        name: "Ceiling Light",
        category: "Electrical",
        brand: "Philips",
        description: "Modern ceiling light fixtures for Kenyan interiors. Energy-efficient lighting solutions for homes and commercial spaces.",
        image: "/assets/products/ceiling-light.webp",
        inStock: true,
        rating: 4.7,
        reviews: 234
    },
    {
        id: 59,
        name: "Electric Fan",
        category: "Electrical",
        brand: "Maspion",
        description: "Ceiling and standing fans for Kenyan climate. Provides cooling comfort during warm weather in homes and offices.",
        image: "/assets/products/electric-fan.webp",
        inStock: true,
        rating: 4.6,
        reviews: 378
    },
    {
        id: 60,
        name: "Solar Panel",
        category: "Electrical",
        brand: "M-KOPA",
        description: "Solar panels for renewable energy in Kenya. Perfect for off-grid power solutions and reducing electricity costs.",
        image: "/assets/products/solar-panel.webp",
        inStock: true,
        rating: 4.9,
        reviews: 189
    },

    // =========================
    // Plumbing (10)
    // =========================
    {
        id: 61,
        name: "PVC Pipe (3m)",
        category: "Plumbing",
        brand: "Dalsan",
        description: "PVC pipes for water supply and drainage systems. Durable and corrosion-resistant, perfect for Kenyan plumbing installations.",
        image: "/assets/products/pvc-pipe-3m.webp",
        inStock: true,
        rating: 4.7,
        reviews: 456
    },
    {
        id: 62,
        name: "Pipe Fittings Set",
        category: "Plumbing",
        brand: "Dalsan",
        description: "Complete set of PVC pipe fittings for plumbing systems. Includes elbows, tees, and couplings for Kenyan water installations.",
        image: "/assets/products/pipe-fittings-set.webp",
        inStock: true,
        rating: 4.6,
        reviews: 289
    },
    {
        id: 63,
        name: "Shower Head",
        category: "Plumbing",
        brand: "Twyford",
        description: "Modern shower head from Twyford Kenya. Water-efficient design with adjustable spray patterns for Kenyan bathrooms.",
        image: "/assets/products/shower-head.webp",
        inStock: true,
        rating: 4.7,
        reviews: 312
    },
    {
        id: 64,
        name: "Water Tank (1000L)",
        category: "Plumbing",
        brand: "Twyford",
        description: "Plastic water storage tank from Twyford. Food-grade material, perfect for rainwater harvesting and water storage in Kenya.",
        image: "/assets/products/water-tank-1000l.webp",
        inStock: true,
        rating: 4.8,
        reviews: 234
    },
    {
        id: 65,
        name: "Faucet",
        category: "Plumbing",
        brand: "Twyford",
        description: "Quality bathroom and kitchen faucets from Twyford. Durable ceramic cartridges and elegant designs for Kenyan homes.",
        image: "/assets/products/faucet.webp",
        inStock: true,
        rating: 4.7,
        reviews: 398
    },
    {
        id: 66,
        name: "Sink",
        category: "Plumbing",
        brand: "Twyford",
        description: "Stainless steel and ceramic sinks from Twyford Kenya. Various sizes and styles to suit Kenyan kitchen and bathroom requirements.",
        image: "/assets/products/sink.webp",
        inStock: true,
        rating: 4.8,
        reviews: 267
    },
    {
        id: 67,
        name: "Toilet Bowl",
        category: "Plumbing",
        brand: "Twyford",
        description: "Water-efficient toilet bowls from Twyford. Modern designs with dual-flush systems suitable for Kenyan bathrooms.",
        image: "/assets/products/toilet-bowl.webp",
        inStock: true,
        rating: 4.9,
        reviews: 345
    },
    {
        id: 68,
        name: "Water Heater",
        category: "Plumbing",
        brand: "Ariston",
        description: "Electric water heater for Kenyan households. Energy-efficient design providing reliable hot water for showers and washing.",
        image: "/assets/products/water-heater.webp",
        inStock: true,
        rating: 4.7,
        reviews: 198
    },
    {
        id: 69,
        name: "Drain Pipe",
        category: "Plumbing",
        brand: "Dalsan",
        description: "PVC drain pipes for wastewater systems. Smooth interior for efficient drainage in Kenyan buildings and infrastructure.",
        image: "/assets/products/drain-pipe.webp",
        inStock: true,
        rating: 4.6,
        reviews: 234
    },
    {
        id: 70,
        name: "Plunger",
        category: "Plumbing",
        brand: "Simple Human",
        description: "Toilet plunger for clearing blockages. Essential tool for maintaining plumbing systems in Kenyan homes and buildings.",
        image: "/assets/products/plunger.webp",
        inStock: true,
        rating: 4.5,
        reviews: 456
    },

    // =========================
    // Safety (10)
    // =========================
    {
        id: 71,
        name: "Safety Helmet",
        category: "Safety",
        brand: "3M",
        description: "Industrial safety helmet for construction sites. Meets Kenyan safety standards, essential for head protection on job sites.",
        image: "/assets/products/safety-helmet.webp",
        inStock: true,
        rating: 4.9,
        reviews: 534
    },
    {
        id: 72,
        name: "Safety Goggles",
        category: "Safety",
        brand: "3M",
        description: "Protective safety goggles for eye protection. Prevents injuries from debris and chemicals on Kenyan construction sites.",
        image: "/assets/products/safety-goggles.webp",
        inStock: true,
        rating: 4.7,
        reviews: 398
    },
    {
        id: 73,
        name: "Safety Gloves",
        category: "Safety",
        brand: "3M",
        description: "Industrial safety gloves for hand protection. Various types available for different tasks on Kenyan work sites.",
        image: "/assets/products/safety-gloves.webp",
        inStock: true,
        rating: 4.6,
        reviews: 467
    },
    {
        id: 74,
        name: "Reflective Vest",
        category: "Safety",
        brand: "3M",
        description: "High-visibility reflective vest for worker safety. Essential for road construction and low-light conditions in Kenya.",
        image: "/assets/products/reflective-vest.webp",
        inStock: true,
        rating: 4.8,
        reviews: 312
    },
    {
        id: 75,
        name: "Ear Protection",
        category: "Safety",
        brand: "3M",
        description: "Hearing protection for noisy environments. Protects workers from hearing damage on loud Kenyan construction sites.",
        image: "/assets/products/ear-protection.webp",
        inStock: true,
        rating: 4.7,
        reviews: 234
    },
    {
        id: 76,
        name: "Work Boots",
        category: "Safety",
        brand: "Bata Industrials",
        description: "Safety work boots with steel toe caps. Protects feet from heavy objects and provides grip on Kenyan construction sites.",
        image: "/assets/products/work-boots.webp",
        inStock: true,
        rating: 4.8,
        reviews: 423
    },
    {
        id: 77,
        name: "Dust Mask",
        category: "Safety",
        brand: "3M",
        description: "Respiratory protection masks for dust and particles. Essential for construction and woodworking in dusty Kenyan environments.",
        image: "/assets/products/dust-mask.webp",
        inStock: true,
        rating: 4.6,
        reviews: 378
    },
    {
        id: 78,
        name: "Harness",
        category: "Safety",
        brand: "3M",
        description: "Safety harness for fall protection. Crucial for workers at heights on Kenyan construction projects and maintenance work.",
        image: "/assets/products/harness.webp",
        inStock: true,
        rating: 4.9,
        reviews: 189
    },
    {
        id: 79,
        name: "First Aid Kit",
        category: "Safety",
        brand: "St. John Ambulance",
        description: "Comprehensive first aid kit for workplaces. Meets Kenyan occupational safety requirements for emergency medical care.",
        image: "/assets/products/first-aid-kit.webp",
        inStock: true,
        rating: 4.8,
        reviews: 267
    },
    {
        id: 80,
        name: "Fire Extinguisher",
        category: "Safety",
        brand: "Firemaster",
        description: "Fire extinguisher for workplace safety. Essential equipment for Kenyan buildings and construction sites as per fire regulations.",
        image: "/assets/products/fire-extinguisher.webp",
        inStock: true,
        rating: 4.9,
        reviews: 345
    },

    // =========================
    // Finishing (10)
    // =========================
    {
        id: 81,
        name: "Wall Paint (5L)",
        category: "Finishing",
        brand: "Crown Paints",
        description: "Premium interior and exterior wall paint from Crown Paints Kenya. Weather-resistant, washable, and available in various colors for Kenyan homes.",
        image: "/assets/products/wall-paint-5l.webp",
        inStock: true,
        rating: 4.8,
        reviews: 612
    },
    {
        id: 82,
        name: "Wall Tiles",
        category: "Finishing",
        brand: "Twyford Tiles",
        description: "Ceramic wall tiles from Twyford Kenya. Various designs and sizes perfect for bathrooms, kitchens, and feature walls in Kenyan homes.",
        image: "/assets/products/wall-tiles.webp",
        inStock: true,
        rating: 4.7,
        reviews: 456
    },
    {
        id: 83,
        name: "Floor Tiles",
        category: "Finishing",
        brand: "Twyford Tiles",
        description: "Durable floor tiles from Twyford Kenya. Slip-resistant and easy to clean, ideal for Kenyan homes and commercial spaces.",
        image: "/assets/products/floor-tiles.webp",
        inStock: true,
        rating: 4.8,
        reviews: 534
    },
    {
        id: 84,
        name: "Wood Varnish",
        category: "Finishing",
        brand: "Crown Paints",
        description: "Clear wood varnish from Crown Paints. Protects and enhances natural wood beauty, perfect for Kenyan furniture and woodwork.",
        image: "/assets/products/wood-varnish.webp",
        inStock: true,
        rating: 4.7,
        reviews: 298
    },
    {
        id: 85,
        name: "Plaster",
        category: "Finishing",
        brand: "Bamburi",
        description: "Finishing plaster from Bamburi Cement. Creates smooth surfaces for painting, ideal for interior walls in Kenyan buildings.",
        image: "/assets/products/plaster.webp",
        inStock: true,
        rating: 4.6,
        reviews: 378
    },
    {
        id: 86,
        name: "Grout (5kg)",
        category: "Finishing",
        brand: "Twyford",
        description: "Tile grout for filling joints between tiles. Water-resistant and mold-resistant, perfect for Kenyan bathroom and kitchen installations.",
        image: "/assets/products/grout-5kg.webp",
        inStock: true,
        rating: 4.7,
        reviews: 267
    },
    {
        id: 87,
        name: "Wood Polish",
        category: "Finishing",
        brand: "Crown Paints",
        description: "Wood polish and conditioner from Crown Paints. Restores and protects wooden surfaces in Kenyan homes and furniture.",
        image: "/assets/products/wood-polish.webp",
        inStock: true,
        rating: 4.6,
        reviews: 234
    },
    {
        id: 88,
        name: "Wallpaper Roll",
        category: "Finishing",
        brand: "Crown Paints",
        description: "Decorative wallpaper rolls from Crown Paints. Various patterns and textures to enhance interior spaces in Kenyan homes.",
        image: "/assets/products/wallpaper-roll.webp",
        inStock: true,
        rating: 4.5,
        reviews: 189
    },
    {
        id: 89,
        name: "Curtain Rods",
        category: "Finishing",
        brand: "Alfresco",
        description: "Decorative curtain rods and tracks. Various styles and finishes to complement Kenyan interior design preferences.",
        image: "/assets/products/curtain-rods.webp",
        inStock: true,
        rating: 4.6,
        reviews: 312
    },
    {
        id: 90,
        name: "Ceiling Board",
        category: "Finishing",
        brand: "Gyproc",
        description: "Gypsum ceiling boards for modern interiors. Easy to install and provides smooth finish for Kenyan homes and offices.",
        image: "/assets/products/ceiling-board.webp",
        inStock: true,
        rating: 4.7,
        reviews: 398
    }
];

// Categories for filtering
export const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'Construction', name: 'Construction' },
    { id: 'Metals', name: 'Metals' },
    { id: 'Tools', name: 'Tools' },
    { id: 'Fasteners', name: 'Fasteners' },
    { id: 'Building', name: 'Building' },
    { id: 'Electrical', name: 'Electrical' },
    { id: 'Plumbing', name: 'Plumbing' },
    { id: 'Safety', name: 'Safety' },
    { id: 'Finishing', name: 'Finishing' },
];

// Brands for filtering
export const brands = [
    { id: 'all', name: 'All Brands' },
    { id: 'Simba Cement', name: 'Simba Cement' },
    { id: 'Bamburi', name: 'Bamburi' },
    { id: 'Apex Steel', name: 'Apex Steel' },
    { id: 'Devki Steel', name: 'Devki Steel' },
    { id: 'Stanley', name: 'Stanley' },
    { id: 'Bosch', name: 'Bosch' },
    { id: 'Truper', name: 'Truper' },
    { id: '3M', name: '3M' },
    { id: 'Crown Paints', name: 'Crown Paints' },
    { id: 'Twyford', name: 'Twyford' },
    { id: 'Philips', name: 'Philips' },
    { id: 'Maisha Rolling Mabati', name: 'Maisha Rolling Mabati' },
];

// Quick search suggestions
export const quickSearches = [
    { id: 'cement', label: 'Cement' },
    { id: 'steel', label: 'Steel Bars' },
    { id: 'tools', label: 'Power Tools' },
    { id: 'safety', label: 'Safety Gear' },
    { id: 'paint', label: 'Paint' },
    { id: 'tiles', label: 'Tiles' },
];

export const getProductById = (id: string | number) => {
    return products.find(product => product.id === Number(id));
};

export const getProductsByCategory = (category: string) => {
    if (category === 'all') return products;
    return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
};

export const getProductsByBrand = (brand: string) => {
    if (brand === 'all') return products;
    return products.filter(product => product.brand === brand);
};

export const searchProducts = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return products.filter(product =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery) ||
        product.brand.toLowerCase().includes(lowerQuery)
    );
};
