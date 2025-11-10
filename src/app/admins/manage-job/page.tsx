"use client"

export default function ManageJob() {

    const candidates = [
        {
          name: "Aurelie Yukiko",
          email: "aurelieyukiko@yahoo.com",
          phone: "082120908766",
          dob: "30 January 2001",
          domicile: "Jakarta",
          gender: "Female",
          linkedin: "https://www.linkedin.com/in/user1",
        },
        {
          name: "Dityo Hendyawan",
          email: "dityohendyawan@yahoo.com",
          phone: "081184180678",
          dob: "30 January 2001",
          domicile: "Jakarta",
          gender: "Female",
          linkedin: "https://www.linkedin.com/in/user2",
        },
        {
          name: "Mira Workman",
          email: "miraworkman@yahoo.com",
          phone: "081672007108",
          dob: "30 January 2001",
          domicile: "Jakarta",
          gender: "Female",
          linkedin: "https://www.linkedin.com/in/user3",
        },
        {
          name: "Paityn Culhane",
          email: "paitynculhane@yahoo.com",
          phone: "081521500714",
          dob: "30 January 2001",
          domicile: "Jakarta",
          gender: "Male",
          linkedin: "https://www.linkedin.com/in/user4",
        },
        {
          name: "Emerson Baptista",
          email: "emersonbaptista@yahoo.com",
          phone: "082167008244",
          dob: "30 January 2001",
          domicile: "Jakarta",
          gender: "Male",
          linkedin: "https://www.linkedin.com/in/user5",
        },
      ];

    return (
        <>
            <nav className="bg-white flex border border-gray-200 w-full">
                <div className="flex w-full">
                    <div className="flex flex-row w-full py-2 px-4">
                        <div className="flex w-full">
                            <button className="flex border border-gray-200 shadow-sm font-semibold text-black p-2 text-sm py-1 px-3 bg-white self-center rounded-lg">
                                Job List
                            </button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-6 text-black self-center">
                                <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                            <button className="flex border border-gray-300 text-black font-semibold p-2 text-sm py-1 px-3 bg-gray-200 self-center rounded-lg">
                                Manage Candidate
                            </button>
                        </div>
                        <div className="flex w-full justify-end">
                            <img src="/avatar.png" alt="avatar" className="w-10 h-10 border rounded-full flex" />
                        </div>
                    </div>
                </div>
            </nav>

            <main>
                <h1 className="font-bold p-4 text-black">Front End Developer</h1>
                <div className="p-4 border border-gray-200 rounded-md mx-4">
                    <div className="overflow-hidden shadow-sm">
                        <table className="w-full text-sm text-gray-700">
                        <thead className="bg-gray-50 text-gray-600 uppercase text-[13px]">
                            <tr>
                            <th className="p-4 text-left">
                                <input
                                type="checkbox"
                                className="h-4 w-4 rounded accent-primary-main"
                                />
                            </th>
                            <th className="p-4 text-left font-semibold">Nama Lengkap</th>
                            <th className="p-4 text-left font-semibold">Email Address</th>
                            <th className="p-4 text-left font-semibold">Phone Numbers</th>
                            <th className="p-4 text-left font-semibold">Date of Birth</th>
                            <th className="p-4 text-left font-semibold">Domicile</th>
                            <th className="p-4 text-left font-semibold">Gender</th>
                            <th className="p-4 text-left font-semibold">Link LinkedIn</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {candidates.map((person, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded accent-primary-main"
                                />
                                </td>
                                <td className="p-4 font-medium">{person.name}</td>
                                <td className="p-4 truncate max-w-[180px]">{person.email}</td>
                                <td className="p-4">{person.phone}</td>
                                <td className="p-4">{person.dob}</td>
                                <td className="p-4">{person.domicile}</td>
                                <td className="p-4">{person.gender}</td>
                                <td className="p-4 text-teal-600 underline">
                                <a
                                    href={person.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-teal-700"
                                >
                                    {person.linkedin}
                                </a>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                </div>

            </main>
        </>
    )
}