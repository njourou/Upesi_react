import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from 'react-redux';

import { createRoot } from "react-dom/client";
import store from "./store.jsx"
const container = document.getElementById("root");
const root = createRoot(container);
import { GoogleOAuthProvider } from '@react-oauth/google';

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <GoogleOAuthProvider clientId="600187593848-6ci83f9a0fr37o3bkjponf636v2tslri.apps.googleusercontent.com"> <App /></GoogleOAuthProvider>;


    </React.StrictMode>
  </Provider>
);
