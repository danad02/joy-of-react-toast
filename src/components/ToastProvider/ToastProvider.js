import React from "react";

import { useEscapeKey } from "../../hooks/useEscapeKey";

const ToastContext = React.createContext();

export const ToastProvider = ({ children, limit = Infinity, timeout }) => {
  const [toasts, setToasts] = React.useState([]);
  const timeoutsRef = React.useRef([]); // Keep track of timeouts

  const dismissAllToasts = React.useCallback(() => {
    setToasts([]);
  }, []);

  const dismissToast = React.useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  }, []);

  const addToast = React.useCallback(
    (message, variant) => {
      const newToast = {
        id: Math.random(),
        message,
        variant,
      };

      setToasts((prevToasts) => {
        if (
          typeof limit === "number" &&
          limit > 0 &&
          prevToasts.length >= limit
        ) {
          return [...prevToasts.slice(-limit + 1), newToast];
        }

        return [...prevToasts, newToast];
      });

      // Set up the timeout to dismiss this toast and store the timeout id
      if (typeof timeout === "number" && timeout > 0) {
        const timeoutId = setTimeout(() => dismissToast(newToast.id), timeout);
        timeoutsRef.current.push(timeoutId);
      }
    },
    [dismissToast, limit, timeout]
  );

  React.useEffect(() => {
    const timeouts = timeoutsRef.current;
    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const value = React.useMemo(
    () => ({
      toasts,
      addToast,
      dismissToast,
    }),
    [addToast, dismissToast, toasts]
  );

  useEscapeKey(dismissAllToasts);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

export const useToast = () => React.useContext(ToastContext);
