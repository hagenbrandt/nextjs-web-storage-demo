declare global {
  interface Window {
    showSaveFilePicker?: () => Promise<FileSystemFileHandle>;
    showOpenFilePicker?: () => Promise<FileSystemFileHandle[]>;
  }
}

export const fileSystemUtil = {
  storeFile: async (file: File): Promise<number> => {
    if (!window.showSaveFilePicker) {
      throw new Error(
        "File System Access API is not supported in this browser."
      );
    }
    const startTime = performance.now();
    const handle = await window.showSaveFilePicker(); // No type assertion needed
    const writable = await handle.createWritable();
    await writable.write(file);
    await writable.close();
    const endTime = performance.now();
    return endTime - startTime;
  },
  retrieveFile: async (): Promise<{ file: File | null; time: number }> => {
    if (!window.showOpenFilePicker) {
      throw new Error(
        "File System Access API is not supported in this browser."
      );
    }
    const startTime = performance.now();
    const [handle]: FileSystemFileHandle[] = await window.showOpenFilePicker(); // Explicitly typed
    const file = await handle.getFile();
    const endTime = performance.now();
    return { file, time: endTime - startTime };
  },
};
