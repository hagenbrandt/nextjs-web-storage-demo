import { openDB } from "idb";

const DB_NAME = "StorageDemoDB";
const STORE_NAME = "storageData";

export const indexedDBUtil = {
  storeData: async (key: string, data: string): Promise<number> => {
    const db = await openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      },
    });
    const startTime = performance.now();
    await db.put(STORE_NAME, data, key);
    const endTime = performance.now();
    return endTime - startTime;
  },
  retrieveData: async (
    key: string
  ): Promise<{ data: string | null; time: number }> => {
    const db = await openDB(DB_NAME, 1);
    const startTime = performance.now();
    const data = await db.get(STORE_NAME, key);
    const endTime = performance.now();
    return { data, time: endTime - startTime };
  },
  clearData: async (key: string): Promise<void> => {
    const db = await openDB(DB_NAME, 1);
    await db.delete(STORE_NAME, key);
  },
};
