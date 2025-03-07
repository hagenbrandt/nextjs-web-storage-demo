"use client";
import React, { useState } from "react";
import { useStorageStore } from "@/store/useStorageStore";
import ProgressBar from "@/components/ProgressBar";
import SpeedChart from "@/components/SpeedChart";

declare global {
  interface Window {
    showSaveFilePicker?: () => Promise<FileSystemFileHandle>;
    showOpenFilePicker?: () => Promise<FileSystemFileHandle[]>;
  }
}

const fileTypes = [
  { label: "Text File (.txt)", value: "text/plain", extension: ".txt" },
  { label: "JSON File (.json)", value: "application/json", extension: ".json" },
  { label: "CSV File (.csv)", value: "text/csv", extension: ".csv" },
  { label: "Markdown File (.md)", value: "text/markdown", extension: ".md" },
];

export default function FileSystemStoragePage() {
  const {
    uploadProgress,
    downloadProgress,
    setUploadProgress,
    setDownloadProgress,
  } = useStorageStore();
  const [fileText, setFileText] = useState("");
  const [selectedFileType, setSelectedFileType] = useState(fileTypes[0]);
  const [speedData, setSpeedData] = useState<{ time: number; speed: number }[]>(
    []
  );

  const handleUpload = async () => {
    if (!window.showOpenFilePicker) {
      alert("Your browser does not support the File System Access API.");
      return;
    }
    try {
      const startTime = performance.now();
      const [fileHandle] = await window.showOpenFilePicker();
      const file = await fileHandle.getFile();
      const text = await file.text();
      setFileText(text);
      const endTime = performance.now();
      setSpeedData([
        ...speedData,
        { time: Date.now(), speed: endTime - startTime },
      ]);
      setUploadProgress(100);
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  const handleEdit = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFileText(event.target.value);
  };

  const handleSave = async () => {
    if (!window.showSaveFilePicker) {
      alert("Your browser does not support the File System Access API.");
      return;
    }
    try {
      const startTime = performance.now();
      const fileHandle = await window.showSaveFilePicker();
      const writable = await fileHandle.createWritable();
      await writable.write(
        new Blob([fileText], { type: selectedFileType.value })
      );
      await writable.close();
      const endTime = performance.now();
      setSpeedData([
        ...speedData,
        { time: Date.now(), speed: endTime - startTime },
      ]);
      alert(`File saved successfully!`);
      setDownloadProgress(100);
    } catch (error) {
      console.error("File save error:", error);
    }
  };

  return (
    <div className="p-6 text-gray-100 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold">File System Storage API</h1>
      <p className="mt-2 text-gray-300">
        Upload, edit, and save text files using the File System Access API.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Overview</h2>
      <p className="mt-2">
        The File System API allows web applications to **read, write, and manage
        files** directly from the user's device.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Pros & Cons</h2>
      <ul className="list-disc list-inside mt-2">
        <li>
          <strong>Pros:</strong> Enables direct file manipulation, persistent
          storage, supports large files.
        </li>
        <li>
          <strong>Cons:</strong> Limited browser support, requires user
          permission, API is asynchronous.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">How to Test Manually</h2>
      <p className="mt-2">
        To manually test the File System API, follow these steps:
      </p>
      <ol className="list-decimal list-inside mt-2">
        <li>Click **Upload File** and select a file from your system.</li>
        <li>Edit the file contents in the text box.</li>
        <li>
          Click **Save File** to write the modified content to your system.
        </li>
        <li>Check the saved file on your device.</li>
      </ol>

      <div className="mt-4 space-x-2">
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Upload File
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Save File
        </button>
        <select
          value={selectedFileType.value}
          onChange={(e) => {
            const fileType = fileTypes.find(
              (ft) => ft.value === e.target.value
            );
            if (fileType) setSelectedFileType(fileType);
          }}
          className="px-4 py-2 border rounded-lg bg-gray-800 text-gray-300"
        >
          {fileTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {fileText && (
        <textarea
          className="w-full h-64 p-2 mt-4 border rounded-lg bg-gray-800 text-gray-300 border-gray-600"
          value={fileText}
          onChange={handleEdit}
        />
      )}

      <div className="mt-4">
        <ProgressBar progress={uploadProgress} label="Upload Progress" />
        <ProgressBar progress={downloadProgress} label="Download Progress" />
        <SpeedChart data={speedData} />
      </div>
    </div>
  );
}
