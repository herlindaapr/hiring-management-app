"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { useJobs } from "../context/JobContext";
import type { Job, JobType } from "../types/index.types";

const DEFAULT_JOB: Pick<Job, "jobName" | "jobType" | "minSalary" | "maxSalary"> = {
  jobName: "UX Designer",
  jobType: "full-time",
  minSalary: "7.000.000",
  maxSalary: "15.000.000",
};

const DEFAULT_DESCRIPTION =
  "Develop, test, and maintain responsive, high-performance web applications using modern front-end technologies.\nCollaborate with UI/UX designers to translate wireframes and prototypes into functional code.\nIntegrate front-end components with APIs and backend services.\nEnsure cross-browser compatibility and optimize applications for maximum speed and scalability.\nWrite clean, reusable, and maintainable code following best practices and coding standards.\nParticipate in code reviews, contributing to continuous improvement and knowledge sharing.\nTroubleshoot and debug issues to improve usability and overall application quality.\nStay updated with emerging front-end technologies and propose innovative solutions.\nCollaborate in Agile/Scrum ceremonies, contributing to sprint planning, estimation, and retrospectives.";

const formatJobType = (type: JobType) => {
  const label = type.replace("-", " ");
  return label.charAt(0).toUpperCase() + label.slice(1);
};

const cleanseSalary = (value: string) => {
  const numeric = value.replace(/[^\d]/g, "");
  if (!numeric) {
    return value.trim();
  }
  const formatted = Number(numeric).toLocaleString("id-ID");
  return formatted;
};

const composeSalaryRange = (job: Pick<Job, "minSalary" | "maxSalary">) => {
  const min = cleanseSalary(job.minSalary);
  const max = cleanseSalary(job.maxSalary);
  if (!min || !max) {
    return "Rp.7.000.000 - Rp.15.000.000";
  }

  return `Rp.${min} - Rp.${max}`;
};

export default function candidatesHome() {
  const router = useRouter();
  const { jobs } = useJobs();
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const sortedJobs = useMemo(() => {
    if (jobs.length === 0) {
      return [];
    }
    return [...jobs].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [jobs]);

  useEffect(() => {
    if (sortedJobs.length === 0) {
      setSelectedJobId(null);
      return;
    }
    setSelectedJobId((current) => current ?? sortedJobs[0]?.id ?? null);
  }, [sortedJobs]);

  const selectedJob =
    sortedJobs.find((job) => job.id === selectedJobId) ?? sortedJobs[0];

  const jobName = selectedJob?.jobName ?? DEFAULT_JOB.jobName;
  const jobType = selectedJob?.jobType ?? DEFAULT_JOB.jobType;
  const salaryRange = composeSalaryRange(selectedJob ?? DEFAULT_JOB);
  const jobDescription =
    selectedJob?.jobDescription?.trim().length
      ? selectedJob.jobDescription
      : DEFAULT_DESCRIPTION;

  const handleApply = () => {
    const selectedId = selectedJob?.id ?? "default-job";
    const params = new URLSearchParams({ jobId: selectedId });
    router.push(`/candidates/apply-job?${params.toString()}`);
  };

  return (
    <>
      <Navbar />
      <div className="flex w-full min-h-screen bg-white font-sans">
        <main className="flex flex-row w-full max-w-8xl py-10 px-16 gap-6">
          {/* Left Column */}
          <section className="flex flex-col w-2/5 h-[calc(100vh-120px)] gap-4">

            {/* Job Card List */}
            <div className="flex-1 overflow-y-auto pr-2">
              {sortedJobs.length === 0 ? (
                <div className="border border-dashed border-gray-200 rounded-lg p-4 text-center text-sm text-gray-500 bg-white">
                  Currently showing a sample role. Create a new job in the admin page to share openings with candidates.
                </div>
              ) : (
                <div className="flex flex-col gap-4 space-y-2">
                  {sortedJobs.map((job) => {
                    const isSelected =
                      job.id === selectedJob?.id ||
                      (!selectedJob && job === sortedJobs[0]);
                    return (
                      <button
                        key={job.id}
                        type="button"
                        onClick={() => setSelectedJobId(job.id)}
                        className="text-left"
                      >
                        <div
                          className={`bg-(--color-primary-surface) flex flex-col border-2 mr-4 rounded-xl transition ${
                            isSelected
                              ? "border-(--color-primary-main) shadow-md"
                              : "border-gray-200 hover:border-(--color-primary-border)"
                          }`}
                        >
                          <div className="w-full flex flex-row">
                            <div className="flex flex-col p-4">
                              <img
                                src="/rakamin-logo.jpg"
                                alt="logo rakamin"
                                className="w-12 h-12 border border-gray-200 rounded-lg"
                              />
                            </div>
                            <div className="text-black flex flex-col items-start justify-center pr-4">
                              <p className="text-black font-semibold text-sm md:text-base">
                                {job.jobName}
                              </p>
                              <p className="text-xs text-gray-500 pt-2">Rakamin</p>
                            </div>
                          </div>

                          <hr className="border-dashed border border-gray-200 mx-4" />

                          <div className="w-full flex flex-col p-4">
                            <div className="w-full flex flex-row">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-4 text-gray-600"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 1 1 6 0ZM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                />
                              </svg>
                              <p className="text-gray-500 px-2 text-sm">
                                Jakarta Selatan
                              </p>
                            </div>
                            <div className="w-full flex flex-row">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-4 text-gray-600"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                                />
                              </svg>
                              <p className="text-gray-500 px-2 text-sm">
                                {composeSalaryRange(job)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          {/* Right Column */}
          <section className="flex-1 flex flex-col border border-gray-100 p-6 rounded-lg">
            <div className="w-full flex flex-row">
              <div className="flex w-max">
                <img
                  src="/rakamin-logo.jpg"
                  alt="logo rakamin"
                  className="w-12 h-12 border border-gray-200 rounded-lg"
                />
              </div>
              <div className="text-black flex flex-col justify-center w-5/6 px-4">
                <p className="w-max flex bg-green-700 rounded-sm py-1 px-2 text-white justify-center text-xs">
                  {formatJobType(jobType)}
                </p>
                <p className="font-semibold pt-2">{jobName}</p>
                <p className="text-gray-500 text-sm">Rakamin</p>
              </div>
              <button
                onClick={handleApply}
                className="flex bg-amber-400 text-black rounded-lg py-1 px-3 h-max hover:cursor-pointer"
              >
                Apply
              </button>
            </div>

            <hr className="my-6" />

            <div className="w-full">
              <p className="text-black text-sm leading-relaxed whitespace-pre-line">
                {jobDescription}
              </p>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}