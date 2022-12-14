import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface CartState {
  items: {
    [productId: string]: number;
  };
}

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.items[id] ? state.items[id]++ : (state.items[id] = 1);
    },
    removeFromCart(state, action: PayloadAction<string>) {
      delete state.items[action.payload];
    },
    updateQuantity(
      state,
      action: PayloadAction<{ itemId: string; quantity: number }>
    ) {
      const { itemId, quantity } = action.payload;
      state.items[itemId] = quantity;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;

export const getMemoizedNumItems = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    let numItems = 0;
    for (const id in items) {
      numItems += items[id];
    }

    return numItems;
  }
);

export const getTotalPrice = createSelector(
  (state: RootState) => state.cart.items,
  (state: RootState) => state.products.products,
  (items, products) => {
    let total = 0;
    for (const id in items) {
      total += products[id].price * items[id];
    }

    return total.toFixed(2);
  }
);
