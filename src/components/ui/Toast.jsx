"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, showToast, removeToast };
}

export function ToastContainer({ toasts, removeToast }) {
  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2.5 max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium animate-in slide-in-from-bottom-2 duration-200 ${
            toast.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          <span className="shrink-0 mt-0.5">
            {toast.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <XCircle className="w-4 h-4 text-rose-600" />
            )}
          </span>
          <p className="flex-1 leading-snug">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="shrink-0 text-current opacity-50 hover:opacity-80 transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
