import { createSlice } from '@reduxjs/toolkit';

function getInitialItems() {
  try {
    const items = JSON.parse(localStorage.getItem('secureCartItems') || '[]');
    return Array.isArray(items) ? items.filter((item) => item?.id && Number(item.quantity) > 0) : [];
  } catch {
    return [];
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: getInitialItems() },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...action.payload, quantity: 1 });
    },
    updateQuantity: (state, action) => {
      const item = state.items.find((product) => product.id === action.payload.id);
      if (item) item.quantity = Math.max(1, action.payload.quantity);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
