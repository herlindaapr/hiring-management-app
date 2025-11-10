import SearchBar from "../components/SearchBar";
import Image from "next/image";

export default function AdminPage() {
  return (
        <>
        <nav className="bg-white flex border-2 border-gray-200 w-full">
            <div className="flex w-full">
                <div className="flex flex-row w-full py-2 px-4">
                    <div className="flex w-full">
                        <p className="flex text-black text-lg font-bold items-center">Job List</p>
                    </div>
                    <div className="flex w-full justify-end">
                        <img src="/avatar.png" alt="avatar" className="w-10 h-10 border rounded-full flex" />
                    </div>
                </div>
            </div>
        </nav>

        <main className="w-full flex">
            <div className="flex w-3/4 bg-white">
                <div className="w-full">
                    <SearchBar />
                </div>
            </div>


            <div className="flex flex-col w-1/4 h-max relative items-center justify-center text-center text-white my-8 mx-10">
                <Image 
                    src="/bg-menu.jpg" 
                    alt="menu side bar" 
                    fill 
                    priority 
                    className="object-cover rounded-2xl"/>
                <div className="absolute inset-0 bg-black/60 rounded-2xl" />
                <div className="relative py-6 space-y-1">
                    <p className="text-lg font-semibold">
                    Recruit the best candidates
                    </p>
                    <p className="text-sm opacity-90 mb-6">
                    Create jobs, invite, and hire with ease
                    </p>

                    <button
                    className="bg-primary-main hover:bg-primary-hover hover:cursor-pointer text-white font-medium text-base w-full rounded-lg py-2 transition-all shadow-md hover:shadow-lg">
                    Create a new job
                    </button>
                </div>
            </div>

            <div></div>
        </main>

      </>
  );
}
