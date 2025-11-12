"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Job, JobContextType, ProfileRequirement } from "@/app/types/index.types";

const JobContext = createContext<JobContextType | undefined>(undefined);
const STORAGE_KEY = "hiring-apps-jobs";

// Default profile requirements
const defaultProfileRequirements = {
  fullName: "mandatory" as ProfileRequirement,
  photoProfile: "mandatory" as ProfileRequirement,
  gender: "mandatory" as ProfileRequirement,
  domicile: "mandatory" as ProfileRequirement,
  email: "mandatory" as ProfileRequirement,
  phoneNumber: "mandatory" as ProfileRequirement,
  linkedinLink: "mandatory" as ProfileRequirement,
  dateOfBirth: "mandatory" as ProfileRequirement,
};

export function JobProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([]);

  // Load jobs from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedJobs = localStorage.getItem(STORAGE_KEY);
      if (storedJobs) {
        try {
          setJobs(JSON.parse(storedJobs));
        } catch (error) {
          console.error("Error loading jobs from localStorage:", error);
          setJobs([]);
        }
      }
    }
  }, []);

  // Save jobs to localStorage whenever jobs change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    }
  }, [jobs]);

  const addJob = (jobData: Omit<Job, "id" | "createdAt" | "updatedAt" | "status">) => {
    const newJob: Job = {
      ...jobData,
      id: Date.now().toString(),
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setJobs((prevJobs) => [newJob, ...prevJobs]);
  };

  const updateJob = (id: string, jobData: Partial<Job>) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id
          ? { ...job, ...jobData, updatedAt: new Date().toISOString() }
          : job
      )
    );
  };

  const deleteJob = (id: string) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  const getJobById = (id: string) => {
    return jobs.find((job) => job.id === id);
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        addJob,
        updateJob,
        deleteJob,
        getJobById,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
}

// Helper function to get default profile requirements
export function getDefaultProfileRequirements() {
  return { ...defaultProfileRequirements };
}

