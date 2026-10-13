export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Bloggers\' Choice' | 'NEW ARRIVALS' | 'Bestsellers' | 'All';
  collection: string;
  isEco: boolean;
  image: string;
  shortDesc: string;
  description: string;
  materials: string[];
  dimensions: string;
  weight: string;
  colors: { name: string; hex: string }[];
  tag?: string;
  buttonClass?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'naomi',
    name: 'Naomi',
    price: 1420,
    category: 'NEW ARRIVALS',
    collection: 'Organic Shell',
    isEco: true,
    image: '/src/assets/images/bag_naomi_transparent.png',
    shortDesc: 'Soft cybernetic contours in dusty rose pink with ergonomic fluid body seams.',
    description: 'Naomi embodies shush\'s signature romantic futurism. Sculpted anatomical embossing along the front frames high-shine chrome fixtures and a convertible curb chain shoulder strap.',
    materials: ['Plant-derived smooth bio-leather', 'Chrome zinc-alloy clasp', 'Eco-suede lining'],
    dimensions: '26 × 20 × 11 cm',
    weight: '540g',
    colors: [
      { name: 'Dusty Rose Pink', hex: '#D98299' },
      { name: 'Blush Pearl', hex: '#FCE7F3' },
      { name: 'Obsidian Noir', hex: '#18181B' }
    ],
    tag: 'Icon',
    buttonClass: 'bg-[#FCE7F3] text-[#9D344E] hover:bg-white hover:text-[#882840] shadow-[0_4px_16px_rgba(244,114,182,0.35)]'
  },
  {
    id: 'brielle',
    name: 'Brielle',
    price: 1350,
    category: 'NEW ARRIVALS',
    collection: 'Cyber Minimal',
    isEco: true,
    image: '/src/assets/images/bag_brielle_transparent.png',
    shortDesc: 'Sculptural architectural tote in matte porcelain white with chrome slat vents.',
    description: 'Brielle expresses hyper-modern architectural geometry. Precision-creased panels meet polished chrome venting slats and an aerospace-grade magnetic latch clasp for seamless daily utility.',
    materials: ['Grained eco-leather', 'Polished chrome accents', 'Recycled cotton twill interior'],
    dimensions: '29 × 24 × 12 cm',
    weight: '620g',
    colors: [
      { name: 'Porcelain White', hex: '#F8FAFC' },
      { name: 'Cyber Sand', hex: '#E7DEC8' },
      { name: 'Monolith Black', hex: '#1A202C' }
    ],
    tag: 'Editor Pick',
    buttonClass: 'bg-white text-stone-900 hover:bg-stone-100 shadow-[0_4px_16px_rgba(255,255,255,0.45)]'
  },
  {
    id: 'sabrina',
    name: 'Sabrina',
    price: 1250,
    category: 'NEW ARRIVALS',
    collection: 'Chrome Liquid',
    isEco: true,
    image: '/src/assets/images/bag_sabrina_transparent.png',
    shortDesc: 'Mirror-polished liquid chrome bowling silhouette with cyber-organic curves.',
    description: 'Sabrina merges aerodynamic fluidity with structured volume. Crafted from an ultra-light bio-polymer matrix coated in high-gloss mirror chrome finish, with double ergonomic top handles and custom laser-engraved hardware.',
    materials: ['Recycled bio-polymer core', 'Liquid chrome mirror vacuum coating', 'Waterproof microfiber lining'],
    dimensions: '32 × 18 × 14 cm',
    weight: '580g',
    colors: [
      { name: 'Mirror Chrome', hex: '#E2E8F0' },
      { name: 'Titanium Graphite', hex: '#4A5568' },
      { name: 'Rose Mercury', hex: '#F4B5C6' }
    ],
    tag: 'Trending',
    buttonClass: 'bg-[#EDEDED] text-stone-900 hover:bg-white hover:text-black shadow-[0_4px_16px_rgba(255,255,255,0.4)]'
  },
  {
    id: 'valeria',
    name: 'Valeria',
    price: 1580,
    category: 'NEW ARRIVALS',
    collection: 'Organic Shell',
    isEco: true,
    image: '/src/assets/images/bag_valeria_transparent.png',
    shortDesc: 'Aerodynamic petal-formed silhouette in dusty rose cyber-leather with polished chrome crest.',
    description: 'Valeria balances futuristic biomimicry and bespoke craftsmanship. Softly arched contours wrap around an internal titanium skeleton, completed with hand-braided trim.',
    materials: ['Ultra-smooth vegan calfskin', 'Precision-milled aerospace aluminum clasp', 'Organic linen twill'],
    dimensions: '30 × 21 × 13 cm',
    weight: '590g',
    colors: [
      { name: 'Blush Rose', hex: '#DB7B97' },
      { name: 'Platinum Silver', hex: '#E2E8F0' },
      { name: 'Cyber Noir', hex: '#111827' }
    ],
    tag: 'New Edition',
    buttonClass: 'bg-[#FCE7F3] text-[#9D344E] hover:bg-white shadow-[0_4px_16px_rgba(244,114,182,0.35)]'
  },
  {
    id: 'seraphina',
    name: 'Seraphina',
    price: 1490,
    category: 'NEW ARRIVALS',
    collection: 'Chrome Liquid',
    isEco: true,
    image: '/src/assets/images/bag_seraphina_transparent.png',
    shortDesc: 'Avant-garde sculpted silhouette featuring streamlined chrome curves and ergonomic carry.',
    description: 'Seraphina is an exploration in cybernetic curvature. Mirror-reflective chrome trims trace the bag’s fluid profile, creating an undeniable statement piece for the avant-garde wardrobe.',
    materials: ['Anodized aluminum alloy hardware', 'Lightweight bio-resin chassis', 'Recycled microsuede interior'],
    dimensions: '31 × 23 × 12 cm',
    weight: '610g',
    colors: [
      { name: 'Liquid Mercury', hex: '#CBD5E1' },
      { name: 'Rose Chrome', hex: '#F4B5C6' },
      { name: 'Onyx Polish', hex: '#0F172A' }
    ],
    tag: 'Avant-Garde',
    buttonClass: 'bg-[#EDEDED] text-stone-900 hover:bg-white shadow-[0_4px_16px_rgba(255,255,255,0.4)]'
  },
  {
    id: 'mignardise-mini',
    name: 'Mignardise Mini',
    price: 1150,
    category: 'Bestsellers',
    collection: 'Micro Confection',
    isEco: true,
    image: '/src/assets/images/bag_sabrina_transparent.png',
    shortDesc: 'Whimsical sculpted micro bag inspired by surreal Parisian haute pâtisserie.',
    description: 'A playful study in dessert architecture and futuristic form. Fits cards, keys, and lip gloss, adorned with a delicate detachable jewelry chain.',
    materials: ['Supple vegan nappa', 'Polished brass/chrome monogram', 'Silk-touch interior'],
    dimensions: '16 × 14 × 8 cm',
    weight: '310g',
    colors: [
      { name: 'Pastel Sorbet', hex: '#F9A8D4' },
      { name: 'Cream Frosting', hex: '#FFFBEB' }
    ],
    tag: 'Mini',
    buttonClass: 'bg-[#F3E8FF] text-[#6B21A8] hover:bg-white shadow-[0_4px_16px_rgba(216,180,254,0.35)]'
  },
  {
    id: 'hero-hush',
    name: 'shush Signature Couture',
    price: 1650,
    category: 'Bloggers\' Choice',
    collection: 'Organic Shell',
    isEco: true,
    image: '/src/assets/images/hero_bag_transparent.png',
    shortDesc: 'The centerpiece flagship bag combining petal-curved panels with dual chrome arch handles.',
    description: 'Featured in our launch campaign, the shush Signature Couture blends soft organic silicone-touch bio leather with swooping architectural chrome arch handles and a braided shoulder strap.',
    materials: ['Premium eco-polymer', 'Cast aluminum chrome handles', 'Monogram microfiber interior'],
    dimensions: '34 × 22 × 15 cm',
    weight: '680g',
    colors: [
      { name: 'Blossom Pink', hex: '#DB7B97' },
      { name: 'Liquid Silver', hex: '#CBD5E1' }
    ],
    tag: 'Flagship',
    buttonClass: 'bg-[#FCE7F3] text-[#9D344E] hover:bg-white shadow-[0_4px_16px_rgba(244,114,182,0.35)]'
  }
];

export const REVIEWS = [
  {
    platform: 'x' as const,
    author: 'Anonymous',
    role: 'Fashion Editor',
    content: 'shush defines what futuristic luxury should feel like: zero gimmick, pure tactile ergonomic poetry and astonishing chrome finishes.'
  },
  {
    platform: 'instagram' as const,
    author: 'Anonymous',
    role: 'Verified Buyer',
    content: 'The Sabrina bag in liquid chrome stops people on the street every single day. Incredibly light, spacious, and impeccably constructed.'
  },
  {
    platform: 'threads' as const,
    author: 'Anonymous',
    role: 'Creative Director',
    content: 'Naomi\'s organic curves and dusty pink hue strike the rarest balance between avant-garde art object and everyday workhorse.'
  }
];
