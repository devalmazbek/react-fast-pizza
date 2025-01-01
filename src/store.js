import { configureStore } from "@reduxjs/toolkit";

import  useReducer  from "./features/users/userSlice";
import cartReducer from "./features/cart/cartSlice";

const store = configureStore({
    reducer: {
        user: useReducer,
        cart: cartReducer,
    }
});

export default store;