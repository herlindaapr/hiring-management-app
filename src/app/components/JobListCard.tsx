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

  const formatSalary = (min: string, max: string) => {
    // Remove all non-digit characters and format
    const formatNumber = (value: string): string => {
      const numeric = value.replace(/[^\d]/g, "");
      if (!numeric) return value;
      return Number(numeric).toLocaleString("id-ID");
    };
    const formattedMin = formatNumber(min);
    const formattedMax = formatNumber(max);
    return `Rp.${formattedMin} - Rp.${formattedMax}`;
  };

  return (
    <div className="w-full flex flex-col rounded-xl py-3 md:py-4 my-2 mx-2 md:mx-6 px-3 md:px-4 shadow-md text-black space-y-2">
      <div className="w-full flex flex-row flex-wrap gap-2 text-xs">
        <div className={`border px-2 md:px-3 py-1 rounded-md ${
          job.status === "active" 
            ? "border-success-border bg-success-surface text-success-main"
            : "border-gray-300 bg-gray-100 text-gray-500"
        }`}>
          {job.status === "active" ? "Active" : "Inactive"}
        </div>
        <div className="border px-2 md:px-3 py-1 rounded border-gray-200 text-gray-500">
          started on {formatDate(job.createdAt)}
        </div>
      </div>
      <div className="w-full flex font-bold text-sm md:text-base">
        <h1 className="truncate">{job.jobName}</h1>
      </div>
      <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-0 text-gray-600">
        <div className="flex w-full sm:w-1/2 text-xs md:text-sm">{formatSalary(job.minSalary, job.maxSalary)}</div>
        <div className="flex w-full sm:w-1/2 sm:justify-end">
          <button onClick={handleClick} className="text-xs border py-1.5 px-3 rounded-lg text-white bg-primary-main hover:cursor-pointer hover:bg-primary-hover w-full sm:w-auto">
            Manage Job
          </button>
        </div>
      </div>
    </div>
  );
}