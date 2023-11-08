import React from "react";

export const useEscapeKey = (onEscape) => {
  React.useEffect(() => {
    const dismissToasts = (e) => {
      if (e.code === "Escape") {
        onEscape(e);
      }
    };

    window.addEventListener("keydown", dismissToasts);

    return () => {
      window.removeEventListener("keydown", dismissToasts);
    };
  }, [onEscape]);
};
