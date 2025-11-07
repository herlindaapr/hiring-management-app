"use client"

import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function candidatesHome() {

    const router = useRouter();
    
    return (
        <>
            <Navbar />
            <div className="flex w-full h-screen bg-white font-sans">
                <main className="flex flex-row w-full max-w-8xl py-10 px-16 h-full">
                    <div className="bg-(--color-primary-surface) flex flex-col w-2/5 h-max border-2 border-(--color-primary-main) rounded-xl"> 
                        <div className="w-full flex flex-row">
                            <div className="flex flex-col p-4">
                            <img src="/rakamin-logo.jpg" alt="logo rakamin" className="w-12 h-12 border border-gray-200 rounded-lg" />
                            </div>
                            <div className="text-black flex flex-col items-start justify-center">
                            <h1 className="text-black font-bold">UX Designer</h1>
                            <p className="text-xs text-gray-500">Rakamin</p>
                            </div>
                        </div>

                        <hr className="border-dashed border border-gray-200 mx-4"/>

                        <div className="w-full flex flex-col p-4">
                            <div className="w-full flex flex-row">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-gray-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                                <p className="text-gray-500 px-2 text-sm">Jakarta Selatan</p>
                            </div>
                            <div className="w-full flex flex-row">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-gray-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                </svg>
                                    <p className="text-gray-500 px-2 text-sm">Rp.7.000.000 - Rp.15.000.000</p>
                            </div>
                        </div>
                    </div>

                    <hr className="w-px h-full bg-gray-400 border-0 mx-4" />

                    <div className="w-5/6 flex flex-col border border-gray-100 p-6 rounded-lg h-full">
                        <div className="w-full flex flex-row">
                            <div className="flex w-max">
                                <img src="/rakamin-logo.jpg" alt="logo rakamin" className="w-12 h-12 border border-gray-200 rounded-lg" />
                            </div>
                            <div className="text-black flex flex-col justify-center w-5/6 px-4">
                                <p className="w-max flex bg-green-700 rounded-sm py-1 px-2 text-white justify-center text-xs">Full-time</p>
                                <p className="font-semibold pt-2">UX Designer</p>
                                <p className="text-gray-500 text-sm">Rakamin</p>
                            </div>
                            <button onClick={() => router.push("/candidates/applyjob")} className="flex bg-amber-400 text-black rounded-lg py-1 px-3 h-max hover:cursor-pointer">Apply</button>
                        </div>

                        <hr className="my-6" />

                        <div className="w-full">
                            <ul className="w-full text-black list-disc list-inside text-sm">
                                <li>Develop, test, and maintain responsive, high-performance web applications using modern front-end technologies.</li>
                                <li>Collaborate with UI/UX designers to translate wireframes and prototypes into functional code.</li>
                                <li>Integrate front-end components with APIs and backend services.</li>
                                <li>Ensure cross-browser compatibility and optimize applications for maximum speed and scalability.</li>
                                <li>Write clean, reusable, and maintainable code following best practices and coding standards.</li>
                                <li>Participate in code reviews, contributing to continuous improvement and knowledge sharing.</li>
                                <li>Troubleshoot and debug issues to improve usability and overall application quality.</li>
                                <li>Stay updated with emerging front-end technologies and propose innovative solutions.</li>
                                <li>Collaborate in Agile/Scrum ceremonies, contributing to sprint planning, estimation, and retrospectives.</li>
                            </ul>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}