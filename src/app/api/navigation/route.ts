import { NextResponse } from "next/server";

const NavigationData = [
  {
    name: "Local Storage",
    url: "/storage/local-storage",
  },
  {
    name: "Session Storage",
    url: "/storage/session-storage",
  },
  {
    name: "IndexedDB",
    url: "/storage/indexeddb",
  },
  {
    name: "Cache Storage",
    url: "/storage/cache-storage",
  },
  {
    name: "File System",
    url: "/storage/file-system",
  },
];

export async function GET() {
  return NextResponse.json(NavigationData);
}
