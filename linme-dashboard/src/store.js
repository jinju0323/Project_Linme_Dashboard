import { configureStore } from "@reduxjs/toolkit";

import SalesSlice from "./slices/SalesSlice";
import BestProductsSlice from "./slices/BestProductsSlice";
import NewMemberSlice from "./slices/NewMemberSlice";
import ProfitSlice from "./slices/ProfitSlice";

const store = configureStore({
  reducer: {
    SalesSlice,
    BestProductsSlice,
    NewMemberSlice,
    ProfitSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
