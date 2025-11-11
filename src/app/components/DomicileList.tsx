"use client";

import { useEffect, useState } from "react";

type Province = {
  code: string;
  name: string;
};

export default function DomicileList() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>("");

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

  return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">Domicile<span className="text-red-500">*</span></label>
            <select value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)} className="w-full bg-white border-2 border-gray-300 py-2 mt-2 mb-4 px-2 rounded-lg placeholder:text-gray-950/30 focus:ring-(--color-primary-focus) focus:border-(--color-primary-main) focus:outline-none" required>
                <option value="">Pilih Provinsi</option>
                    {provinces.map((prov) => (
                        <option key={prov.code} value={prov.code}>
                            {prov.name}
                        </option>
                    ))}
            </select>
        </div>
    );
}
