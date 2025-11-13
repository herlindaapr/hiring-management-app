"use client";

import UserDropdown from "./UserDropdown";

export default function Navbar() {
  return (
    <div className="bg-white flex drop-shadow-lg w-full">
        <div className="flex max-w-7xl w-full">
            
            <div className="flex py-2 ml-auto px-2 md:px-4">
                <hr className="w-0.5 h-5 md:h-6 bg-gray-200 border-0 my-auto mx-2 md:mx-4" />
                <UserDropdown />
            </div>
        </div>
    </div>
  );
}