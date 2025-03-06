import { create } from "zustand";

type StorageState = {
  uploadProgress: number;
  downloadProgress: number;
  demoMode: boolean;
  setUploadProgress: (progress: number) => void;
  setDownloadProgress: (progress: number) => void;
  toggleDemoMode: () => void;
};

export const useStorageStore = create<StorageState>((set) => ({
  uploadProgress: 0,
  downloadProgress: 0,
  demoMode: false,
  setUploadProgress: (progress) => set({ uploadProgress: progress }),
  setDownloadProgress: (progress) => set({ downloadProgress: progress }),
  toggleDemoMode: () => set((state) => ({ demoMode: !state.demoMode })),
}));
