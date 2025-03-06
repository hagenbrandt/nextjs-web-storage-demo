"use client";
import React, { useState } from "react";
import { useStorageStore } from "@/store/useStorageStore";
import { indexedDBUtil } from "@/utils/indexedDBUtil";
import ProgressBar from "@/components/ProgressBar";
import SpeedChart from "@/components/SpeedChart";

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

  const handleUpload = async () => {
    const data = JSON.stringify({ demo: "This is test data for IndexedDB" });
    const timeTaken = await indexedDBUtil.storeData("testKey", data);
    setUploadProgress(100);
    setSpeedData([...speedData, { time: Date.now(), speed: timeTaken }]);
  };

  const handleDownload = async () => {
    const { data, time } = await indexedDBUtil.retrieveData("testKey");
    if (data) {
      alert(`Retrieved Data: ${data}`);
    }
    setDownloadProgress(100);
    setSpeedData([...speedData, { time: Date.now(), speed: time }]);
  };

  const handleClear = async () => {
    await indexedDBUtil.clearData("testKey");
    setUploadProgress(0);
    setDownloadProgress(0);
    setSpeedData([]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">IndexedDB</h1>
      <p className="mt-2">
        IndexedDB is a low-level API for storing large amounts of structured
        data.
      </p>

      <div className="mt-4 space-x-2">
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Upload
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Retrieve
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Clear
        </button>
      </div>

      <div className="mt-4">
        <ProgressBar progress={uploadProgress} label="Upload Progress" />
        <ProgressBar progress={downloadProgress} label="Download Progress" />
        <SpeedChart data={speedData} />
      </div>
    </div>
  );
}
