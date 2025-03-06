export const cacheStorageUtil = {
  storeData: async (key: string, data: string): Promise<number> => {
    const cache = await caches.open("StorageDemoCache");
    const startTime = performance.now();
    const response = new Response(
      new Blob([data], { type: "application/json" })
    );
    await cache.put(key, response);
    const endTime = performance.now();
    return endTime - startTime;
  },
  retrieveData: async (
    key: string
  ): Promise<{ data: string | null; time: number }> => {
    const cache = await caches.open("StorageDemoCache");
    const startTime = performance.now();
    const response = await cache.match(key);
    const data = response ? await response.text() : null;
    const endTime = performance.now();
    return { data, time: endTime - startTime };
  },
  clearData: async (key: string): Promise<void> => {
    const cache = await caches.open("StorageDemoCache");
    await cache.delete(key);
  },
};
