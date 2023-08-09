import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isWishOpen: false,
  items: [],
};

const wishSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addWishItem(state, action) {
      const newItem = action.payload.newItem;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          img: newItem.imagesPath,
          slug: newItem.slug,
        });
      }
    },
    removeWishItem(state, action) {
      const id = action.payload.id;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
    setIsWishOpen(state) {
      state.isWishOpen = true;
    },
    closeWish(state) {
      state.isWishOpen = false;
    },
  },
});

export const { addWishItem, removeWishItem, setIsWishOpen, closeWish } =
  wishSlice.actions;

export default wishSlice.reducer;
