"use client";

import { useEffect, useState } from "react";
import { Province } from "../types/index.types";

type DomicileListProps = {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
};

export default function DomicileList({ name, value = "", onChange, required }: DomicileListProps) {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>(value);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const res = await fetch("/api/provinces");
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        const data = await res.json();
        setProvinces(data.data || []);
      } catch (error) {
        console.error("Failed to fetch provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    setSelectedProvince(value);
  }, [value]);

  return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Domicile{required && <span className="text-red-500">*</span>}
            </label>
            <select
              value={selectedProvince}
              onChange={(e) => {
                const nextValue = e.target.value;
                setSelectedProvince(nextValue);
                onChange?.(nextValue);
              }}
              className="w-full bg-white border-2 border-gray-300 py-2 mt-2 mb-4 px-2 rounded-lg placeholder:text-gray-950/30 focus:ring-(--color-primary-focus) focus:border-(--color-primary-main) focus:outline-none"
              required={required}
            >
                <option value="">Pilih Provinsi</option>
                    {provinces.map((prov) => (
                        <option key={prov.code} value={prov.name}>
                            {prov.name}
                        </option>
                    ))}
            </select>
            {name && (
              <input type="hidden" name={name} value={selectedProvince} required={required} />
            )}
        </div>
    );
}
