"use client"

import { useRouter } from "next/navigation";

export default function applyJob() {

    const router = useRouter();

    return (
        <form className="relative flex flex-col  w-1/2 bg-white text-black justify-self-center py-12 h-screen overflow-y-auto no-scrollbar">
            <div className="border border-gray-100 pb-12">
                <div className="w-full flex flex-row h-max">
                    <div className="flex flex-row w-1/2 items-center p-10 ">
                        <button onClick={() => router.push("/candidates")} className="border border-gray-200 shadow-sm rounded-lg p-1 hover:cursor-pointer hover:shadow-(--color-primary-hover)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                        <p className="font-bold text-base px-4">Apply Front End at Rakamin</p>
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
                    <input type="text" id="fullname" name="fullname" placeholder="Enter your full name" className="bg-white border-2 border-gray-300 w-full py-2 mt-2 mb-4 px-2 rounded-lg placeholder:text-gray-950/30 focus:ring-(--color-primary-focus) focus:border-(--color-primary-main) focus:outline-none" required />
                    <label htmlFor="birthdate">Date of Birth<span className="text-red-500">*</span></label>
                    <input type="datetime" id="birthday" name="birthday" placeholder="Select date of birth" className="bg-white border-2 border-gray-300 w-full py-2 mt-2 mb-4 px-2 rounded-lg placeholder:text-gray-950/30 focus:ring-(--color-primary-focus) focus:border-(--color-primary-main) focus:outline-none" required />
                    <label htmlFor="gender">Pronoun (gender)<span className="text-red-500">*</span></label> <br/>
                    <input type="radio" id="female" name="gender" value="female" className="mt-2 text-base accent-(--color-primary-focus)" />
                    <label htmlFor="female" className="ml-2 text-base">She/her (Female)</label>
                    <input type="radio" id="male" name="gender" value="male" className="ml-6 mb-4 text-base accent-(--color-primary-focus)"/>
                    <label htmlFor="male" className="ml-2 text-base">He/him (Male)</label> <br/>
                    <label htmlFor="domicile">Domicile<span className="text-red-500">*</span></label>
                    <input type="text" id="domicile" name="domicile" placeholder="Choose your domicile" className="bg-white border-2 border-gray-300 w-full py-2 mt-2 mb-4 px-2 rounded-lg placeholder:text-gray-950/30 focus:ring-(--color-primary-focus) focus:border-(--color-primary-main) focus:outline-none" required />
                    <label htmlFor="phone">Phone number<span className="text-red-500">*</span></label>
                    <input type="number" id="phone" name="phone" placeholder="8XXXX" className="bg-white border-2 border-gray-300 w-full py-2 mt-2 mb-4 px-2 rounded-lg placeholder:text-gray-950/30 focus:ring-(--color-primary-focus) focus:border-(--color-primary-main) focus:outline-none" required />
                    <label htmlFor="email">Email<span className="text-red-500">*</span></label>
                    <input type="email" id="email" name="email" placeholder="Enter your email address" className="bg-white border-2 border-gray-300 w-full py-2 mt-2 mb-4 px-2 rounded-lg placeholder:text-gray-950/30 focus:ring-(--color-primary-focus) focus:border-(--color-primary-main) focus:outline-none" required />
                    <label htmlFor="linkedin">Link Linkedin<span className="text-red-500">*</span></label>
                    <input type="text" id="linkedin" name="linkedin" placeholder="https://linkedin.com/in/username" className="bg-white border-2 border-gray-300 w-full py-2 mt-2 mb-4 px-2 rounded-lg placeholder:text-gray-950/30 focus:ring-(--color-primary-focus) focus:border-(--color-primary-main) focus:outline-none" required />
                </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="bg-white fixed bottom-0 h-max py-10 w-1/2 content-center justify-items-center border-t border-gray-200">
                <button type="submit" className="flex w-5/6 bg-(--color-primary-main) py-2 px-8 rounded-lg justify-center self-center text-white hover:cursor-pointer hover:bg-(--color-primary-hover)">Submit</button>
            </div>  
        </form>
    )
}