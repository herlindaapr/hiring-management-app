interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Search by job name or details" }: SearchBarProps) {

    return (
        <div className="w-full mx-2 md:mx-6 flex justify-center py-4 md:py-8">
            <div className="text-sm w-full">
                <div className="flex rounded-md overflow-hidden border-2 border-gray-200 focus-within:shadow-lg">
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="grow py-2 px-2 outline-none bg-white text-black text-xs md:text-sm"
                    />
                    <button type="button" className="p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 md:size-6 text-(--color-primary-main)">
                            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
                        </svg>     
                    </button>
                </div>
            </div>
        </div>
    )
}