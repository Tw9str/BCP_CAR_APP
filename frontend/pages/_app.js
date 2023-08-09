import "@/styles/globals.css";
import "@/styles/carDetails.css";
import "@/styles/productDetails.css";
import "@/styles/customDetails.css";
import "@/styles/auth.css";
import "@/styles/add.css";
import "@/styles/loader.css";
import "@/styles/modal.css";
import "@/styles/carPage.css";
import "@/styles/breadcrumb.css";
import "@/styles/filter.css";
import "@/styles/reviewForm.css";
import "@/styles/shop.css";
import "@/styles/customs.css";
import "@/styles/404.css";
import "@/styles/cart.css";
import "@/styles/postPayment.css";
import "@/styles/wishlist.css";
import "@/styles/editInput.css";

import authReducer from "../state";
import cartReducer from "../state/cart";
import wishReducer from "../state/wishlist";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createTransform,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "@/components/layout/Layout";

const excludeKeysTransformer = createTransform(
  (inboundState, key) => {
    return {
      ...inboundState,
      isEditMode: undefined,
      isFileEdit: undefined,
    };
  },
  (outboundState, key) => {
    return outboundState;
  },
  { whitelist: ["auth"] }
);

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  wishlist: wishReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["auth", "cart", "wishlist"],
  transforms: [excludeKeysTransformer],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const persistor = persistStore(store);

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}
