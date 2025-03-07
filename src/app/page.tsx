"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function HomePage() {
  const [homeData, setHomeData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/home")
      .then((res) => res.json())
      .then((data) => setHomeData(data))
      .catch((err) => console.error("Error fetching home page data:", err));
  }, []);

  if (!homeData) {
    return (
      <div className="p-6 text-gray-100 bg-gray-900 min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 text-gray-100 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold">{homeData.title}</h1>
      <p className="mt-2 text-gray-300">{homeData.description}</p>

      {homeData.sections?.map((section: any, index: number) => (
        <div key={index} className="mt-6">
          <h2 className="text-2xl font-semibold">{section.title}</h2>
          <p className="mt-2 text-gray-300">{section.text}</p>
        </div>
      ))}

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Comparison Table</h2>
        <table className="w-full border mt-4 bg-gray-800 text-gray-100 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-700 text-gray-200">
              <th className="border p-2">Storage API</th>
              <th className="border p-2">Speed</th>
              <th className="border p-2">Limit</th>
              <th className="border p-2">Async</th>
              <th className="border p-2">Support</th>
            </tr>
          </thead>
          <tbody>
            {homeData.comparisonTable?.map((storage: any, index: number) => (
              <tr key={index} className="text-center border-b last:border-none">
                <td className="border p-2">{storage.name}</td>
                <td className="border p-2">{storage.speed}</td>
                <td className="border p-2">{storage.limit}</td>
                <td className="border p-2">{storage.async}</td>
                <td className="border p-2">{storage.support}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Explore Each API</h2>
        <ul className="mt-2 list-disc list-inside">
          <li>
            <Link
              href="/storage/local-storage"
              className="text-blue-400 hover:underline"
            >
              Local Storage
            </Link>
          </li>
          <li>
            <Link
              href="/storage/session-storage"
              className="text-blue-400 hover:underline"
            >
              Session Storage
            </Link>
          </li>
          <li>
            <Link
              href="/storage/indexeddb"
              className="text-blue-400 hover:underline"
            >
              IndexedDB
            </Link>
          </li>
          <li>
            <Link
              href="/storage/cache-storage"
              className="text-blue-400 hover:underline"
            >
              Cache Storage
            </Link>
          </li>
          <li>
            <Link
              href="/storage/file-system"
              className="text-blue-400 hover:underline"
            >
              File System Storage
            </Link>
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Storage Limits (MB)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={homeData.comparisonTable || []}
            barGap={8}
            barSize={50}
          >
            <XAxis dataKey="name" stroke="#E5E7EB" />
            <YAxis stroke="#E5E7EB" domain={[0, 100]} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1F2937", color: "#E5E7EB" }}
              cursor={{ fill: "transparent" }}
            />
            <Legend />
            <Bar dataKey="limit" fill="#6366F1" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 text-sm text-gray-400">
        <h2 className="text-lg font-semibold">Sources:</h2>
        <ul className="list-disc list-inside">
          {homeData.sources?.map((source: any, index: number) => (
            <li key={index}>
              <a
                href={source.url}
                className="text-blue-400 hover:underline"
                target="_blank"
              >
                {source.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
