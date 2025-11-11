"use client"

import { FcGoogle } from "react-icons/fc";


export default function RegisterPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 w-full">
        <div className="max-w-md w-[90%]">
            <div className="w-full py-8">
                <img src="/logo-txt.png" className="w-32" />
            </div>
            <div className="bg-white shadow-sm rounded-md border border-gray-100 p-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    Bergabung dengan Rakamin
                </h2>
            <p className="text-sm text-gray-500 mb-6">
                Sudah punya akun?{" "}
                <a href="/" className="text-primary-main font-medium hover:underline">
                    Masuk
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

            <button className="w-full bg-secondary-main hover:bg-secondary-hover text-gray-800 font-bold py-2 rounded-md transition-colors hover:cursor-pointer">
                Daftar
            </button>

            <div className="flex items-center my-4">
                <div className="grow border-t border-gray-300"></div>
                <span className="mx-3 text-gray-400 text-sm">or</span>
                <div className="grow border-t border-gray-300"></div>
            </div>

            <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 rounded-md flex items-center justify-center space-x-2 transition-colors hover:cursor-pointer">
                <FcGoogle size={20} />
                <span className="text-sm font-bold">Masuk dengan Google</span>
            </button>
            </div>
        </div>
    </div>
    )
}