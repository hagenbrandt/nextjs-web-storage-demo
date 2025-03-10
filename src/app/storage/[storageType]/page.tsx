"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import SpeedChart from "@/components/SpeedChart";
import { useStorageStore } from "@/store/useStorageStore";
import { openDB } from "idb";

interface StorageData {
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  realLifeExample: string;
}

interface StorageController {
  [key: string]: {
    upload: () => void;
    download: () => void;
    clear: () => void;
    save?: () => void;
  };
}

const DB_NAME = "indexedDBDemo";
const STORE_NAME = "storage";
const CACHE_NAME = "cacheStorageDemo";
const DATA_URL = "https://example.com/data";

export default function StoragePage() {
  const params = useParams();
  const storageType = params?.storageType as string;
  const {
    uploadProgress,
    downloadProgress,
    setUploadProgress,
    setDownloadProgress,
  } = useStorageStore();
  const [speedData, setSpeedData] = useState<{ time: number; speed: number }[]>(
    []
  );
  const [storageData, setStorageData] = useState<StorageData | null>(null);
  const [storedData, setStoredData] = useState<string | null>(null);
  const [fileText, setFileText] = useState<string>("");
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | null>(
    null
  );

  useEffect(() => {
    if (!storageType) return;
    fetch(`/api/storage/${storageType}`)
      .then((res) => res.json())
      .then((data: { metadata: StorageData }) => {
        setStorageData(data.metadata);
      })
      .catch((err) => console.error("Error fetching storage data:", err));
  }, [storageType]);

  const initDB = async () => {
    return openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      },
    });
  };

  const trackSpeed = (startTime: number) => {
    const endTime = performance.now();
    setSpeedData((prev) => [
      ...prev,
      { time: Date.now(), speed: endTime - startTime },
    ]);
  };

  const storageController: StorageController = {
    indexeddb: {
      upload: async () => {
        const startTime = performance.now();
        const db = await initDB();
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        await store.put("Test data for IndexedDB.", "testKey");
        trackSpeed(startTime);
        setUploadProgress(100);
      },
      download: async () => {
        const startTime = performance.now();
        const db = await initDB();
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const data = await store.get("testKey");
        setStoredData(data || "No data found");
        trackSpeed(startTime);
        setDownloadProgress(100);
      },
      clear: async () => {
        const db = await initDB();
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        await store.clear();
        setStoredData(null);
        setUploadProgress(0);
        setDownloadProgress(0);
      },
    },
    "cache-storage": {
      upload: async () => {
        const startTime = performance.now();
        const cache = await caches.open(CACHE_NAME);
        const data = new Response("Test data for Cache Storage.");
        await cache.put(DATA_URL, data);
        trackSpeed(startTime);
        setUploadProgress(100);
      },
      download: async () => {
        const startTime = performance.now();
        const cache = await caches.open(CACHE_NAME);
        const response = await cache.match(DATA_URL);
        setStoredData(response ? await response.text() : "No data found");
        trackSpeed(startTime);
        setDownloadProgress(100);
      },
      clear: async () => {
        await caches.delete(CACHE_NAME);
        setStoredData(null);
        setUploadProgress(0);
        setDownloadProgress(0);
      },
    },
    "local-storage": {
      upload: () => {
        const startTime = performance.now();
        localStorage.setItem(
          "localStorageDemoData",
          "Test data for Local Storage."
        );
        trackSpeed(startTime);
        setUploadProgress(100);
      },
      download: () => {
        const startTime = performance.now();
        setStoredData(
          localStorage.getItem("localStorageDemoData") || "No data found"
        );
        trackSpeed(startTime);
        setDownloadProgress(100);
      },
      clear: () => {
        localStorage.removeItem("localStorageDemoData");
        setStoredData(null);
        setUploadProgress(0);
        setDownloadProgress(0);
      },
    },
    "session-storage": {
      upload: () => {
        const startTime = performance.now();
        sessionStorage.setItem(
          "sessionStorageDemoData",
          "Test data for Session Storage."
        );
        trackSpeed(startTime);
        setUploadProgress(100);
      },
      download: () => {
        const startTime = performance.now();
        setStoredData(
          sessionStorage.getItem("sessionStorageDemoData") || "No data found"
        );
        trackSpeed(startTime);
        setDownloadProgress(100);
      },
      clear: () => {
        sessionStorage.removeItem("sessionStorageDemoData");
        setStoredData(null);
        setUploadProgress(0);
        setDownloadProgress(0);
      },
    },
    "file-system": {
      upload: async () => {
        if (!window.showOpenFilePicker)
          return alert("File System API not supported.");
        const startTime = performance.now();
        const [handle] = await window.showOpenFilePicker();
        setFileHandle(handle);
        const file = await handle.getFile();
        setFileText(await file.text());
        trackSpeed(startTime);
        setUploadProgress(100);
      },
      download: async () => {
        const startTime = performance.now();
        alert("File content loaded successfully");
        trackSpeed(startTime);
        setDownloadProgress(100);
      },
      save: async () => {
        if (!window.showSaveFilePicker)
          return alert("File System API not supported.");
        if (!fileHandle) return alert("No file selected to save.");
        try {
          const startTime = performance.now();
          const writable = await fileHandle.createWritable();
          await writable.write(new Blob([fileText], { type: "text/plain" }));
          await writable.close();
          trackSpeed(startTime);
          alert("File saved successfully!");
          setDownloadProgress(100);
        } catch (error) {
          console.error("File save error:", error);
        }
      },
      clear: async () => {
        setFileText("");
        setFileHandle(null);
        setUploadProgress(0);
        setDownloadProgress(0);
      },
    },
  };

  if (!storageType || !storageData) {
    return (
      <div className="p-6 text-gray-100 bg-gray-900 min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 text-gray-100 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold">{storageData.name}</h1>
      <p className="mt-2 text-gray-300">{storageData.description}</p>

      <h2 className="text-2xl font-semibold mt-6">Pros & Cons</h2>
      <ul className="list-none list-inside mt-2">
        {storageData.pros.map((pro) => (
          <li key={pro} className="text-green-400">
            ✔ {pro}
          </li>
        ))}
        {storageData.cons.map((con) => (
          <li key={con} className="text-red-400">
            ✖ {con}
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-6">Real-Life Example</h2>
      <p className="mt-2 text-gray-300">{storageData.realLifeExample}</p>

      <h2 className="text-2xl font-semibold mt-6">Storage Actions</h2>
      <div className="flex space-x-4 mt-4">
        <button
          onClick={storageController[storageType]?.upload}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Upload Data
        </button>
        <button
          onClick={storageController[storageType]?.download}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Download Data
        </button>
        {storageType === "file-system" && (
          <button
            onClick={storageController[storageType]?.save}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
          >
            Save File
          </button>
        )}
        <button
          onClick={storageController[storageType]?.clear}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Clear Storage
        </button>
      </div>

      <ProgressBar progress={uploadProgress} label="Upload Progress" />
      <ProgressBar progress={downloadProgress} label="Download Progress" />
      <SpeedChart data={speedData} />

      {fileText && storageType === "file-system" && (
        <textarea
          className="w-full h-64 p-2 mt-4 border rounded-lg"
          value={fileText}
          onChange={(e) => setFileText(e.target.value)}
        />
      )}

      {storedData && (
        <div className="mt-4 p-4 border border-gray-600 rounded-lg bg-gray-800">
          <h3 className="text-lg font-semibold">Stored Data:</h3>
          <pre className="text-gray-300 whitespace-pre-wrap break-words">
            {storedData}
          </pre>
        </div>
      )}
    </div>
  );
}
