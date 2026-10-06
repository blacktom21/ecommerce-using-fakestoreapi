import { createSlice } from '@reduxjs/toolkit';

function getInitialItems() {
  try {
    const items = JSON.parse(localStorage.getItem('secureCartWishlist') || '[]');
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { items: getInitialItems() },
  reducers: {
    addToWishlist: (state, action) => {
      const { product, userId } = action.payload;
      if (!state.items.some((item) => item.id === product.id && item.userId === userId)) {
        state.items.push({ ...product, userId });
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => !(item.id === action.payload.id && item.userId === action.payload.userId));
    },
    clearWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.userId !== action.payload);
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
