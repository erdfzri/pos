export const products = [
  {
    id: 1,
    name: 'Espresso',
    category: 'Coffee',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500&auto=format&fit=crop&q=60',
    stock: 50,
  },
  {
    id: 2,
    name: 'Cappuccino',
    category: 'Coffee',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&auto=format&fit=crop&q=60',
    stock: 45,
  },
  {
    id: 3,
    name: 'Caramel Macchiato',
    category: 'Coffee',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=500&auto=format&fit=crop&q=60',
    stock: 30,
  },
  {
    id: 4,
    name: 'Matcha Latte',
    category: 'Tea',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=500&auto=format&fit=crop&q=60',
    stock: 25,
  },
  {
    id: 5,
    name: 'Strawberry Smoothie',
    category: 'Beverage',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1628557044736-15ec4268c675?w=500&auto=format&fit=crop&q=60',
    stock: 20,
  },
  {
    id: 6,
    name: 'Croissant',
    category: 'Pastry',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1555507036-ab1e4006a0a0?w=500&auto=format&fit=crop&q=60',
    stock: 15,
  },
  {
    id: 7,
    name: 'Chocolate Cake',
    category: 'Dessert',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60',
    stock: 10,
  },
  {
    id: 8,
    name: 'Avocado Toast',
    category: 'Food',
    price: 48000,
    image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=500&auto=format&fit=crop&q=60',
    stock: 12,
  }
];

export const categories = [
  'All',
  'Coffee',
  'Tea',
  'Beverage',
  'Pastry',
  'Dessert',
  'Food'
];

export const recentTransactions = [
  {
    id: 'TRX-1029',
    time: '10:45 AM',
    items: 3,
    total: 105000,
    method: 'QRIS',
    status: 'Success'
  },
  {
    id: 'TRX-1028',
    time: '10:30 AM',
    items: 1,
    total: 25000,
    method: 'Cash',
    status: 'Success'
  },
  {
    id: 'TRX-1027',
    time: '10:15 AM',
    items: 2,
    total: 75000,
    method: 'Debit',
    status: 'Success'
  },
  {
    id: 'TRX-1026',
    time: '09:50 AM',
    items: 4,
    total: 145000,
    method: 'E-Wallet',
    status: 'Success'
  },
  {
    id: 'TRX-1025',
    time: '09:30 AM',
    items: 1,
    total: 28000,
    method: 'Cash',
    status: 'Refunded'
  }
];

export const dashboardStats = {
  todaySales: 2450000,
  totalTransactions: 68,
  productsSold: 124,
  revenue: 15800000
};
