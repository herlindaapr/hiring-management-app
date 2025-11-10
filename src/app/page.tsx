

export default function Home() {
  return (
        <form className="relative flex flex-col  w-1/2 bg-white text-black justify-self-center py-20 h-screen overflow-y-auto no-scrollbar">
        <div className="w-full px-18 text-xs">
            <label htmlFor="jobname">Job Name<span className="text-red-500">*</span></label>
            <input type="text" id="jobname" name="jobname" placeholder="Ex. Front End Engineer" className="bg-white border-2 border-gray-300 w-full py-2 mt-2 mb-4 px-2 text-sm rounded-lg placeholder:text-gray-950/30 focus:ring-(--color-primary-focus) focus:border-(--color-primary-main) focus:outline-none" required />
            <label htmlFor="jobtype">Job Type<span className="text-red-500">*</span></label>
            <input type="text" id="jobtype" name="jobtype" placeholder="Select job type" className="bg-white border-2 border-gray-300 w-full py-2 mt-2 mb-4 px-2 text-sm rounded-lg placeholder:text-gray-950/30 focus:ring-(--color-primary-focus) focus:border-(--color-primary-main) focus:outline-none" required />
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

            <div className="flex flex-col w-full border border-gray-200 p-4 rounded-lg">
                <p className="flex font-bold text-sm mb-2">Minimum Profile Information Required</p>
                <div className="flex py-3 px-4 border-gray-200">
                    <p className="w-2/3 text-sm text-gray-500">Full Name</p>
                    <div className="flex flex-row w-1/3 space-x-2 hover:cursor-pointer">
                        <button className="border rounded-full py-1 px-2 text-primary-main border-primary-border">Mandatory</button>
                        <button className="border rounded-full py-1 px-2 text-black border-gray-400">Optional</button>
                        <button className="border rounded-full py-1 px-2 text-black border-gray-400">Off</button>
                    </div>
                </div>
                <hr className="text-gray-200" />
                <div className="flex py-3 px-4 border-gray-200">
                    <p className="w-2/3 text-sm text-gray-500">Photo Profile</p>
                    <div className="flex flex-row w-1/3 space-x-2 hover:cursor-pointer">
                        <button className="border rounded-full py-1 px-2 text-primary-main border-primary-border">Mandatory</button>
                        <button className="border rounded-full py-1 px-2 text-black border-gray-400">Optional</button>
                        <button className="border rounded-full py-1 px-2 text-black border-gray-400">Off</button>
                    </div>
                </div>
                <hr className="text-gray-200" />
                <div className="flex py-3 px-4 border-gray-200">
                    <p className="w-2/3 text-sm text-gray-500">Gender</p>
                    <div className="flex flex-row w-1/3 space-x-2 hover:cursor-pointer">
                        <button className="border rounded-full py-1 px-2 text-primary-main border-primary-border">Mandatory</button>
                        <button className="border rounded-full py-1 px-2 text-black border-gray-400">Optional</button>
                        <button className="border rounded-full py-1 px-2 text-black border-gray-400">Off</button>
                    </div>
                </div>
                <hr className="text-gray-200" />
                <div className="flex py-3 px-4 border-gray-200">
                    <p className="w-2/3 text-sm text-gray-500">Domicile</p>
                    <div className="flex flex-row w-1/3 space-x-2 hover:cursor-pointer">
                        <button className="border rounded-full py-1 px-2 text-primary-main border-primary-border">Mandatory</button>
                        <button className="border rounded-full py-1 px-2 text-black border-gray-400">Optional</button>
                        <button className="border rounded-full py-1 px-2 text-black border-gray-400">Off</button>
                    </div>
                </div>
                <hr className="text-gray-200" />
                <div className="flex py-3 px-4 border-gray-200">
                    <p className="w-2/3 text-sm text-gray-500">Email</p>
                    <div className="flex flex-row w-1/3 space-x-2 hover:cursor-pointer">
                        <button className="border rounded-full py-1 px-2 text-primary-main border-primary-border">Mandatory</button>
                        <button className="border rounded-full py-1 px-2 text-black border-gray-400 disabled:">Optional</button>
                        <button className="border rounded-full py-1 px-2 text-black border-gray-400 disabled:">Off</button>
                    </div>
                </div>
                <hr className="text-gray-200" />
                <div className="flex py-3 px-4 border-gray-200">
                    <p className="w-2/3 text-sm text-gray-500">Phone number</p>
                    <div className="flex flex-row w-1/3 space-x-2 hover:cursor-pointer">
                        <button className="border rounded-full py-1 px-2 text-primary-main border-primary-border">Mandatory</button>
                        <button className="border rounded-full py-1 px-2 text-black border-gray-400">Optional</button>
                        <button className="border rounded-full py-1 px-2 text-black border-gray-400">Off</button>
                    </div>
                </div>
                <hr className="text-gray-200" />
                <div className="flex py-3 px-4 border-gray-200">
                    <p className="w-2/3 text-sm text-gray-500">Likedin link</p>
                    <div className="flex flex-row w-1/3 space-x-2 hover:cursor-pointer">
                        <button className="border rounded-full py-1 px-2 text-primary-main border-primary-border">Mandatory</button>
                        <button className="border rounded-full py-1 px-2 text-black border-gray-400">Optional</button>
                        <button className="border rounded-full py-1 px-2 text-black border-gray-400">Off</button>
                    </div>
                </div>
                <hr className="text-gray-200" />
                <div className="flex py-3 px-4">
                    <p className="w-2/3 text-sm text-gray-500">Date of Birth</p>
                    <div className="flex flex-row w-1/3 space-x-2 hover:cursor-pointer">
                        <button className="border rounded-full py-1 px-2 text-primary-main border-primary-border">Mandatory</button>
                        <button className="border rounded-full py-1 px-2 text-black border-gray-400">Optional</button>
                        <button className="border rounded-full py-1 px-2 text-black border-gray-400">Off</button>
                    </div>
                </div>
            </div>

        {/* SUBMIT BUTTON */}
            {/* <div className="bg-white fixed bottom-0 h-max py-10 w-1/2 content-center justify-items-center border-t border-gray-200">
                <button type="submit" className="flex w-5/6 bg-(--color-primary-main) py-2 px-8 rounded-lg justify-center self-center text-white hover:cursor-pointer hover:bg-(--color-primary-hover)">Submit</button>
            </div> */}
        </div>  
        </form>
  );
}
