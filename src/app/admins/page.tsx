'use client'

import SearchBar from "../components/SearchBar";
import Image from "next/image";
import { useState } from "react";
import ApplyFormModals from "../components/ApplyFormModals";
import JobListCard from "../components/JobListCard";
import UserDropdown from "../components/UserDropdown";
import { useJobs } from "../context/JobContext";
import EmptyState from "../components/EmptyState";
import { Job } from "../types/index.types";

export default function AdminPage() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const { jobs } = useJobs();

  return (
    <>
      <nav className="bg-white flex border-2 border-gray-200 w-full">
        <div className="flex w-full">
          <div className="flex flex-row w-full py-2 px-2 md:px-4">
            <div className="flex w-full">
              <p className="flex text-black text-base md:text-lg font-bold items-center">Job List</p>
            </div>
            <div className="flex w-full justify-end">
              <UserDropdown />
            </div>
          </div>
        </div>
      </nav>

      <main className="w-full flex flex-col lg:flex-row">
        <div className="flex flex-col w-full lg:w-3/4 bg-white">
          <div className="w-full">
            <SearchBar />
          </div>
          <div className="w-full">
            {jobs.length === 0 ? (
              <div className="flex justify-center items-center py-10">
                <EmptyState />
              </div>
            ) : (
              jobs.map((job: Job) => (
                <JobListCard key={job.id} job={job} />
              ))
            )}
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-1/4 h-max relative items-center justify-center text-center text-white my-4 md:my-8 mx-4 md:mx-10 lg:mx-10">
          <Image 
            src="/bg-menu.jpg" 
            alt="menu side bar" 
            fill 
            priority 
            className="object-cover rounded-2xl"
          />
          <div className="absolute inset-0 bg-black/60 rounded-2xl" />
          <div className="relative py-4 md:py-6 space-y-1 px-4">
            <p className="text-base md:text-lg font-semibold">
              Recruit the best candidates
            </p>
            <p className="text-xs md:text-sm opacity-90 mb-4 md:mb-6">
              Create jobs, invite, and hire with ease
            </p>

            <button className="bg-primary-main hover:bg-primary-hover hover:cursor-pointer text-white font-medium text-sm md:text-base w-full rounded-lg py-2 transition-all shadow-md hover:shadow-lg" 
              onClick={() => setIsApplyModalOpen(true)}>
              Create a new job
            </button>
          </div>
        </div>
      </main>

      {isApplyModalOpen && (
        <ApplyFormModals onClose={() => setIsApplyModalOpen(false)} />
      )}
    </>
  );
}
