"use client";
import React, { useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import SpeedChart from "@/components/SpeedChart";
import { useStorageStore } from "@/store/useStorageStore";

export default function SessionStoragePage() {
  const {
    uploadProgress,
    downloadProgress,
    setUploadProgress,
    setDownloadProgress,
  } = useStorageStore();
  const [speedData, setSpeedData] = useState<{ time: number; speed: number }[]>(
    []
  );
  const [storedData, setStoredData] = useState<string | null>(null);
  const STORAGE_KEY = "sessionStorageDemoData";

  const handleUpload = async () => {
    try {
      const startTime = performance.now();
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ message: "This is test data for Session Storage." })
      );
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
      const data = sessionStorage.getItem(STORAGE_KEY);
      if (data) setStoredData(data);
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

  const handleClearStorage = async () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setStoredData(null);
    setUploadProgress(0);
    setDownloadProgress(0);
  };

  return (
    <div className="p-6 text-gray-100 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold">Session Storage API</h1>
      <p className="mt-2 text-gray-300">
        Learn about Session Storage, its benefits, and how to use it.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Overview</h2>
      <p className="mt-2">
        Session Storage allows web applications to store **key-value pairs**
        within the user's browser, but the data is **only available for the
        duration of the page session**.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Pros & Cons</h2>
      <ul className="list-disc list-inside mt-2">
        <li>
          <strong>Pros:</strong> Easy to use, does not persist after session
          ends, useful for temporary storage.
        </li>
        <li>
          <strong>Cons:</strong> Data is lost on page refresh or tab close, only
          supports strings.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">How to Test Manually</h2>
      <p className="mt-2">
        To manually test Session Storage, follow these steps:
      </p>
      <ol className="list-decimal list-inside mt-2">
        <li>
          Open **Developer Tools** in your browser (F12 or right-click →
          Inspect).
        </li>
        <li>Go to the **Application** tab.</li>
        <li>Navigate to **Session Storage** under the **Storage** section.</li>
        <li>
          Check stored key-value pairs, delete entries, and modify values.
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
            onClick={handleClearStorage}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Clear Storage
          </button>
        </div>
      </div>

      {storedData && (
        <div className="mt-4 p-4 border border-gray-600 rounded-lg bg-gray-800">
          <h3 className="text-lg font-semibold">Stored Data:</h3>
          <pre className="text-gray-300">{storedData}</pre>
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
