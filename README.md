# Web Storage API Comparison

This project demonstrates the pros and cons of different Web Storage APIs, including:

- Local Storage
- Session Storage
- IndexedDB
- Cache Storage
- File System Storage

Each storage method is presented with an overview, pros and cons, real-world use cases, and interactive examples to test upload, download, and retrieval speeds.

## Features

- Dynamic Storage API Pages: Each API has its own dedicated page, dynamically generated using Next.js API routes.
- Upload & Download Functionality: Test how data is stored and retrieved for each storage method.
- Speed Tracking: Visualize upload and download speeds with a progress bar and a speed chart.
- Comparison Table: Overview of storage limits, speed, sync/async behavior, and browser support.
- Real-World Examples: Each API includes a practical use case.

## Tech Stack

- Next.js (App Router & API Routes)
- React & Zustand (State Management)
- TailwindCSS & shadcn/ui (Styling & Components)
- Recharts (Data Visualization)
- File System API, IndexedDB, Cache API, Local Storage, and Session Storage

## Installation & Setup

1. Clone the repository:

```yaml
git clone https://github.com/your-username/web-storage-comparison.git
cd web-storage-comparison
```

2. Install dependencies using pnpm:

```yaml
pnpm install
```

3. Run the development server:

```yaml
pnpm dev
```

4. Open http://localhost:3000 in your browser.

## Project Structure

📂 src/
┣ 📂 app/
┃ ┣ 📂 storage/ # Dynamic pages for each storage API
┃ ┣ 📂 api/
┃ ┃ ┗ 📂 storage/ # API routes for fetching metadata & handling storage
┃ ┣ 📜 layout.tsx # Root layout
┃ ┣ 📜 page.tsx # Home page with comparison overview
┃
┣ 📂 components/
┃ ┣ 📜 ProgressBar.tsx # Upload & download progress bar
┃ ┣ 📜 SpeedChart.tsx # Speed visualization chart
┃
┣ 📂 store/
┃ ┣ 📜 useStorageStore.ts # Zustand store for managing progress states

## API Endpoints

- GET /api/home: Fetches homepage content, including sections, comparison data, and sources.
- GET /api/storage/[storageType]: Fetches metadata for a specific storage API.
- POST /api/storage/[storageType]: Stores data for a given storage API (simulated behavior).
- DELETE /api/storage/[storageType]: Clears stored data for a specific API.

## Testing Each Storage API

To manually test each API, open the developer tools (F12 > Application) and inspect the relevant storage:

- Local Storage & Session Storage → Application > Storage > Local Storage / Session Storage
- IndexedDB → Application > IndexedDB
- Cache Storage → Application > Cache Storage
- File System API → Uses the file picker to read/write files.

## Contributions

Feel free to open issues or submit PRs for improvements! 🚀

## License

This project is licensed under the MIT License.
