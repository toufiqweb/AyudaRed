"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration = 4000) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (msg, duration) => addToast(msg, "success", duration),
    error: (msg, duration) => addToast(msg, "error", duration),
    info: (msg, duration) => addToast(msg, "info", duration),
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Premium Floating Toast Grid Layout */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 pointer-events-none max-w-sm w-full sm:w-85">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-start justify-between gap-3 p-4 rounded-xl bg-secondary text-foreground border border-border/80 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] backdrop-blur-md animate-in slide-in-from-bottom-3 fade-in duration-300 w-full group relative overflow-hidden"
          >
            {/* Subtle left glow bar dynamically matching state */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-[3px] transition-colors ${
                t.type === "success"
                  ? "bg-primary"
                  : t.type === "error"
                    ? "bg-danger"
                    : "bg-foreground/30"
              }`}
            />

            <div className="flex items-start gap-3 pl-1">
              {/* Dynamic Notification Icon Mapping */}
              {t.type === "success" && (
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              )}
              {t.type === "error" && (
                <XCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
              )}
              {t.type === "info" && (
                <Info className="w-5 h-5 text-foreground/60 shrink-0 mt-0.5" />
              )}

              <div className="space-y-0.5">
                <p className="text-sm font-semibold tracking-tight">
                  {t.type === "success"
                    ? "Success"
                    : t.type === "error"
                      ? "System Alert"
                      : "Information"}
                </p>
                <p className="text-xs text-foreground/70 leading-relaxed font-medium">
                  {t.message}
                </p>
              </div>
            </div>

            {/* Premium Dismiss Trigger button */}
            <button
              onClick={() => removeToast(t.id)}
              className="text-foreground/40 hover:text-foreground border border-transparent hover:border-border/60 hover:bg-muted p-1 rounded-lg transition-all duration-200 shrink-0 -mt-1 -mr-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context.toast;
}
