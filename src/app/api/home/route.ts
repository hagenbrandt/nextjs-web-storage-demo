import { NextResponse } from "next/server";

const homePageData = {
  title: "Web Storage API Comparison",
  description:
    "Explore different web storage APIs, their limitations, and browser support.",
  sections: [
    {
      title: "Overview",
      text: "This application demonstrates how different Web Storage APIs work, showcasing their advantages, limitations, and real-world use cases.",
    },
    {
      title: "Storage Limits & Browser Support",
      text: "Each storage API has different size limits and browser support. IndexedDB and Cache Storage allow storing large datasets, while Local and Session Storage are limited to a few megabytes.",
    },
    {
      title: "Performance & Use Cases",
      text: "Some APIs work synchronously, which can block UI rendering, while others are asynchronous and handle large datasets efficiently. Use cases range from caching assets to offline data storage.",
    },
  ],
  comparisonTable: [
    {
      name: "Local Storage",
      speed: "Fast",
      limit: "~5MB",
      async: "No",
      support: "✅ Fully Supported",
    },
    {
      name: "Session Storage",
      speed: "Fast",
      limit: "~5MB",
      async: "No",
      support: "✅ Fully Supported",
    },
    {
      name: "IndexedDB",
      speed: "Moderate",
      limit: "Large",
      async: "Yes",
      support: "✅ Fully Supported",
    },
    {
      name: "Cache Storage",
      speed: "Fast",
      limit: "Large",
      async: "Yes",
      support: "✅ Fully Supported",
    },
    {
      name: "File System API",
      speed: "Varies",
      limit: "Large",
      async: "Yes",
      support: "⚠️ Partial Support",
    },
  ],
  sources: [
    {
      name: "Wikipedia - Web Storage",
      url: "https://en.wikipedia.org/wiki/Web_storage",
    },
    {
      name: "MDN - localStorage",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage",
    },
    {
      name: "MDN - sessionStorage",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage",
    },
    {
      name: "MDN - IndexedDB API",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API",
    },
  ],
};

export async function GET() {
  return NextResponse.json(homePageData);
}
