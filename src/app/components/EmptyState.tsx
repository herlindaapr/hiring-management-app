"use client"

import { useState } from "react";
import ApplyFormModals from "../components/ApplyFormModals";

export default function EmptyState() {

    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

    return (
        <div className="w-full flex flex-col text-black items-center justify-center py-32 space-y-2">
            <div className="w-1/4">
                <img src="/empty.png" alt="empty state image" className="w-full" />
            </div>
            <p className="font-bold text-xl">No job openings available</p>
            <p className="text-base pb-2 text-gray-600">Create a job opening now and start the candidate process.</p>
            <button className="w-max bg-secondary-main hover:bg-secondary-hover hover:cursor-pointer text-black font-medium text-base rounded-lg px-4 py-2 transition-all shadow-md hover:shadow-lg" 
              onClick={() => setIsApplyModalOpen(true)}>
              Create a new job
            </button>

            {isApplyModalOpen && (
                <ApplyFormModals onClose={() => setIsApplyModalOpen(false)} />
            )}
        </div>
    )
}