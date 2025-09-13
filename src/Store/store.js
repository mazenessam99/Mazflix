import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./wishlistSlice";

// save to localStorage
const saveWishlist = (wishlist) => {
  try {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  } catch (e) {
    console.error("Error saving wishlist:", e);
  }
};

// load from localStorage
const loadWishlist = () => {
  try {
    const data = localStorage.getItem("wishlist");
    return data ? JSON.parse(data) : { items: [] };
  } catch (e) {
    return { items: [] };
  }
};

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
  },
  preloadedState: {
    wishlist: loadWishlist(),
  },
});

store.subscribe(() => {
  saveWishlist(store.getState().wishlist);
});

export default store;
