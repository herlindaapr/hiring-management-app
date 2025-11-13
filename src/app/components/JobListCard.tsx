"use client"

import { useRouter } from "next/navigation";
import { Job } from "@/app/types/index.types";

interface JobListCardProps {
  job: Job;
}

export default function JobListCard({ job }: JobListCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/admins/manage-job?id=${job.id}`);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Format salary
  const formatSalary = (min: string, max: string) => {
    return `Rp.${min} - Rp.${max}`;
  };

  return (
    <div className="w-full flex flex-col rounded-xl py-4 my-2 mx-6 px-4 shadow-md text-black space-y-2">
      <div className="w-full flex flex-row text-xs">
        <div className={`border px-3 py-1 rounded-md ${
          job.status === "active" 
            ? "border-success-border bg-success-surface text-success-main"
            : "border-gray-300 bg-gray-100 text-gray-500"
        }`}>
          {job.status === "active" ? "Active" : "Inactive"}
        </div>
        <div className="border px-3 py-1 mx-3 rounded border-gray-200 text-gray-500">
          started on {formatDate(job.createdAt)}
        </div>
      </div>
      <div className="w-full flex font-bold">
        <h1>{job.jobName}</h1>
      </div>
      <div className="w-full flex flex-row text-gray-600">
        <div className="flex w-1/2">{formatSalary(job.minSalary, job.maxSalary)}</div>
        <div className="flex w-1/2 justify-end">
          <button 
            onClick={handleClick} 
            className="text-xs border py-1 px-3 rounded-lg text-white bg-primary-main hover:cursor-pointer"
          >
            Manage Job
          </button>
        </div>
      </div>
    </div>
  );
}