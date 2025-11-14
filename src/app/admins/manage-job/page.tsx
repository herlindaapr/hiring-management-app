"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useJobs } from "@/app/context/JobContext";
import type { JobType } from "@/app/types/index.types";
import { Suspense } from 'react';

type Candidate = {
  name: string;
  email: string;
  phone: string;
  dob: string;
  domicile: string;
  gender: string;
  linkedin: string;
  jobId?: string;
  jobName?: string;
  jobType?: JobType;
  jobSalaryRange?: string;
};

const STORAGE_KEY = "submittedCandidates";

const DEFAULT_JOB_INFO = {
  id: "default-job",
  jobName: "Front End Developer",
  jobType: "full-time" as JobType,
  jobSalaryRange: "Rp.7.000.000 - Rp.15.000.000",
};

const DEFAULT_CANDIDATES: Candidate[] = [
  {
    name: "Aurelie Yukiko",
    email: "aurelieyukiko@yahoo.com",
    phone: "082120908766",
    dob: "30 January 2001",
    domicile: "Jakarta",
    gender: "Female",
    linkedin: "https://www.linkedin.com/in/user1",
    jobId: DEFAULT_JOB_INFO.id,
    jobName: DEFAULT_JOB_INFO.jobName,
    jobType: DEFAULT_JOB_INFO.jobType,
    jobSalaryRange: DEFAULT_JOB_INFO.jobSalaryRange,
  },
  {
    name: "Dityo Hendyawan",
    email: "dityohendyawan@yahoo.com",
    phone: "081184180678",
    dob: "30 January 2001",
    domicile: "Jakarta",
    gender: "Female",
    linkedin: "https://www.linkedin.com/in/user2",
    jobId: DEFAULT_JOB_INFO.id,
    jobName: DEFAULT_JOB_INFO.jobName,
    jobType: DEFAULT_JOB_INFO.jobType,
    jobSalaryRange: DEFAULT_JOB_INFO.jobSalaryRange,
  },
  {
    name: "Mira Workman",
    email: "miraworkman@yahoo.com",
    phone: "081672007108",
    dob: "30 January 2001",
    domicile: "Jakarta",
    gender: "Female",
    linkedin: "https://www.linkedin.com/in/user3",
    jobId: DEFAULT_JOB_INFO.id,
    jobName: DEFAULT_JOB_INFO.jobName,
    jobType: DEFAULT_JOB_INFO.jobType,
    jobSalaryRange: DEFAULT_JOB_INFO.jobSalaryRange,
  },
  {
    name: "Paityn Culhane",
    email: "paitynculhane@yahoo.com",
    phone: "081521500714",
    dob: "30 January 2001",
    domicile: "Jakarta",
    gender: "Male",
    linkedin: "https://www.linkedin.com/in/user4",
    jobId: DEFAULT_JOB_INFO.id,
    jobName: DEFAULT_JOB_INFO.jobName,
    jobType: DEFAULT_JOB_INFO.jobType,
    jobSalaryRange: DEFAULT_JOB_INFO.jobSalaryRange,
  },
  {
    name: "Emerson Baptista",
    email: "emersonbaptista@yahoo.com",
    phone: "082167008244",
    dob: "30 January 2001",
    domicile: "Jakarta",
    gender: "Male",
    linkedin: "https://www.linkedin.com/in/user5",
    jobId: DEFAULT_JOB_INFO.id,
    jobName: DEFAULT_JOB_INFO.jobName,
    jobType: DEFAULT_JOB_INFO.jobType,
    jobSalaryRange: DEFAULT_JOB_INFO.jobSalaryRange,
  },
];

const formatJobType = (type?: JobType) => {
  if (!type) return "Full-time";
  const label = type.replace("-", " ");
  return label.charAt(0).toUpperCase() + label.slice(1);
};

const composeSalaryRange = (min: string, max: string) => {
  const cleanse = (value: string) => {
    const numeric = value.replace(/[^\d]/g, "");
    if (!numeric) return value.trim();
    return Number(numeric).toLocaleString("id-ID");
  };

  const formattedMin = cleanse(min);
  const formattedMax = cleanse(max);

  if (!formattedMin || !formattedMax) {
    return DEFAULT_JOB_INFO.jobSalaryRange;
  }

  return `Rp.${formattedMin} - Rp.${formattedMax}`;
};

