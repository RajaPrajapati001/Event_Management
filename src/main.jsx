import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import App from "./App";
import { postsApi } from "./components/services";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApiProvider api={postsApi}>
      <App />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ApiProvider>
  </StrictMode>
);