import { NextResponse } from "next/server";

const storageData: Record<string, any> = {};

const storageMetadata: Record<
  string,
  {
    name: string;
    description: string;
    pros: string[];
    cons: string[];
    realLifeExample: string;
  }
> = {
  "local-storage": {
    name: "Local Storage",
    description:
      "Local Storage allows web applications to store key-value pairs persistently within the user's browser.",
    pros: [
      "Easy to use",
      "Persists across sessions",
      "Supports up to ~5MB per domain",
    ],
    cons: [
      "Not encrypted",
      "Synchronous API (can block UI)",
      "Only supports strings",
    ],
    realLifeExample:
      "Local Storage is commonly used to remember user preferences, such as dark mode settings or form autofill data, even after the user closes and reopens the browser.",
  },
  "session-storage": {
    name: "Session Storage",
    description:
      "Session Storage allows web applications to store key-value pairs within the user's browser but only for the duration of the session.",
    pros: ["Easy to use", "Data is cleared when the session ends"],
    cons: ["Data is lost on refresh", "Only supports strings"],
    realLifeExample:
      "Session Storage is useful for storing temporary user session data, such as login tokens on a multi-step form, ensuring the information persists only while the tab is open.",
  },
  indexeddb: {
    name: "IndexedDB",
    description:
      "IndexedDB is a low-level API for storing structured data, including large datasets, within the browser.",
    pros: [
      "Supports large datasets",
      "Allows complex queries",
      "Asynchronous API",
    ],
    cons: ["More complex than Local Storage", "Requires transactions"],
    realLifeExample:
      "IndexedDB is often used for offline applications, such as Progressive Web Apps (PWAs), where large amounts of data (e.g., cached articles in a news app) need to be stored and accessed efficiently.",
  },
  "cache-storage": {
    name: "Cache Storage",
    description:
      "Cache Storage API allows storing and retrieving HTTP request/response pairs, making it useful for offline caching.",
    pros: ["Great for caching API responses", "Works well for offline access"],
    cons: [
      "Cannot store arbitrary data like IndexedDB",
      "Needs cache management",
    ],
    realLifeExample:
      "Cache Storage is widely used for storing website assets like images, CSS, and JavaScript files in Service Workers, allowing websites to load faster and work offline.",
  },
  "file-system": {
    name: "File System API",
    description:
      "The File System Access API enables web applications to read and write files on the user’s device.",
    pros: ["Direct file manipulation", "Supports large files"],
    cons: ["Limited browser support", "Requires user permission"],
    realLifeExample:
      "The File System API is useful for web-based applications that need to edit and save files locally, such as an online text editor or image processing tool.",
  },
};

export async function GET(
  req: Request,
  context: { params: { storageType?: string } }
) {
  const { storageType } = await context.params;
  if (!storageType || !storageMetadata[storageType]) {
    return NextResponse.json(
      { error: "Storage type not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({
    metadata: storageMetadata[storageType],
    data: storageData[storageType] || null,
  });
}
