import React from "react";

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

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

export const useToast = () => React.useContext(ToastContext);
