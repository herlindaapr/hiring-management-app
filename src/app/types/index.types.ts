export interface Province {
  code: string;
  name: string;
}

export interface Country {
  name: string;
  code: string;
  dial_code: string;
}

export type Role = "admin" | "user";

export interface User {
  id: string;
  email: string;
  name?: string;
  role: Role;
}

export type JobType = "full-time" | "contract" | "part-time" | "internship" | "freelance";
export type ProfileRequirement = "mandatory" | "optional" | "off";

export interface ProfileRequirements {
  fullName: ProfileRequirement;
  photoProfile: ProfileRequirement;
  gender: ProfileRequirement;
  domicile: ProfileRequirement;
  email: ProfileRequirement;
  phoneNumber: ProfileRequirement;
  linkedinLink: ProfileRequirement;
  dateOfBirth: ProfileRequirement;
}

export interface Job {
  id: string;
  jobName: string;
  jobType: JobType;
  jobDescription: string;
  quantity: number;
  minSalary: string;
  maxSalary: string;
  profileRequirements: ProfileRequirements;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface JobContextType {
  jobs: Job[];
  addJob: (job: Omit<Job, "id" | "createdAt" | "updatedAt" | "status">) => void;
  updateJob: (id: string, job: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  getJobById: (id: string) => Job | undefined;
}

