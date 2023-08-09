import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartOpen: false,
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem(state, action) {
      const newItem = action.payload.newItem;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.totalPrice += newItem.price;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          img: newItem.imagesPath,
          slug: newItem.slug,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
      }
    },
    decreaseItemQuantity(state, action) {
      const id = action.payload.id;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.totalPrice -= existingItem.price;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
      }
    },
    increaseItemQuantity(state, action) {
      const id = action.payload.id;
      const item = state.items.find((item) => item.id === id);
      item.quantity++;
      state.totalQuantity++;
      state.totalPrice += item.price;
    },
    removeCartItem(state, action) {
      const id = action.payload.id;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
    setIsCartOpen(state) {
      state.isCartOpen = true;
    },
    closeCart(state) {
      state.isCartOpen = false;
    },
    clearCart(state) {
      state.isCartOpen = false;
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addCartItem,
  decreaseItemQuantity,
  increaseItemQuantity,
  removeCartItem,
  setIsCartOpen,
  closeCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
