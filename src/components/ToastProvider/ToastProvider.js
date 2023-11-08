import React from "react";

import { useEscapeKey } from "../../hooks/useEscapeKey";

const ToastContext = React.createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = React.useState([]);

  const addToast = React.useCallback((message, variant) => {
    const newToast = {
      id: Math.random(),
      message,
      variant,
    };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  }, []);

  const dismissToasts = React.useCallback(() => {
    setToasts([]);
  }, []);

  const dismissToast = React.useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  }, []);

  const value = React.useMemo(
    () => ({
      toasts,
      addToast,
      dismissToast,
    }),
    [addToast, dismissToast, toasts]
  );

  useEscapeKey(dismissToasts);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

export const useToast = () => React.useContext(ToastContext);
