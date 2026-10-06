const fallbackProducts = [
  {
    id: 1,
    title: 'Everyday Carryall Backpack',
    price: 39.95,
    category: 'everyday essentials',
    description: 'A reliable, roomy backpack made for daily commutes, weekend plans, and everywhere in between.',
    image: '/images/products/essentials.svg',
    rating: { rate: 4.7, count: 126 },
  },
  {
    id: 2,
    title: 'Classic Fit Cotton Tee',
    price: 22.5,
    category: 'clothing',
    description: 'A soft, easy-to-style cotton tee with a comfortable everyday fit.',
    image: '/images/products/clothing.svg',
    rating: { rate: 4.3, count: 94 },
  },
  {
    id: 3,
    title: 'Minimalist Gold Bracelet',
    price: 28,
    category: 'accessories',
    description: 'A simple, polished accent that layers beautifully and makes an easy gift.',
    image: '/images/products/accessories.svg',
    rating: { rate: 4.6, count: 82 },
  },
  {
    id: 4,
    title: 'Soft Knit Weekend Sweater',
    price: 44.99,
    category: 'clothing',
    description: 'A cozy layer in a relaxed silhouette, made for slower mornings and cool evenings.',
    image: '/images/products/clothing.svg',
    rating: { rate: 4.8, count: 111 },
  },
  {
    id: 5,
    title: 'Everyday Portable Drive',
    price: 54.5,
    category: 'tech',
    description: 'A compact and dependable storage companion for work, study, and travel.',
    image: '/images/products/tech.svg',
    rating: { rate: 4.5, count: 75 },
  },
  {
    id: 6,
    title: 'Studio Wireless Headphones',
    price: 68,
    category: 'tech',
    description: 'Comfortable over-ear headphones for playlists, podcasts, and a little quiet time.',
    image: '/images/products/tech.svg',
    rating: { rate: 4.4, count: 132 },
  },
  {
    id: 7,
    title: 'Lightweight City Jacket',
    price: 59.95,
    category: 'clothing',
    description: 'A versatile light layer designed to travel easily from weekday to weekend.',
    image: '/images/products/clothing.svg',
    rating: { rate: 4.2, count: 65 },
  },
  {
    id: 8,
    title: 'Everyday Sterling Earrings',
    price: 32,
    category: 'accessories',
    description: 'Timeless everyday earrings with a clean, understated finish.',
    image: '/images/products/accessories.svg',
    rating: { rate: 4.9, count: 145 },
  },
];

export function fallbackImageForCategory(category = '') {
  const value = category.toLowerCase();
  if (value.includes('cloth')) return '/images/products/clothing.svg';
  if (value.includes('jewel') || value.includes('accessor')) return '/images/products/accessories.svg';
  if (value.includes('tech') || value.includes('electronic')) return '/images/products/tech.svg';
  return '/images/products/essentials.svg';
}

export default fallbackProducts;
