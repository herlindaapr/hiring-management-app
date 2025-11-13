"use client";

import { useState, useMemo, useEffect } from "react";
import countryCodes from "country-codes-list";
import { Country } from "@/app/types/index.types";

export type PhoneValue = {
  dialCode: string;
  number: string;
  countryCode: string;
};

type PhoneInputProps = {
  name?: string;
  value?: PhoneValue;
  onChange?: (value: PhoneValue) => void;
  required?: boolean;
};

function flagEmojiFromCountryCode(code: string) {
  if (!code) return "";
  const base = 0x1f1e6; // Regional Indicator Symbol Letter A
  return code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(base + (c.charCodeAt(0) - 65)))
    .join("");
}

export default function PhoneInput({ name, value, onChange, required }: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Country>({
    name: "Indonesia",
    code: "ID",
    dial_code: "+62",
  });
  const [phone, setPhone] = useState("");

  // Build country list dynamically from package
  const countries: Country[] = useMemo(() => {
    const data = countryCodes.customList(
      "countryCode",
      "{countryNameEn} +{countryCallingCode}"
    );
    return Object.entries(data).map(([code, val]) => {
      const [name, dial] = val.split(" +");
      return {
        name: name.trim(),
        code,
        dial_code: `+${dial}`,
      };
    });
  }, []);

  const filtered = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (country: Country) => {
    setSelected(country);
    setIsOpen(false);
    onChange?.({
      dialCode: country.dial_code,
      number: phone,
      countryCode: country.code,
    });
  };

  useEffect(() => {
    if (!value) {
      setSelected({
        name: "Indonesia",
        code: "ID",
        dial_code: "+62",
      });
      setPhone("");
      return;
    }

    if (value.countryCode) {
      const matched = countries.find((c) => c.code === value.countryCode);
      if (matched) {
        setSelected(matched);
      }
    }

    setPhone(value.number || "");
  }, [value, countries]);

        return (
            <div className="relative w-full">
                <label className="block mb-2 font-medium text-gray-700">
                    Phone number{required && <span className="text-red-500">*</span>}
                </label>

                <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-primary-focus mb-4">
                    <button type="button" onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2 border-r border-gray-300 bg-white rounded-l-xl">
                        <span className="text-base md:text-lg leading-none" aria-label={selected.name}>
                            {flagEmojiFromCountryCode(selected.code)}
                        </span>
                        <svg className={`w-3 h-3 md:w-4 md:h-4 text-gray-500 transition-transform ${ isOpen ? "rotate-180" : "" }`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <span className="px-1 md:px-2 text-gray-700 font-medium text-xs md:text-sm">{selected.dial_code}</span>
                    <input
                      type="tel"
                      className="w-full py-2 px-2 rounded-r-xl outline-none placeholder-gray-400 text-xs md:text-sm"
                      placeholder="81XXXXXXXXXX"
                      value={phone}
                      onChange={(e) => {
                        const nextValue = e.target.value;
                        setPhone(nextValue);
                        onChange?.({
                          dialCode: selected.dial_code,
                          number: nextValue,
                          countryCode: selected.code,
                        });
                      }}
                    />
                </div>

                {name && (
                  <input
                    type="hidden"
                    name={name}
                    value={
                      phone
                        ? `${selected.dial_code} ${phone}`.trim()
                        : ""
                    }
                    required={required}
                  />
                )}
                {/* Dropdown List */}
                {isOpen && (
                <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl max-h-[60vh] overflow-hidden">
                    
                    {/* Search */}
                    <div className="p-2 border-b border-gray-100">
                        <div className="flex items-center gap-2 px-2 py-1 bg-gray-50 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                            <input type="text" placeholder="Search country" className="w-full bg-transparent outline-none text-xs md:text-sm" value={search} onChange={(e) => setSearch(e.target.value)}/>
                        </div>
                    </div>

                    {/* Country List */}
                    <div className="max-h-[50vh] overflow-y-auto">
                        {filtered.map((country) => (
                            <button key={country.code} onClick={() => handleSelect(country)} className="w-full flex justify-between items-center px-3 md:px-4 py-2 hover:bg-gray-50 text-left transition">
                                <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                                    <span className="text-base md:text-lg leading-none shrink-0" aria-label={country.name}>
                                        {flagEmojiFromCountryCode(country.code)}
                                    </span>
                                    <span className="text-gray-800 text-xs md:text-sm truncate">{country.name}</span>
                                </div>
                                <span className="text-gray-500 text-xs md:text-sm shrink-0 ml-2">{country.dial_code}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
            </div>
        );
        }
