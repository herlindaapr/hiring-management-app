"use client";

import { FormEvent, useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DatePicker from "@/app/components/DatePicker";
import PhoneInput, { PhoneValue } from "@/app/components/PhoneInput";
import DomicileList from "@/app/components/DomicileList";
import { useJobs } from "@/app/context/JobContext";
import type { Job, JobType } from "@/app/types/index.types";
import { Suspense } from 'react';

const DEFAULT_JOB: Pick<Job, "id" | "jobName" | "jobType" | "minSalary" | "maxSalary"> = {
  id: "default-job",
  jobName: "UX Designer",
  jobType: "full-time",
  minSalary: "7.000.000",
  maxSalary: "15.000.000",
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
    return "Rp.7.000.000 - Rp.15.000.000";
  }

  return `Rp.${formattedMin} - Rp.${formattedMax}`;
};

const formatJobTypeLabel = (type: JobType) => {
  const label = type.replace("-", " ");
  return label.charAt(0).toUpperCase() + label.slice(1);
};

function ApplyJobComponent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { jobs } = useJobs();
    const [fullName, setFullName] = useState("");
    const [dob, setDob] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [domicile, setDomicile] = useState<string>("");
    const [phone, setPhone] = useState<PhoneValue>({
        dialCode: "+62",
        number: "",
        countryCode: "ID",
    });
    const [email, setEmail] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [error, setError] = useState<string | null>(null);

    const jobId = searchParams.get("jobId") ?? DEFAULT_JOB.id;

    const jobDetails = useMemo(() => {
        if (jobId === DEFAULT_JOB.id) {
            return DEFAULT_JOB;
        }

        const found = jobs.find((job) => job.id === jobId);
        if (!found) {
            return {
                ...DEFAULT_JOB,
                id: jobId,
            };
        }

        return {
            id: found.id,
            jobName: found.jobName,
            jobType: found.jobType,
            minSalary: found.minSalary,
            maxSalary: found.maxSalary,
        } satisfies Pick<Job, "id" | "jobName" | "jobType" | "minSalary" | "maxSalary">;
    }, [jobId, jobs]);

    const jobSalaryRange = composeSalaryRange(jobDetails.minSalary, jobDetails.maxSalary);
    const jobTypeLabel = formatJobTypeLabel(jobDetails.jobType);

    const formatDOB = useCallback((value: string) => {
        if (!value) return "";
        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) {
            return value;
        }

        return parsed.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    }, []);

    const resetForm = () => {
        setFullName("");
        setDob("");
        setGender("");
        setDomicile("");
        setPhone({
            dialCode: "+62",
            number: "",
            countryCode: "ID",
        });
        setEmail("");
        setLinkedin("");
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!fullName || !dob || !gender || !domicile || !phone.number || !email || !linkedin) {
            setError("Please complete all required fields before submitting.");
            return;
        }

        const normalizedGender = gender === "female" ? "Female" : "Male";
        const formattedDob = formatDOB(dob);

        const newCandidate = {
            name: fullName,
            email,
            phone: `${phone.dialCode} ${phone.number}`.trim(),
            dob: formattedDob,
            domicile,
            gender: normalizedGender,
            linkedin,
            jobId: jobDetails.id,
            jobName: jobDetails.jobName,
            jobType: jobDetails.jobType,
            jobSalaryRange: jobSalaryRange,
        };

        try {
            if (typeof window !== "undefined") {
                const existing = window.localStorage.getItem("submittedCandidates");
                const parsed = existing ? JSON.parse(existing) : [];
                const updated = Array.isArray(parsed) ? [...parsed, newCandidate] : [newCandidate];
                window.localStorage.setItem("submittedCandidates", JSON.stringify(updated));
            }
            setError(null);
            resetForm();
            router.push("/admins/manage-job");
        } catch (storageError) {
            console.error("Failed to persist candidate data:", storageError);
            setError("Failed to save your application. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative flex flex-col  w-1/2 bg-white text-black justify-self-center py-12 h-screen overflow-y-auto no-scrollbar">
            <div className="border border-gray-100 pb-12">
                <div className="w-full flex flex-row h-max">
                    <div className="flex flex-row w-1/2 items-center p-10 ">
                        <button type="button" onClick={() => router.push("/candidates")} className="border border-gray-200 shadow-sm rounded-lg p-1 hover:cursor-pointer hover:shadow-(--color-primary-hover)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                        <p className="font-bold text-base px-4">Apply {jobDetails.jobName} at Rakamin</p>
                    </div>
                    <div className="flex w-1/2 items-center p-10">
                        <p className="ml-auto font-extralight text-sm">ℹ️ This field required to fill</p>
                    </div>
                </div>

                <div className="flex w-full px-18">
                    <p className="text-red-600 text-xs font-bold">*Required</p>
                </div>

                <div className="px-18 py-4">
                    <p className="text-xs font-semibold">Photo Profile</p>
                    <img src="/avatar-male.png" alt="avatar" className="w-32 py-2" />
                    <button className="flex flex-row border border-gray-200 shadow-sm rounded-lg py-1.5 px-4 font-extrabold">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path d="M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0l-4.25 4.5a.75.75 0 1 0 1.09 1.03L9.25 4.636v8.614Z" />
                            <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                        </svg>
                        <p className="text-sm px-1">Take a Picture</p>
                    </button>
                </div>

            {/*  INPUT */}
                <div className="w-full px-18 pb-10 text-sm">
                    <label htmlFor="fullname">Full name<span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        placeholder="Enter your full name"
                        className="bg-white border-2 border-gray-300 w-full py-2 mt-2 mb-4 px-2 rounded-lg placeholder:text-gray-950/30 focus:ring-(--color-primary-focus) focus:border-(--color-primary-main) focus:outline-none"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        required
                    />
                    <DatePicker name="dob" value={dob} onChange={setDob} required />
                    <label htmlFor="gender">Pronoun (gender)<span className="text-red-500">*</span></label> <br/>
                    <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
                        className="mt-2 text-base accent-(--color-primary-focus)"
                        checked={gender === "female"}
                        onChange={(event) => setGender(event.target.value)}
                    />
                    <label htmlFor="female" className="ml-2 text-base">She/her (Female)</label>
                    <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
                        className="ml-6 mb-4 text-base accent-(--color-primary-focus)"
                        checked={gender === "male"}
                        onChange={(event) => setGender(event.target.value)}
                    />
                    <label htmlFor="male" className="ml-2 text-base">He/him (Male)</label> <br/>
                    <DomicileList name="domicile" value={domicile} onChange={setDomicile} required />
                    <PhoneInput name="phone" value={phone} onChange={setPhone} required />
                    <label htmlFor="email">Email<span className="text-red-500">*</span></label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email address"
                        className="bg-white border-2 border-gray-300 w-full py-2 mt-2 mb-4 px-2 rounded-lg placeholder:text-gray-950/30 focus:ring-(--color-primary-focus) focus:border-(--color-primary-main) focus:outline-none"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                    <label htmlFor="linkedin">Link Linkedin<span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        id="linkedin"
                        name="linkedin"
                        placeholder="https://linkedin.com/in/username"
                        className="bg-white border-2 border-gray-300 w-full py-2 mt-2 mb-4 px-2 rounded-lg placeholder:text-gray-950/30 focus:ring-(--color-primary-focus) focus:border-(--color-primary-main) focus:outline-none"
                        value={linkedin}
                        onChange={(event) => setLinkedin(event.target.value)}
                        required
                    />
                    {error && (
                        <p className="text-red-500 text-xs font-medium">{error}</p>
                    )}
                </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="bg-white fixed bottom-0 h-max py-10 w-1/2 content-center justify-items-center border-t border-gray-200">
                <button type="submit" className="flex w-5/6 bg-(--color-primary-main) py-2 px-8 rounded-lg justify-center self-center text-white hover:cursor-pointer hover:bg-(--color-primary-hover)">Submit</button>
            </div>  
        </form>
    )
}

export default function ApplyJob() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApplyJobComponent />
    </Suspense>
  );
}