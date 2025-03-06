export const localStorageUtil = {
  storeData: (key: string, data: string): number => {
    const startTime = performance.now();
    localStorage.setItem(key, data);
    const endTime = performance.now();
    return endTime - startTime; // Returns time taken in milliseconds
  },
  retrieveData: (key: string): { data: string | null; time: number } => {
    const startTime = performance.now();
    const data = localStorage.getItem(key);
    const endTime = performance.now();
    return { data, time: endTime - startTime }; // Returns retrieved data and time taken
  },
  clearData: (key: string): void => {
    localStorage.removeItem(key);
  },
};
