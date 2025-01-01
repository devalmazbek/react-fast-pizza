import { configureStore } from "@reduxjs/toolkit";

import  useReducer  from "./features/users/userSlice";

const store = configureStore({
    reducer: {
        user: useReducer,
    }
});

export default store;