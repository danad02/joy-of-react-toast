import React from "react";

import ToastPlayground from "../ToastPlayground";
import ToastShelf from "../ToastShelf";
import { ToastProvider } from "../ToastProvider";
import Footer from "../Footer";

function App() {
  return (
    <ToastProvider>
      <ToastPlayground />
      <ToastShelf />
      <Footer />
    </ToastProvider>
  );
}

export default App;
