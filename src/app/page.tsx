"use client";
import React, { useEffect, useState } from "react";
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

const storageData = [
  { name: "Local Storage", limit: 10 },
  { name: "Session Storage", limit: 10 },
  { name: "IndexedDB", limit: 100 },
  { name: "Cache Storage", limit: 100 },
  { name: "File System API", limit: 100 },
];

const browserSupport = [
  { name: "Local Storage", support: "✅ Fully Supported" },
  { name: "Session Storage", support: "✅ Fully Supported" },
  { name: "IndexedDB", support: "✅ Fully Supported" },
  { name: "Cache Storage", support: "✅ Fully Supported" },
  { name: "File System API", support: "⚠️ Partial Support" },
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="p-6 text-gray-100 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold">Web Storage API Comparison</h1>
      <p className="mt-2 text-gray-300">
        Explore different web storage APIs, their limitations, and browser
        support.
      </p>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Storage Limits (MB)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={storageData} barGap={8} barSize={50}>
            <XAxis dataKey="name" stroke="#E5E7EB" />
            <YAxis stroke="#E5E7EB" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1F2937", color: "#E5E7EB" }}
              cursor={{ fill: "transparent" }}
            />
            <Legend />
            <Bar dataKey="limit" fill="#6366F1" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Browser Support</h2>
        <table className="w-full border mt-4 bg-gray-800 text-gray-100 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-700 text-gray-200">
              <th className="border p-2">Storage API</th>
              <th className="border p-2">Supported</th>
            </tr>
          </thead>
          <tbody>
            {browserSupport.map((storage) => (
              <tr
                key={storage.name}
                className="text-center border-b last:border-none"
              >
                <td className="border p-2">{storage.name}</td>
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
              href="/local-storage"
              className="text-blue-400 hover:underline"
            >
              Local Storage
            </Link>
          </li>
          <li>
            <Link
              href="/session-storage"
              className="text-blue-400 hover:underline"
            >
              Session Storage
            </Link>
          </li>
          <li>
            <Link href="/indexeddb" className="text-blue-400 hover:underline">
              IndexedDB
            </Link>
          </li>
          <li>
            <Link
              href="/cache-storage"
              className="text-blue-400 hover:underline"
            >
              Cache Storage
            </Link>
          </li>
          <li>
            <Link
              href="/file-system-storage"
              className="text-blue-400 hover:underline"
            >
              File System Storage
            </Link>
          </li>
        </ul>
      </div>

      <div className="mt-8 text-sm text-gray-400">
        <h2 className="text-lg font-semibold">Sources:</h2>
        <ul className="list-disc list-inside">
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Web_storage"
              className="text-blue-400 hover:underline"
              target="_blank"
            >
              Wikipedia - Web Storage
            </a>
          </li>
          <li>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
              className="text-blue-400 hover:underline"
              target="_blank"
            >
              MDN - localStorage
            </a>
          </li>
          <li>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage"
              className="text-blue-400 hover:underline"
              target="_blank"
            >
              MDN - sessionStorage
            </a>
          </li>
          <li>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API"
              className="text-blue-400 hover:underline"
              target="_blank"
            >
              MDN - IndexedDB API
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
