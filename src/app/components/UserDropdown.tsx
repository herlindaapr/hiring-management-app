"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function UserDropdown() {
  const { data: session } = useSession();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
    router.refresh();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <img src="/avatar.png" alt="avatar" className="w-10 h-10 border rounded-full" />
        {session?.user && (
          <span className="text-sm text-gray-700 hidden md:block">
            {session.user.name || session.user.email}
          </span>
        )}
      </button>
      
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
          <div className="py-2">
            {session?.user && (
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900">{session.user.name || session.user.email}</p>
                <p className="text-xs text-gray-500">{session.user.email}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Role: <span className="font-medium capitalize">{session.user.role}</span>
                </p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

