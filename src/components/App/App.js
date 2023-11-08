import React from "react";

import ToastPlayground from "../ToastPlayground";
import ToastShelf from "../ToastShelf";
import { ToastProvider } from "../ToastProvider";
import Footer from "../Footer";

function App() {
  return (
    <ToastProvider limit={4} timeout={3000}>
      <ToastPlayground />
      <ToastShelf />
      <Footer />
    </ToastProvider>
  );
}

export default App;
