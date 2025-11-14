"use client";

import { useToast } from "../context/ToastContext";
import { ToastItem } from "../types/index.types";

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-5 left-5 z-50 space-y-3">
      {toasts.map((toast: ToastItem) => (
        <div key={toast.id} className={`relative flex items-center gap-3 bg-white border border-gray-200 shadow-md rounded-xl py-3 px-4 min-w-[280px]
            ${toast.leaving ? "toast-exit" : "toast-enter"}
          `}>
          {/* Left colored border */}
          <span className={`absolute left-0 top-0 h-full w-1 rounded-l-xl
              ${toast.type === "success"
                  ? "bg-success-main"
                  : toast.type === "error"
                  ? "bg-danger-main"
                  : "bg-warning-main"}
            `}>
            </span>

          {/* Checkmark icon (pure JSX) */}
          <div className={`w-6 h-6 flex items-center justify-center rounded-full border-2 text-sm
              ${
                toast.type === "success"
                  ? "border-success-main text-success-main"
                  : toast.type === "error"
                  ? "border-danger-main text-danger-main"
                  : "border-warning-main text-warning-main"
              }
            `}
          >
            ✓
          </div>

          {/* Message */}
          <p className="text-gray-700 text-sm flex-1">
            {toast.message}
          </p>

          {/* Close button */}
          <button onClick={() => removeToast(toast.id)} className="text-gray-500 hover:text-gray-800 hover:cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