const normaliseCandidate = (candidate: any): Candidate | null => {
  if (!candidate) return null;
  if (
    typeof candidate.name !== "string" ||
    typeof candidate.email !== "string" ||
    typeof candidate.phone !== "string" ||
    typeof candidate.dob !== "string" ||
    typeof candidate.domicile !== "string" ||
    typeof candidate.gender !== "string" ||
    typeof candidate.linkedin !== "string"
  ) {
    return null;
  }

  const jobName = typeof candidate.jobName === "string" && candidate.jobName.trim().length > 0
    ? candidate.jobName
    : DEFAULT_JOB_INFO.jobName;

  const jobSalaryRange = typeof candidate.jobSalaryRange === "string" && candidate.jobSalaryRange.trim().length > 0
    ? candidate.jobSalaryRange
    : DEFAULT_JOB_INFO.jobSalaryRange;

  const jobType =
    typeof candidate.jobType === "string" && [
      "full-time",
      "contract",
      "part-time",
      "internship",
      "freelance",
    ].includes(candidate.jobType)
      ? (candidate.jobType as JobType)
      : DEFAULT_JOB_INFO.jobType;

  return {
    name: candidate.name,
    email: candidate.email,
    phone: candidate.phone,
    dob: candidate.dob,
    domicile: candidate.domicile,
    gender: candidate.gender,
    linkedin: candidate.linkedin,
    jobId: typeof candidate.jobId === "string" ? candidate.jobId : DEFAULT_JOB_INFO.id,
    jobName,
    jobType,
    jobSalaryRange,
  };
};

