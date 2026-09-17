# NewsNest 📰 - Full-Stack News Portal Website

**NewsNest** is a full-stack, feature-rich news portal web application engineered with modern web standards. It enables users to browse global breaking headlines, search articles by category, engage in community discussions, and register as content contributors to publish, edit, and manage their own news stories.

---

## 🚀 Technology Stack

- **FrontEnd:** React.js, Tailwind CSS, Zustand (State Management), Lucide Icons, Axios, React Router DOM v6
- **BackEnd:** Express.js, Node.js, Mongoose, JWT (JSON Web Tokens), Bcryptjs, CORS
- **Database:** MongoDB (with Mongoose ORM & auto-seeding data support)

---

## ✨ Functional Requirements Summary

| # | Requirement | Implementation Status |
|---|-------------|-----------------------|
| 1 | **Home Page (4-5 Sections, Top 6 News API Call)** | ✅ Completed (Breaking Ticker, Top 6 Hero Grid, Category Spotlight, Editor's Picks & Trending Sidebar, Newsletter Banner) |
| 2 | **News Page (All News Feed with API)** | ✅ Completed (Search bar, category tabs, sorting by date/views, responsive grid, pagination) |
| 3 | **Single News Details Page (API Call)** | ✅ Completed (Full text display, author info, view counters, comment section, related stories) |
| 4 | **Login & Register Page (API Call)** | ✅ Completed (JWT Authentication, profile avatar picker, bio, input validation) |
| 5 | **Registered User News Publishing (API Call)** | ✅ Completed (Publish custom news with title, summary, category, body content, preset or custom image URLs) |
| 6 | **User Dashboard & Profile Page (API Call)** | ✅ Completed (User overview stats, profile editor: name, bio, avatar, password update) |
| 7 | **User Article Edit & Delete (API Call)** | ✅ Completed (CRUD management table for logged-in user's articles with edit & delete confirmation) |
| 8 | **Contact Us Page** | ✅ Completed (Inquiry submission form, office location cards, live tips info) |
| 9 | **Header & Footer** | ✅ Completed (Sticky navbar, date & weather widget, dark/light mode toggle, mobile drawer, detailed footer) |

---

## 🛠️ Local Installation & Setup Guide

### 1. Clone & Navigate to Project
```bash
git clone <your-github-repo-url>
cd NewsNest
```

### 2. Backend Setup (`server/`)
```bash
cd server
npm install
```
Create a `.env` file inside `server/`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/newsnest
JWT_SECRET=newsnest_super_secret_key_2026_jwt_token_auth
NODE_ENV=development
```
Start the API Server:
```bash
npm run dev
```

### 3. Frontend Setup (`client/`)
In a new terminal tab:
```bash
cd client
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🔑 Demo Credentials

To test author publishing and user dashboard features out-of-the-box:
- **Email:** `user@newsnest.com`
- **Password:** `password123`

---

## 📦 Deployment & GitHub Submission Guidelines

### Step 1: Push Code to Public GitHub Repository
Run the following terminal commands inside the project root:
```bash
git init
git add .
git commit -m "Initial commit: Full-stack NewsNest portal codebase"
git branch -M main
git remote add origin https://github.com/YourUsername/NewsNest.git
git push -u origin main
```

### Step 2: Deploy Backend to Render / Vercel
1. Go to [Render.com](https://render.com) or [Vercel.com](https://vercel.com).
2. Create a **New Web Service** and select your GitHub repository (`NewsNest`).
3. Set Root Directory to `server`.
4. Set Build Command: `npm install`
5. Set Start Command: `node server.js`
6. Add Environment Variables:
   - `MONGODB_URI`: (Your MongoDB Atlas connection string)
   - `JWT_SECRET`: `newsnest_super_secret_key_2026_jwt_token_auth`
   - `NODE_ENV`: `production`

### Step 3: Deploy Frontend to Vercel
1. Go to [Vercel.com](https://vercel.com).
2. Import the GitHub repository `NewsNest`.
3. Set Root Directory to `client`.
4. Framework Preset: **Vite**
5. Add Environment Variable:
   - `VITE_API_URL`: `https://your-render-backend-url.onrender.com/api`
6. Click **Deploy**.
