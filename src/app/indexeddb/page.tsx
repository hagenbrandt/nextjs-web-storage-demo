"use client";
import React, { useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import SpeedChart from "@/components/SpeedChart";
import { useStorageStore } from "@/store/useStorageStore";
import { openDB } from "idb";

const DB_NAME = "indexedDBDemo";
const STORE_NAME = "storage";

export default function IndexedDBPage() {
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

  const initDB = async () => {
    const db = await openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      },
    });
    return db;
  };

  const handleUpload = async () => {
    try {
      const startTime = performance.now();
      const db = await initDB();
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      await store.put(
        { message: "This is test data for IndexedDB." },
        "testKey"
      );
      await tx.done;
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
      const db = await initDB();
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const data = await store.get("testKey");
      if (data) setStoredData(JSON.stringify(data));
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
    try {
      const db = await initDB();
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      await store.clear();
      await tx.done;
      setStoredData(null);
      setUploadProgress(0);
      setDownloadProgress(0);
    } catch (error) {
      console.error("Clear storage error:", error);
    }
  };

  return (
    <div className="p-6 text-gray-100 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold">IndexedDB API</h1>
      <p className="mt-2 text-gray-300">
        Learn about IndexedDB, its benefits, and how to use it.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Overview</h2>
      <p className="mt-2">
        IndexedDB is a low-level API for **storing structured data** in the
        browser. It supports **large amounts of data**, making it useful for
        complex storage needs.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Pros & Cons</h2>
      <ul className="list-disc list-inside mt-2">
        <li>
          <strong>Pros:</strong> Supports large datasets, allows complex
          queries, works asynchronously.
        </li>
        <li>
          <strong>Cons:</strong> More complex to use than Local/Session Storage,
          requires transactions.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">How to Test Manually</h2>
      <p className="mt-2">To manually test IndexedDB, follow these steps:</p>
      <ol className="list-decimal list-inside mt-2">
        <li>
          Open **Developer Tools** in your browser (F12 or right-click →
          Inspect).
        </li>
        <li>Go to the **Application** tab.</li>
        <li>Navigate to **IndexedDB** under the **Storage** section.</li>
        <li>
          Inspect the database, check stored objects, delete entries, and modify
          values.
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
