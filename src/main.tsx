import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import "./i18n";
import "./index.css";
import { persistor, store } from "./redux/store";
import router from "./router/routes";
import DynamicHelmet from "./component/DynamicHelmet/DynamicHelmet";
ReactDOM.createRoot(document.getElementById("root")!).render(
    <HelmetProvider>
      <DynamicHelmet/>
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors />
      </PersistGate>
    </Provider>
  </React.StrictMode>
    </HelmetProvider>
);
