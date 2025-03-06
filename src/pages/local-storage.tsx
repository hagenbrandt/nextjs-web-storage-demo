import * as React from "react";
import { useStorageStore } from "@/store/useStorageStore";
import ProgressBar from "@/components/ProgressBar";
import SpeedChart from "@/components/SpeedChart";

const LocalStoragePage = () => {
  const { uploadProgress, downloadProgress } = useStorageStore();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Local Storage</h1>
      <p className="mt-2">
        Local Storage allows storing key-value pairs persistently in the
        browser.
      </p>

      <div className="mt-4">
        <ProgressBar progress={uploadProgress} label="Upload Progress" />
        <ProgressBar progress={downloadProgress} label="Download Progress" />
        <SpeedChart />
      </div>
    </div>
  );
};

export default LocalStoragePage;
