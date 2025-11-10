// src/data.js

// We've added the new fields to your mock data
export const ALL_PRODUCTS = [
  { 
    id: 1, 
    name: 'Blocky Widget', 
    category: 'Widgets', 
    description: 'A very fine, blocky widget. Built to last with high-grade materials and a stark, uncompromising design. Perfect for industrial applications.', 
    imageUrl: 'https://picsum.photos/seed/1/600/400',
    price: 129.99,
    stock: 50,
    authorId: 'user_admin',
    createdAt: '2025-10-01T08:00:00Z',
    updatedAt: '2025-10-28T14:30:00Z'
  },
  { 
    id: 2, 
    name: 'Sharp Gadget', 
    category: 'Gadgets', 
    description: 'A sharp, edgy gadget. Features a high-contrast display and tactile, responsive buttons. Not for the faint of heart.', 
    imageUrl: 'https://picsum.photos/seed/2/600/400',
    price: 249.50,
    stock: 0, // Out of stock
    authorId: 'user_jane',
    createdAt: '2025-10-05T11:20:00Z',
    updatedAt: '2025-10-25T18:45:00Z'
  },
  { 
    id: 3, 
    name: 'Bold Thingamabob', 
    category: 'Widgets', 
    description: 'A bold, uncompromising item. Its functionality is as direct as its appearance. What you see is what you get.', 
    imageUrl: 'https://picsum.photos/seed/3/600/400',
    price: 89.00,
    stock: 120,
    authorId: 'user_admin',
    createdAt: '2025-10-10T14:00:00Z',
    updatedAt: '2025-10-10T14:00:00Z'
  },
  // ... add the rest of your products
];

// Helper function to simulate a data fetch
export const getProductById = (id) => {
  return ALL_PRODUCTS.find(p => p.id.toString() === id);
};