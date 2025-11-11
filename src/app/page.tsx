"use client";

import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/register");
  };
  return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 w-full">
              <div className="max-w-md w-[90%]">
                  <div className="w-full py-8">
                      <img src="/logo-txt.png" className="w-32" />
                  </div>
                  <div className="bg-white shadow-sm rounded-md border border-gray-100 p-8">
                      <h2 className="text-lg font-semibold text-gray-800 mb-1">
                          Masuk ke Rakamin
                      </h2>
                  <p className="text-sm text-gray-500 mb-6">
                      Belum punya akun?{" "}
                      <a href="/register" onClick={handleClick} className="text-primary-main font-medium hover:underline">
                          Daftar
                      </a>
                  </p>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Alamat email
                    </label>
                    <input type="email" id="email" placeholder="email@example.com" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-focus focus:border-primary-border hover:cursor-pointer text-black"/>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Kata sandi
                    </label>
                    <input type="password" id="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-focus focus:border-primary-border text-black"/>
                  </div>

                  <div className="mb-4 text-sm text-primary-main justify-self-end">
                    <a href="#" className="self-end">Lupa kata sandi?</a>
                  </div>

                  <button className="w-full bg-secondary-main hover:bg-secondary-hover text-gray-800 font-bold py-2 rounded-md transition-colors hover:cursor-pointer">
                      Masuk
                  </button>

                  <div className="flex items-center my-4">
                      <div className="grow border-t border-gray-300"></div>
                      <span className="mx-3 text-gray-400 text-sm">or</span>
                      <div className="grow border-t border-gray-300"></div>
                  </div>

                  <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 my-4 rounded-md flex items-center justify-center space-x-2 transition-colors hover:cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                      <span className="text-sm font-bold">Kirim link login melalui email</span>
                  </button>
                  <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 rounded-md flex items-center justify-center space-x-2 transition-colors hover:cursor-pointer">
                      <FcGoogle size={20} />
                      <span className="text-sm font-bold">Masuk dengan Google</span>
                  </button>
                  </div>
              </div>
          </div>
      );
}