function ManageJobComponent() {
  const searchParams = useSearchParams();
  const jobIdFilter = searchParams.get("id");
  const { jobs } = useJobs();
  const [candidates, setCandidates] = useState<Candidate[]>(DEFAULT_CANDIDATES);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return;

      const sanitised = parsed
        .map(normaliseCandidate)
        .filter((candidate): candidate is Candidate => candidate !== null);

      if (sanitised.length === 0) return;

      setCandidates((prev) => {
        const merged = [...sanitised, ...prev];
        const unique = new Map<string, Candidate>();

        merged.forEach((candidate) => {
          const key = `${candidate.email}-${candidate.jobId ?? DEFAULT_JOB_INFO.id}`;
          if (!unique.has(key)) {
            unique.set(key, candidate);
          }
        });

        return Array.from(unique.values());
      });
    } catch (error) {
      console.error("Failed to load submitted candidates:", error);
    }
  }, []);

  const visibleCandidates = useMemo(() => {
    if (!jobIdFilter) {
      return candidates;
    }
    return candidates.filter((candidate) => (candidate.jobId ?? DEFAULT_JOB_INFO.id) === jobIdFilter);
  }, [candidates, jobIdFilter]);

  const candidateCountLabel = useMemo(() => {
    const count = visibleCandidates.length;
    return `${count} applied candidate${count === 1 ? "" : "s"}`;
  }, [visibleCandidates.length]);

  const jobHeaderInfo = useMemo(() => {
    if (!jobIdFilter) {
      return null;
    }

    const jobFromContext = jobs.find((job) => job.id === jobIdFilter);
    if (jobFromContext) {
      return {
        jobName: jobFromContext.jobName,
        subtitle: `${formatJobType(jobFromContext.jobType)} • ${composeSalaryRange(jobFromContext.minSalary, jobFromContext.maxSalary)}`,
      };
    }

    const candidateJob = candidates.find((candidate) => (candidate.jobId ?? DEFAULT_JOB_INFO.id) === jobIdFilter);
    if (candidateJob) {
      return {
        jobName: candidateJob.jobName ?? DEFAULT_JOB_INFO.jobName,
        subtitle: `${formatJobType(candidateJob.jobType)}${candidateJob.jobSalaryRange ? ` • ${candidateJob.jobSalaryRange}` : ""}`,
      };
    }

    return null;
  }, [jobIdFilter, jobs, candidates]);

  return (
    <>
      <nav className="bg-white flex border border-gray-200 w-full">
        <div className="flex w-full">
          <div className="flex flex-row w-full py-2 px-2 md:px-4">
            <div className="flex w-full flex-wrap gap-2">
              <a href="/admins" className="flex border border-gray-200 shadow-sm font-semibold text-black p-2 text-xs md:text-sm py-1 px-2 md:px-3 bg-white self-center rounded-lg">
                Job List
              </a>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 md:size-6 text-black self-center">
                <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
              <button className="flex border border-gray-300 text-black font-semibold p-2 text-xs md:text-sm py-1 px-2 md:px-3 bg-gray-200 self-center rounded-lg">
                Manage Candidate
              </button>
            </div>
            <div className="flex w-full md:w-auto justify-end">
              <img src="/avatar.png" alt="avatar" className="w-8 h-8 md:w-10 md:h-10 border rounded-full flex" />
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="p-2 md:p-4 border border-gray-200 rounded-md mx-2 md:mx-4 my-2 md:my-4">
          <div className="overflow-x-auto shadow-sm">
            <table className="w-full text-xs md:text-sm text-gray-700 min-w-[800px]">
              <thead className="bg-gray-50 text-gray-600 uppercase text-[11px] md:text-[13px]">
                <tr>
                  <th className="p-2 md:p-4 text-left">
                    <input
                      type="checkbox"
                      className="h-3 w-3 md:h-4 md:w-4 rounded accent-primary-main"
                      disabled
                    />
                  </th>
                  {!jobIdFilter && <th className="p-2 md:p-4 text-left font-semibold">Applied Job</th>}
                  <th className="p-2 md:p-4 text-left font-semibold">Nama Lengkap</th>
                  <th className="p-2 md:p-4 text-left font-semibold">Email Address</th>
                  <th className="p-2 md:p-4 text-left font-semibold">Phone Numbers</th>
                  <th className="p-2 md:p-4 text-left font-semibold">Date of Birth</th>
                  <th className="p-2 md:p-4 text-left font-semibold">Domicile</th>
                  <th className="p-2 md:p-4 text-left font-semibold">Gender</th>
                  <th className="p-2 md:p-4 text-left font-semibold">Link LinkedIn</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {visibleCandidates.map((person, index) => (
                  <tr key={`${person.email}-${person.jobId ?? index}`} className="hover:bg-gray-50 transition-colors">
                    <td className="p-2 md:p-4">
                      <input
                        type="checkbox"
                        className="h-3 w-3 md:h-4 md:w-4 rounded accent-primary-main"
                        disabled
                      />
                    </td>
                    {!jobIdFilter && (
                      <td className="p-2 md:p-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900 text-xs md:text-sm">
                            {person.jobName ?? DEFAULT_JOB_INFO.jobName}
                          </span>
                          <span className="text-[10px] md:text-xs text-gray-500">
                            {formatJobType(person.jobType)}
                            {person.jobSalaryRange ? ` • ${person.jobSalaryRange}` : ""}
                          </span>
                        </div>
                      </td>
                    )}
                    <td className="p-2 md:p-4 font-medium text-xs md:text-sm">{person.name}</td>
                    <td className="p-2 md:p-4 truncate max-w-[120px] md:max-w-[180px] text-xs md:text-sm">{person.email}</td>
                    <td className="p-2 md:p-4 text-xs md:text-sm">{person.phone}</td>
                    <td className="p-2 md:p-4 text-xs md:text-sm">{person.dob}</td>
                    <td className="p-2 md:p-4 text-xs md:text-sm">{person.domicile}</td>
                    <td className="p-2 md:p-4 text-xs md:text-sm">{person.gender}</td>
                    <td className="p-2 md:p-4 text-teal-600 underline text-xs md:text-sm">
                      <a
                        href={person.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-teal-700 break-all"
                      >
                        {person.linkedin}
                      </a>
                    </td>
                  </tr>
                ))}
                {visibleCandidates.length === 0 && (
                  <tr>
                    <td colSpan={jobIdFilter ? 8 : 9} className="p-6 text-center text-xs md:text-sm text-gray-500">
                      No candidates have applied for this job yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      </>
  );
}

export default function ManageJob() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ManageJobComponent />
    </Suspense>
  );
}