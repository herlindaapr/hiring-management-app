"use client";

import { useState, FormEvent } from "react";
import { useJobs, getDefaultProfileRequirements } from "../context/JobContext";
import { useToast } from "../context/ToastContext";
import { ProfileRequirement } from "../types/index.types";

interface ApplyFormModalsProps {
  onClose: () => void;
}

export default function ApplyFormModals({ onClose }: ApplyFormModalsProps) {
  const { addJob } = useJobs();
  const { showToast } = useToast();
  
  // Form state
  const [jobName, setJobName] = useState("");
  const [jobType, setJobType] = useState<"full-time" | "contract" | "part-time" | "internship" | "freelance">("full-time");
  const [jobDescription, setJobDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  const formatToIDR = (value: string): string => {
    // Remove all non-digit characters
    const numeric = value.replace(/[^\d]/g, "");
    if (!numeric) return "";
    
    // Format with dots as thousand separators
    return Number(numeric).toLocaleString("id-ID");
  };

  // Remove formatting and get numeric value
  const removeFormatting = (value: string): string => {
    return value.replace(/[^\d]/g, "");
  };

  // Handle salary input change with formatting
  const handleSalaryChange = (value: string, setter: (value: string) => void) => {
    const formatted = formatToIDR(value);
    setter(formatted);
  };
  
  // Profile requirements state
  const [profileRequirements, setProfileRequirements] = useState<Record<string, ProfileRequirement>>({
    fullName: "mandatory",
    photoProfile: "mandatory",
    gender: "mandatory",
    domicile: "mandatory",
    email: "mandatory",
    phoneNumber: "mandatory",
    linkedinLink: "mandatory",
    dateOfBirth: "mandatory",
  });

  const handleRequirementChange = (field: string, value: ProfileRequirement) => {
    setProfileRequirements((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate required fields
    if (!jobName || !jobDescription || !quantity || !minSalary || !maxSalary) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    try {
      // Convert profile requirements to the correct format
      const requirements = {
        fullName: profileRequirements.fullName,
        photoProfile: profileRequirements.photoProfile,
        gender: profileRequirements.gender,
        domicile: profileRequirements.domicile,
        email: profileRequirements.email,
        phoneNumber: profileRequirements.phoneNumber,
        linkedinLink: profileRequirements.linkedinLink,
        dateOfBirth: profileRequirements.dateOfBirth,
      };

      // Add job to context (remove formatting from salaries before storing)
      addJob({
        jobName,
        jobType,
        jobDescription,
        quantity: parseInt(quantity, 10),
        minSalary: removeFormatting(minSalary),
        maxSalary: removeFormatting(maxSalary),
        profileRequirements: requirements,
      });

      // Show success toast
      showToast(`Job vacancy successfully created!`, "success");

      // Close modal
      onClose();

      // Reset form
      setJobName("");
      setJobType("full-time");
      setJobDescription("");
      setQuantity("");
      setMinSalary("");
      setMaxSalary("");
      setProfileRequirements(getDefaultProfileRequirements());
    } catch (error) {
      console.error("Failed to publish job:", error);
      showToast("Failed to publish job. Please try again.", "error");
    }
  };

  const RequirementButton = ({ 
    field, 
    value, 
    label 
  }: { 
    field: string; 
    value: ProfileRequirement; 
    label: string;
  }) => {
    const isSelected = profileRequirements[field] === value;
    const isDisabled = value === "optional" || value === "off";
    
    return (
      <button
        type="button"
        onClick={() => handleRequirementChange(field, value)}
        className={`border rounded-full py-1 px-2 ${
          isSelected
            ? "text-primary-main border-primary-border"
            : isDisabled
            ? "bg-gray-200 text-gray-400 border-gray-300"
            : "text-black border-gray-400 hover:cursor-pointer"
        } ${!isDisabled && !isSelected ? "hover:bg-gray-50" : ""}`}
        disabled={isDisabled && !isSelected}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4">
      <div className="fixed inset-0 bg-black/40" onClick={onClose}></div>
      <form 
        onSubmit={handleSubmit}
        className="relative flex flex-col w-full max-w-2xl bg-white text-black justify-self-center my-4 md:my-10 h-[90vh] max-h-[90vh] overflow-y-auto no-scrollbar rounded-lg z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex border-b border-b-gray-200">
          <h1 className="w-1/2 flex py-3 md:py-4 px-4 md:px-6 font-bold text-sm md:text-base">Job Opening</h1>
          <div className="w-1/2 flex flex-col justify-center">
            <button 
              type="button" 
              className="text-black self-end px-3 md:px-4 hover:cursor-pointer" 
              onClick={onClose}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="w-full px-4 md:px-6 text-xs h-full overflow-auto no-scrollbar py-4">
          <label htmlFor="jobname">Job Name<span className="text-red-500">*</span></label>
          <input 
            type="text" 
            id="jobname" 
            name="jobname" 
            placeholder="Ex. Front End Engineer" 
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
            className="bg-white border-2 border-gray-300 w-full py-2 mt-2 mb-4 px-2 text-sm rounded-lg placeholder:text-gray-950/30 focus:ring-(--color-primary-focus) focus:border-(--color-primary-main) focus:outline-none" 
            required 
          />
          
          <label htmlFor="jobtype">Job Type<span className="text-red-500">*</span></label>
          <select 
            id="jobtype" 
            name="jobtype" 
            value={jobType}
            onChange={(e) => setJobType(e.target.value as any)}
            className="bg-white border-2 border-gray-300 w-full py-2 mt-2 mb-4 px-2 text-sm rounded-lg font-bold placeholder:text-gray-950/30 focus:ring-(--color-primary-focus) focus:border-(--color-primary-main) focus:outline-none" 
            required
          >
            <option value="full-time">Full-time</option>
            <option value="contract">Contract</option>
            <option value="part-time">Part-time</option>
            <option value="internship">Internship</option>
            <option value="freelance">Freelance</option>
          </select>

          <label htmlFor="jobdesc">Job Description<span className="text-red-500">*</span></label>
          <textarea 
            id="jobdesc" 
            name="jobdesc" 
            placeholder="Ex. Job description here..." 
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={4}
            className="bg-white border-2 border-gray-300 w-full py-2 mt-2 mb-4 px-2 text-sm rounded-lg placeholder:text-gray-950/30 focus:ring-(--color-primary-focus) focus:border-(--color-primary-main) focus:outline-none resize-none" 
            required 
          />
          
          <label htmlFor="quantity">Number of Candidate Needed<span className="text-red-500">*</span></label>
          <input 
            type="number" 
            id="quantity" 
            name="quantity" 
            placeholder="Ex. 2" 
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            className="bg-white border-2 border-gray-300 w-full py-2 mt-2 mb-4 px-2 text-sm rounded-lg placeholder:text-gray-950/30 focus:ring-(--color-primary-focus) focus:border-(--color-primary-main) focus:outline-none" 
            required 
          />
          
          <hr className="custom-dashed-line w-full py-2 mb-2" />

          <span className="py-2">Job Salary</span>
          <div className="flex flex-col sm:flex-row items-end gap-3 py-4">
            <div className="flex-1 flex flex-col w-full">
              <label className="text-xs text-gray-600 mb-2">Minimum Estimated Salary</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 font-semibold text-xs md:text-sm">Rp</span>
                <input 
                  type="text" 
                  placeholder="7.000.000" 
                  value={minSalary}
                  onChange={(e) => handleSalaryChange(e.target.value, setMinSalary)}
                  className="w-full border-2 border-gray-300 rounded-md py-2 pl-9 md:pl-10 pr-3 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            <span className="text-gray-400 mb-3 hidden sm:block">—</span>

            <div className="flex-1 flex flex-col w-full">
              <label className="text-xs text-gray-600 mb-2">Maximum Estimated Salary</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 font-semibold text-xs md:text-sm">Rp</span>
                <input
                  type="text"
                  placeholder="8.000.000"
                  value={maxSalary}
                  onChange={(e) => handleSalaryChange(e.target.value, setMaxSalary)}
                  className="w-full border-2 border-gray-300 rounded-md py-2 pl-9 md:pl-10 pr-3 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full border border-gray-200 px-3 md:px-4 py-4 rounded-lg space-y-3">
            <p className="flex font-bold text-xs md:text-sm mb-4 md:mb-8">Minimum Profile Information Required</p>
            
            <div className="flex flex-col sm:flex-row px-2 border-gray-200 gap-2 sm:gap-0">
              <p className="w-full sm:w-2/3 text-xs md:text-sm text-gray-500 self-center ml-0 sm:ml-2">Full Name</p>
              <div className="flex flex-row w-full sm:w-1/3 space-x-2 sm:justify-end">
                <RequirementButton field="fullName" value="mandatory" label="Mandatory" />
                <RequirementButton field="fullName" value="optional" label="Optional" />
                <RequirementButton field="fullName" value="off" label="Off" />
              </div>
            </div>

            <hr className="text-gray-200" />

            <div className="flex flex-col sm:flex-row px-2 border-gray-200 gap-2 sm:gap-0">
              <p className="w-full sm:w-2/3 text-xs md:text-sm text-gray-500 self-center ml-0 sm:ml-2">Photo Profile</p>
              <div className="flex flex-row w-full sm:w-1/3 space-x-2 sm:justify-end">
                <RequirementButton field="photoProfile" value="mandatory" label="Mandatory" />
                <RequirementButton field="photoProfile" value="optional" label="Optional" />
                <RequirementButton field="photoProfile" value="off" label="Off" />
              </div>
            </div>

            <hr className="text-gray-200" />

            <div className="flex flex-col sm:flex-row px-2 border-gray-200 gap-2 sm:gap-0">
              <p className="w-full sm:w-2/3 text-xs md:text-sm text-gray-500 self-center ml-0 sm:ml-2">Gender</p>
              <div className="flex flex-row w-full sm:w-1/3 space-x-2 sm:justify-end">
                <RequirementButton field="gender" value="mandatory" label="Mandatory" />
                <RequirementButton field="gender" value="optional" label="Optional" />
                <RequirementButton field="gender" value="off" label="Off" />
              </div>
            </div>

            <hr className="text-gray-200" />

            <div className="flex flex-col sm:flex-row px-2 border-gray-200 gap-2 sm:gap-0">
              <p className="w-full sm:w-2/3 text-xs md:text-sm text-gray-500 self-center ml-0 sm:ml-2">Domicile</p>
              <div className="flex flex-row w-full sm:w-1/3 space-x-2 sm:justify-end">
                <RequirementButton field="domicile" value="mandatory" label="Mandatory" />
                <RequirementButton field="domicile" value="optional" label="Optional" />
                <RequirementButton field="domicile" value="off" label="Off" />
              </div>
            </div>

            <hr className="text-gray-200" />

            <div className="flex flex-col sm:flex-row px-2 border-gray-200 gap-2 sm:gap-0">
              <p className="w-full sm:w-2/3 text-xs md:text-sm text-gray-500 self-center ml-0 sm:ml-2">Email</p>
              <div className="flex flex-row w-full sm:w-1/3 space-x-2 sm:justify-end">
                <RequirementButton field="email" value="mandatory" label="Mandatory" />
                <RequirementButton field="email" value="optional" label="Optional" />
                <RequirementButton field="email" value="off" label="Off" />
              </div>
            </div>

            <hr className="text-gray-200" />

            <div className="flex flex-col sm:flex-row px-2 border-gray-200 gap-2 sm:gap-0">
              <p className="w-full sm:w-2/3 text-xs md:text-sm text-gray-500 self-center ml-0 sm:ml-2">Phone number</p>
              <div className="flex flex-row w-full sm:w-1/3 space-x-2 sm:justify-end">
                <RequirementButton field="phoneNumber" value="mandatory" label="Mandatory" />
                <RequirementButton field="phoneNumber" value="optional" label="Optional" />
                <RequirementButton field="phoneNumber" value="off" label="Off" />
              </div>
            </div>

            <hr className="text-gray-200" />

            <div className="flex flex-col sm:flex-row px-2 border-gray-200 gap-2 sm:gap-0">
              <p className="w-full sm:w-2/3 text-xs md:text-sm text-gray-500 self-center ml-0 sm:ml-2">Linkedin link</p>
              <div className="flex flex-row w-full sm:w-1/3 space-x-2 sm:justify-end">
                <RequirementButton field="linkedinLink" value="mandatory" label="Mandatory" />
                <RequirementButton field="linkedinLink" value="optional" label="Optional" />
                <RequirementButton field="linkedinLink" value="off" label="Off" />
              </div>
            </div>

            <hr className="text-gray-200" />

            <div className="flex flex-col sm:flex-row px-2 gap-2 sm:gap-0">
              <p className="w-full sm:w-2/3 text-xs md:text-sm text-gray-500 self-center ml-0 sm:ml-2">Date of Birth</p>
              <div className="flex flex-row w-full sm:w-1/3 space-x-2 sm:justify-end">
                <RequirementButton field="dateOfBirth" value="mandatory" label="Mandatory" />
                <RequirementButton field="dateOfBirth" value="optional" label="Optional" />
                <RequirementButton field="dateOfBirth" value="off" label="Off" />
              </div>
            </div>
          </div>
        </div>
        
        {/* SUBMIT BUTTON */}
        <div className="flex justify-end bg-white h-max w-full content-center justify-items-center border-t border-gray-200 py-3 md:py-4">
          <button 
            type="submit" 
            className="flex bg-primary-main text-xs md:text-sm py-1.5 md:py-1 px-4 md:px-3 mx-4 md:mx-6 font-semibold rounded-lg justify-center self-center text-white hover:bg-primary-hover hover:cursor-pointer"
          >
            Publish job
          </button>
        </div>
      </form>
    </div>
  );
}
