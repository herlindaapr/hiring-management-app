export default function JobListCard() {
    return (
        <div className="w-full flex flex-col rounded-xl py-4 my-2 mx-6 px-4 shadow-md text-black space-y-2">
            <div className="w-full flex flex-row text-xs">
                <div className="border border-success-border bg-success-surface px-3 py-1 rounded-md text-success-main">Active</div>
                <div className="border px-3 py-1 mx-3 rounded border-gray-200 text-gray-500">started on 1 Oct 2025</div>
            </div>
            <div className="w-full flex font-bold">
                <h1>Front End Developer</h1>
            </div>
            <div className="w-full flex flex-row text-gray-600">
                <div className="flex w-1/2">Rp.7.000.000 - Rp.8.000.000</div>
                <div className="flex w-1/2 justify-end">
                    <button className="text-xs border py-1 px-3 rounded-lg text-white bg-primary-main">
                        Manage Job
                    </button>
                </div>
            </div>
        </div>
    )
}