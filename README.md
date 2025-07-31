# 🖼️ PrimeReact Artwork DataTable

A high-performance, modern **React 19** + **TypeScript** DataTable app using **PrimeReact v10**, with advanced features like server-side pagination, persistent row selection, and custom overlay actions.

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&style=for-the-badge" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&style=for-the-badge" />
  <img src="https://img.shields.io/badge/Vite-7.0-646CFF?logo=vite&style=for-the-badge" />
  <img src="https://img.shields.io/badge/PrimeReact-10.9.6-0C7C7B?style=for-the-badge&logo=prime" />
</p>

---

## 🌐 Live Demo

🔗 **[View Live Project](https://data-table-art.netlify.app/)**  


---

## 📌 Overview

This app showcases a fully customizable **DataTable** for artwork listings, ideal for dashboards or admin panels. It demonstrates seamless **user interactions** with:

- Persistent selection across paginated data
- Overlay panel actions 
- Optimized UX with minimal re-renders

---

## 🚀 Features

- 🔄 Server-side pagination (customizable)
- ✅ Persistent checkbox selection across pages
- 💬 Overlay panel with dynamic inputs
- 🧩 TypeScript-safe interfaces
- 💨 Vite fast-refresh & PrimeFlex styling

---

## 🛠️ Tech Stack

| Tech         | Description                        |
|--------------|------------------------------------|
| **React 19** | Latest stable version              |
| **TypeScript** | Static typing for reliability    |
| **Vite**     | Lightning-fast dev & build         |
| **PrimeReact** | Feature-rich UI components       |
| **Axios**    | API communication                  |
| **PrimeFlex** | Responsive utility-first layout   |

---


## 📁 Folder Structure

```bash
📁 Project Root
├── 📁 node_modules/              # Installed dependencies
├── 📁 public/                    # Public assets
├── 📁 src/                       # Main source code
│   ├── 📁 assets/                # Optional images/fonts
│   ├── 📁 components/           
│   │   └── 📄 DataTableWrapper.tsx    # Main DataTable component
│   ├── 📁 hooks/                 
│   │   ├── 📄 useArtworks.ts         # Hook to fetch artworks
│   │   ├── 📄 useBulkSelection.ts    # Hook for multi-selection logic
│   │   └── 📄 useSelection.ts        # Hook for individual selection logic
│   ├── 📁 services/             
│   │   └── 📄 artworkService.ts      # Axios service for artwork API
│   ├── 📁 types/                 
│   │   └── 📄 artwork.ts             # TypeScript interface for artwork
│   ├── 📄 App.tsx                # App component
│   ├── 📄 App.css                # App styles
│   ├── 📄 index.css              # Global styles
│   ├── 📄 main.tsx               # App entry point
├── 📄 index.html                 # HTML shell
├── 📄 package.json               # Project metadata and dependencies
├── 📄 tsconfig.json              # TypeScript configuration
├── 📄 tsconfig.node.json         # TypeScript config for Node
├── 📄 vite.config.ts             # Vite build tool configuration
├── 📄 README.md                  # Project documentation
└── 📄 .gitignore                 # Git ignored files


run locally:
0.clone this repo
1. npm install 
2.npm run dev 

