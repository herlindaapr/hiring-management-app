"use client";

import { useEffect, useMemo, useState } from "react";

type DatePickerProps = {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
};

export default function DatePicker({ name, value, onChange, required }: DatePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const days = ["S", "M", "T", "W", "T", "F", "S"];

    const startOfMonth = useMemo(() => new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        1
    ), [currentMonth]);

    const endOfMonth = useMemo(() => new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0
    ), [currentMonth]);

    const startDay = startOfMonth.getDay();
    const daysInMonth = endOfMonth.getDate();

    const handleDateClick = (day: number) => {
        const date = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day
        );
        setSelectedDate(date);
        setIsOpen(false);
        onChange?.(date.toISOString());
    };

    const handlePrevMonth = () => {
        setCurrentMonth(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
        );
    };

    const handleNextMonth = () => {
        setCurrentMonth(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
        );
    };

    const formattedValue = useMemo(() => {
        if (!selectedDate) {
            return "";
        }
        return selectedDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    }, [selectedDate]);

    useEffect(() => {
        if (!value) {
            setSelectedDate(null);
            return;
        }

        const parsed = new Date(value);
        if (!Number.isNaN(parsed.getTime())) {
            setSelectedDate(parsed);
            setCurrentMonth(new Date(parsed.getFullYear(), parsed.getMonth(), 1));
        }
    }, [value]);

    return (
            <div className="relative w-full mb-4">
                <label className="block mb-2 font-medium text-gray-700">
                    Date of Birth{required && <span className="text-red-500">*</span>}
                </label>

            <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between px-4 py-2 text-gray-600 border-2 border-gray-300 rounded-lg hover:border-gray-400 focus:border-primary-main focus:outline-none">
                <span className="text-gray-500">{formattedValue || "Select your date of birth"}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                </svg>

            </button>

            {name && (
                <input type="hidden" name={name} value={selectedDate ? selectedDate.toISOString() : ""} required={required} />
            )}

            {/* Calendar */}
            {isOpen && (
                <div className="absolute z-10 mt-2 w-full sm:w-96 md:w-[400px] bg-white rounded-xl border border-gray-200 shadow-md p-3 md:p-4">
                    <div className="flex justify-between items-center place-self-center mb-2">
                        <div className="flex items-center gap-2 md:gap-3">
                            <button onClick={handlePrevMonth} className="text-gray-500 hover:text-gray-800 font-bold">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4 md:size-5 font-bold">
                                    <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <span className="font-semibold text-xs md:text-sm"> {currentMonth.toLocaleString("default", {month: "short",})}{" "}{currentMonth.getFullYear()}</span>
                            <button onClick={handleNextMonth} className="text-gray-500 hover:text-gray-800 font-bold">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4 md:size-5 font-bold">
                                    <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>

                {/* Day names */}
                    <div className="grid grid-cols-7 text-center text-xs md:text-sm font-medium text-gray-500 mb-2">
                        {days.map((day, index) => (
                        <div key={`${day}-${index}`}>{day}</div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 text-center text-xs md:text-sm gap-1">
                        {Array.from({ length: startDay }).map((_, i) => (
                        <div key={`empty-${i}`} />
                        ))}

                        {Array.from({ length: daysInMonth }).map((_, day) => {
                        const dateNum = day + 1;
                        const isSelected =
                            selectedDate &&
                            dateNum === selectedDate.getDate() &&
                            currentMonth.getMonth() === selectedDate.getMonth() &&
                            currentMonth.getFullYear() === selectedDate.getFullYear();

                        return (
                            <button key={dateNum} onClick={() => handleDateClick(dateNum)} className={`w-7 h-7 md:w-8 md:h-8 mx-auto rounded-full hover:bg-primary-hover ${
                                isSelected
                                ? "bg-primary-main text-white font-bold"
                                : "text-gray-700"
                            }`}>{dateNum}
                            </button>
                            );
                        })}
                    </div>
                </div>
                )}
            </div>
    );
}
