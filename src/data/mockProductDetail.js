// src/data/mockProductDetail.js
// ─────────────────────────────────────────────
// MOCK — Replace with WooCommerce API later
// GET /wp-json/wc/v3/products?slug=rose-floral-midi-dress
// ─────────────────────────────────────────────

export const MOCK_PRODUCT = {
  id: 1,
  name: "Rosé Floral Midi Dress",
  color: "#000000",
  discount: 20,
  sale: true,
  inStock: true,
  slug: "rose-floral-midi-dress",
  price: 2499,
  originalPrice: 3299,
  rating: 4.8,
  reviewCount: 124,
  inStock: true,
  sku: "KL-DRS-001",
  category: "Dresses",
  badge: "NEW",
  description: `
    A timeless floral midi dress crafted from premium breathable fabric.
    The elegant V-neckline and cinched waist silhouette flatters every body type,
    making it perfect for brunches, festive occasions, or a day out in the city.
  `,
  features: [
    "100% premium breathable cotton blend",
    "Concealed back zipper for clean finish",
    "Fully lined, non-transparent fabric",
    "Hand wash recommended, machine wash gentle",
    "Model is 5'7\" wearing size M",
  ],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  images: [
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=85&fit=crop&crop=top",
    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=85&fit=crop&crop=top",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=85&fit=crop&crop=top",
    "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=85&fit=crop&crop=top",
  ],
};

export const MOCK_RELATED = [
  {
    id: 2,
    name: "Ivory Embroidered Kurti",
    price: 1899,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500&q=80&fit=crop&crop=top",
    bg: "#FDFAF3",
    slug: "ivory-embroidered-kurti",
    badge: null,
    badgeType: null,
  },
  {
    id: 3,
    name: "Magenta Power Suit",
    price: 4299,
    originalPrice: 5499,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4b46?w=500&q=80&fit=crop&crop=top",
    bg: "#F8F3FD",
    slug: "magenta-power-suit",
    badge: "HOT",
    badgeType: "hot",
  },
  {
    id: 4,
    name: "Champagne Wrap Dress",
    price: 2899,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80&fit=crop&crop=top",
    bg: "#FAF7F2",
    slug: "champagne-wrap-dress",
    badge: null,
    badgeType: null,
  },
  {
    id: 5,
    name: "Rose Pink Co-ord Set",
    price: 3199,
    originalPrice: 3999,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&q=80&fit=crop&crop=top",
    bg: "#FDF4F6",
    slug: "rose-pink-coord-set",
    badge: "NEW",
    badgeType: "new",
  },
];