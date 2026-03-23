# 📊 All Data Listing Page — CivicDataSpace

This project is a responsive dataset listing interface built with Next.js (App Router) and Tailwind CSS, implementing filters, pagination, and search as per the Senior Frontend Engineer assignment by CivicDataSpace.

---

## 🚀 Features

- 🔍 Search datasets by title or keywords
- 🎛 Filter sidebar with support for:
  - Sectors
  - Data Types
  - Tags
  - Geographies
- 📄 Grid and List views toggle
- 📄 Pagination:
  - Page numbers
  - Rows per page selection
  - First, Previous, Next, Last navigation buttons
- 🖼 Organization logo, dataset metadata, and descriptions
- 📱 Fully responsive (mobile-first design)
- ⚙️ Integrated with live API: https://api.datakeep.civicdays.in/api/search/dataset/

---

## 🏗 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16.2 (App Router) |
| Language | TypeScript | JavaScript
| State Management | Redux + Redux Saga |
| Styling | Tailwind CSS 4 |
| UI Components | Headless UI |
| HTTP Client | Axios |
| Icons | React Icons, Heroicons |

---

## 📁 Folder Structure

```
app/
  ├── page.tsx                   # Main page
  ├── layout.tsx                 # Root layout
  └── globals.css               # Global styles
Components/
  ├── DatasetList/              # Dataset listing components
  │   ├── index.jsx
  │   └── SearchHeader.jsx
  ├── Header.jsx                # Top header
  ├── FilteredSidebar.jsx       # Filter sidebar
  └── DescriptionModal.jsx      # Dataset detail modal
Redux/
  ├── actions/                  # Redux actions
  ├── api/                      # API calls
  ├── constants/                # Action types
  ├── reducers/                 # Redux reducers
  ├── saga/                     # Redux sagas
  ├── rootSaga.js               # Root saga
  ├── store.js                  # Store configuration
  └── ReduxProvider.js          # Redux provider
```

---

## 🔧 How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/civic-lab-assigment.git
   cd civic-lab-assigment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Visit** http://localhost:3000 in your browser.

---

## 🧑‍💻 Developed by

Ankit Kadyan  
Frontend Developer