export default function ApplyFormModals({ onClose }: { onClose: () => void }) {
    return (
        <form className="relative flex flex-col w-1/2 bg-white text-black justify-self-center my-10 h-[90vh] overflow-y-auto no-scrollbar rounded-lg">
            <div className="w-full flex border-b border-b-gray-200">
                <h1 className="w-1/2 flex py-4 px-6 font-bold">Job Opening</h1>
                <div className="w-1/2 flex flex-col justify-center">
                    <button type="button" className="text-black self-end px-4 hover:cursor-pointer" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="w-full px-6 text-xs h-full overflow-auto no-scrollbar py-4">
                <label htmlFor="jobname">Job Name<span className="text-red-500">*</span></label>
                <input type="text" id="jobname" name="jobname" placeholder="Ex. Front End Engineer" className="bg-white border-2 border-gray-300 w-full py-2 mt-2 mb-4 px-2 text-sm rounded-lg placeholder:text-gray-950/30 focus:ring-(--color-primary-focus) focus:border-(--color-primary-main) focus:outline-none" required />
                
                <label htmlFor="jobtype">Job Type<span className="text-red-500">*</span></label>
                    <select id="jobtype" name="jobtype" className="bg-white border-2 border-gray-300 w-full py-2 mt-2 mb-4 px-2 text-sm rounded-lg font-bold placeholder:text-gray-950/30 focus:ring-(--color-primary-focus) focus:border-(--color-primary-main) focus:outline-none" required>
                        <option value="full-time">Full-time</option>
                        <option value="contract">Contract</option>
                        <option value="part-time">Part-time</option>
                        <option value="internship">Internship</option>
                        <option value="freelance">Freelance</option>
                    </select>

                <label htmlFor="jobdesc">Job Description<span className="text-red-500">*</span></label>
                <input type="text-area" id="jobdesc" name="jobdesc" placeholder="Ex. " className="bg-white border-2 border-gray-300 w-full py-2 mt-2 mb-4 px-2 text-sm rounded-lg placeholder:text-gray-950/30 focus:ring-(--color-primary-focus) focus:border-(--color-primary-main) focus:outline-none" required />
                
                <label htmlFor="quantity">Number of Candidate Needed<span className="text-red-500">*</span></label>
                <input type="text" id="quantity" name="quantity" placeholder="Ex. 2" className="bg-white border-2 border-gray-300 w-full py-2 mt-2 mb-4 px-2 text-sm rounded-lg placeholder:text-gray-950/30 focus:ring-(--color-primary-focus) focus:border-(--color-primary-main) focus:outline-none" required />
                
                <hr className="custom-dashed-line w-full py-2 mb-2" />

                <span className="py-2">Job Salary</span>
                <div className="flex items-end gap-3 py-4">
                    <div className="flex-1 flex flex-col">
                        <label className="text-xs text-gray-600 mb-2">Minimum Estimated Salary</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 font-semibold">Rp</span>
                            <input type="text" placeholder="7.000.000" className="w-full border-2 border-gray-300 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"/>
                        </div>
                    </div>

                    <span className="text-gray-400 mb-3">—</span>

                    <div className="flex-1 flex flex-col">
                        <label className="text-xs text-gray-600 mb-2">Maximum Estimated Salary</label>
                        <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 font-semibold">Rp</span>
                        <input
                            type="text"
                            placeholder="8.000.000"
                            className="w-full border-2 border-gray-300 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                        />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-full border border-gray-200 px-4 py-4 rounded-lg space-y-3">
                    <p className="flex font-bold text-sm mb-8">Minimum Profile Information Required</p>
                    <div className="flex px-2 border-gray-200">
                        <p className="w-2/3 text-sm text-gray-500 self-center ml-2">Full Name</p>
                        <div className="flex flex-row w-1/3 space-x-2 justify-end">
                            <button className="border rounded-full py-1 px-2 text-primary-main border-primary-border hover:cursor-pointer">Mandatory</button>
                            <button className="border rounded-full py-1 px-2 bg-gray-200 text-gray-400 border-gray-300" disabled>Optional</button>
                            <button className="border rounded-full py-1 px-2 bg-gray-200 text-gray-400 border-gray-300" disabled>Off</button>
                        </div>
                    </div>

                    <hr className="text-gray-200" />

                    <div className="flex px-2 border-gray-200">
                        <p className="w-2/3 text-sm text-gray-500 self-center ml-2">Photo Profile</p>
                        <div className="flex flex-row w-1/3 space-x-2 justify-end">
                            <button className="border rounded-full py-1 px-2 text-primary-main border-primary-border hover:cursor-pointer">Mandatory</button>
                            <button className="border rounded-full py-1 px-2 bg-gray-200 text-gray-400 border-gray-300" disabled>Optional</button>
                            <button className="border rounded-full py-1 px-2 bg-gray-200 text-gray-400 border-gray-300" disabled>Off</button>
                        </div>
                    </div>

                    <hr className="text-gray-200" />

                    <div className="flex px-2 border-gray-200">
                        <p className="w-2/3 text-sm text-gray-500 self-center ml-2">Gender</p>
                        <div className="flex flex-row w-1/3 space-x-2 justify-end">
                            <button className="border rounded-full py-1 px-2 text-primary-main border-primary-border hover:cursor-pointer">Mandatory</button>
                            <button className="border rounded-full py-1 px-2 text-black border-gray-400 hover:cursor-pointer">Optional</button>
                            <button className="border rounded-full py-1 px-2 text-black border-gray-400 hover:cursor-pointer">Off</button>
                        </div>
                    </div>

                    <hr className="text-gray-200" />

                    <div className="flex px-2 border-gray-200">
                        <p className="w-2/3 text-sm text-gray-500 self-center ml-2">Domicile</p>
                        <div className="flex flex-row w-1/3 space-x-2 justify-end">
                            <button className="border rounded-full py-1 px-2 text-primary-main border-primary-border hover:cursor-pointer">Mandatory</button>
                            <button className="border rounded-full py-1 px-2 text-black border-gray-400 hover:cursor-pointer">Optional</button>
                            <button className="border rounded-full py-1 px-2 text-black border-gray-400 hover:cursor-pointer">Off</button>
                        </div>
                    </div>

                    <hr className="text-gray-200" />

                    <div className="flex px-2 border-gray-200">
                        <p className="w-2/3 text-sm text-gray-500 self-center ml-2">Email</p>
                        <div className="flex flex-row w-1/3 space-x-2 justify-end">
                            <button className="border rounded-full py-1 px-2 text-primary-main border-primary-border hover:cursor-pointer">Mandatory</button>
                            <button className="border rounded-full py-1 px-2 bg-gray-200 text-gray-400 border-gray-300">Optional</button>
                            <button className="border rounded-full py-1 px-2 bg-gray-200 text-gray-400 border-gray-300">Off</button>
                        </div>
                    </div>

                    <hr className="text-gray-200" />

                    <div className="flex px-2 border-gray-200">
                        <p className="w-2/3 text-sm text-gray-500 self-center ml-2">Phone number</p>
                        <div className="flex flex-row w-1/3 space-x-2 justify-end">
                            <button className="border rounded-full py-1 px-2 text-primary-main border-primary-border hover:cursor-pointer">Mandatory</button>
                            <button className="border rounded-full py-1 px-2 text-black border-gray-400 hover:cursor-pointer">Optional</button>
                            <button className="border rounded-full py-1 px-2 text-black border-gray-400 hover:cursor-pointer">Off</button>
                        </div>
                    </div>

                    <hr className="text-gray-200" />

                    <div className="flex px-2 border-gray-200">
                        <p className="w-2/3 text-sm text-gray-500 self-center ml-2">Likedin link</p>
                        <div className="flex flex-row w-1/3 space-x-2 justify-end">
                            <button className="border rounded-full py-1 px-2 text-primary-main border-primary-border hover:cursor-pointer">Mandatory</button>
                            <button className="border rounded-full py-1 px-2 text-black border-gray-400 hover:cursor-pointer">Optional</button>
                            <button className="border rounded-full py-1 px-2 text-black border-gray-400 hover:cursor-pointer">Off</button>
                        </div>
                    </div>

                    <hr className="text-gray-200" />

                    <div className="flex px-2">
                        <p className="w-2/3 text-sm text-gray-500 self-center ml-2">Date of Birth</p>
                        <div className="flex flex-row w-1/3 space-x-2 justify-end">
                            <button className="border rounded-full py-1 px-2 text-primary-main border-primary-border hover:cursor-pointer">Mandatory</button>
                            <button className="border rounded-full py-1 px-2 text-black border-gray-400 hover:cursor-pointer">Optional</button>
                            <button className="border rounded-full py-1 px-2 text-black border-gray-400 hover:cursor-pointer">Off</button>
                        </div>
                    </div>
                </div>    
            </div> 
            
            {/* SUBMIT BUTTON */}
            <div className="flex justify-end bg-white h-max w-full content-center justify-items-center border-t border-gray-200 py-4 hover:cursor-pointer">
                <button type="submit" className="flex bg-primary-main text-sm py-1 px-3 mx-6 font-semibold rounded-lg justify-center self-center text-white hover:bg-primary-hover">Publish job</button>
            </div> 
        </form>
    )
}