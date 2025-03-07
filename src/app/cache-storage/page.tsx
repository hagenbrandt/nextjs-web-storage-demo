"use client";
import React, { useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import SpeedChart from "@/components/SpeedChart";
import { useStorageStore } from "@/store/useStorageStore";

const CACHE_NAME = "web-storage-demo-cache";
const DATA_URL = "/data.json"; // Dummy URL for storing data

export default function CacheStoragePage() {
  const {
    uploadProgress,
    downloadProgress,
    setUploadProgress,
    setDownloadProgress,
  } = useStorageStore();
  const [speedData, setSpeedData] = useState<{ time: number; speed: number }[]>(
    []
  );
  const [cachedData, setCachedData] = useState<string | null>(null);

  const handleUpload = async () => {
    try {
      const startTime = performance.now();
      const cache = await caches.open(CACHE_NAME);
      const data = new Blob(
        [JSON.stringify({ message: "This is test data for Cache Storage." })],
        { type: "application/json" }
      );
      const response = new Response(data);
      await cache.put(DATA_URL, response);

      const endTime = performance.now();
      setUploadProgress(100);
      setSpeedData([
        ...speedData,
        { time: Date.now(), speed: endTime - startTime },
      ]);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleDownload = async () => {
    try {
      const startTime = performance.now();
      const cache = await caches.open(CACHE_NAME);
      const response = await cache.match(DATA_URL);
      if (response) {
        const text = await response.text();
        setCachedData(text);
      }
      const endTime = performance.now();
      setDownloadProgress(100);
      setSpeedData([
        ...speedData,
        { time: Date.now(), speed: endTime - startTime },
      ]);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  const handleClearCache = async () => {
    await caches.delete(CACHE_NAME);
    setCachedData(null);
    setUploadProgress(0);
    setDownloadProgress(0);
  };

  return (
    <div className="p-6 text-gray-100 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold">Cache Storage API</h1>
      <p className="mt-2 text-gray-300">
        Learn about Cache Storage, its benefits, and how to use it.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Overview</h2>
      <p className="mt-2">
        Cache Storage allows web applications to store and retrieve resources
        such as HTML, CSS, JavaScript, and API responses efficiently. It is
        primarily used for **offline access** and **performance improvements**.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Pros & Cons</h2>
      <ul className="list-disc list-inside mt-2">
        <li>
          <strong>Pros:</strong> Improves load speed, allows offline access,
          reduces server requests.
        </li>
        <li>
          <strong>Cons:</strong> Cannot store arbitrary data like IndexedDB,
          requires proper cache management, and can be overridden by the
          browser.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">How to Test Manually</h2>
      <p className="mt-2">
        To manually test Cache Storage, follow these steps:
      </p>
      <ol className="list-decimal list-inside mt-2">
        <li>
          Open **Developer Tools** in your browser (F12 or right-click →
          Inspect).
        </li>
        <li>Go to the **Application** tab.</li>
        <li>Navigate to **Cache Storage** under the **Storage** section.</li>
        <li>
          Check stored cache items, delete entries, and test loading speeds with
          and without cache.
        </li>
      </ol>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Storage Actions</h2>
        <div className="flex space-x-4 mt-4">
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Upload Data
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            Download Data
          </button>
          <button
            onClick={handleClearCache}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Clear Cache
          </button>
        </div>
      </div>

      {cachedData && (
        <div className="mt-4 p-4 border border-gray-600 rounded-lg bg-gray-800">
          <h3 className="text-lg font-semibold">Cached Data:</h3>
          <pre className="text-gray-300">{cachedData}</pre>
        </div>
      )}

      <div className="mt-4">
        <ProgressBar progress={uploadProgress} label="Upload Progress" />
        <ProgressBar progress={downloadProgress} label="Download Progress" />
        <SpeedChart data={speedData} />
      </div>
    </div>
  );
}
