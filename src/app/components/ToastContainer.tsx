"use client";

import { useToast } from "../context/ToastContext";
import { ToastItem } from "../types/index.types";

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-5 left-5 space-y-3">
      {toasts.map((toast: ToastItem) => (
        <div key={toast.id} className={`relative flex items-center gap-3 bg-white border border-gray-200 shadow-md rounded-xl py-3 px-4 min-w-[280px] transition-all duration-300
            ${toast.leaving ? "toast-exit" : "toast-enter"}
          `}>

            <div className={`absolute left-0 top-0 h-full w-1 rounded-l-xl
                ${toast.type === "success"
                    ? "bg-success-main"
                    : "bg-danger-main"}
              `}>
            </div>
            <div className={`flex items-center justify-center text-sm
                ${
                    toast.type === "success"
                    ? "border-success-main text-success-main"
                    : "border-danger-main text-danger-main"
                }
                `}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

            </div>

          {/* Message */}
          <p className="text-gray-700 text-sm flex-1 font-bold">
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
