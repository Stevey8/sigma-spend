# Sigma $\sum$ Spend

## ✨ Goal

A simple, scalable personal finance app for daily use on iPhone – accessible anytime, supports manual entry of spending data, and enables backend-powered data analysis with Python.

---

## 🛠️ Tech Stack Summary

### 📂 Frontend (Web App for iPhone)

| Layer          | Tech Stack                   | Scalable Later?   | Notes                      |
| -------------- | ---------------------------- | ----------------- | -------------------------- |
| UI             | **React** (or HTML/CSS)      | ✅ Yes             | Use React with Vite or CRA |
| Mobile Layout  | CSS / Tailwind (optional)    | ✅ Yes             | Mobile-first design        |
| Hosting        | **Vercel** or Netlify        | ✅ Yes             | Free, fast, HTTPS-ready    |
| Installability | Add to Home Screen on iPhone | ✅ Yes (PWA later) | Makes it feel like an app  |

### 🔗 Backend (API Server)

| Layer   | Tech Stack                | Scalable Later? | Notes                                    |
| ------- | ------------------------- | --------------- | ---------------------------------------- |
| Server  | **Node.js + Express.js**  | ✅ Yes           | Lightweight, API-first design            |
| Routing | REST endpoints            | ✅ Yes           | Flexible API routes like `/transactions` |
| ORM     | **Prisma**                | ✅ Yes           | Works great with MySQL                   |
| Auth    | API token (basic)         | ✅ Add JWT later | Enough for personal use                  |
| Hosting | **Render** or **Railway** | ✅ Yes           | Free tier supports backend API           |

### 📆 Database

| Layer      | Tech Stack                     | Scalable Later?  | Notes                               |
| ---------- | ------------------------------ | ---------------- | ----------------------------------- |
| DBMS       | **MySQL**                      | ✅ Yes            | Via Railway, PlanetScale, or Docker |
| Connection | Prisma Client                  | ✅ Yes            | Use `.env` for credentials          |
| Backup     | Manual CSV / automatic backups | ✅ Automate later | Prevent data loss                   |

### 🔬 Analysis (Python)

| Layer        | Tech Stack                                | Scalable Later? | Notes                          |
| ------------ | ----------------------------------------- | --------------- | ------------------------------ |
| Language     | **Python 3.x**                            | ✅ Yes           | Data science-friendly          |
| Libraries    | `pandas`, `mysql-connector`, `SQLAlchemy` | ✅ Yes           | For queries and summaries      |
| Organization | `/analysis/` folder                       | ✅ Yes           | Split common vs. adhoc scripts |

---

## 🛠️ Dev Tools & Infrastructure

| Tool                 | Purpose               | Notes                                |
| -------------------- | --------------------- | ------------------------------------ |
| **GitHub**           | Version control       | For both backend and frontend repos  |
| **.env**             | Secure config         | Store DB/API keys safely             |
| **Docker**           | (Optional) Containers | Use for DB or full stack setup later |
| **Vercel / Netlify** | Frontend hosting      | HTTPS + deploy from Git              |
| **Railway / Render** | Backend + DB hosting  | Simple, free, developer-friendly     |

---

## 🛠️ Optional Future Features

| Feature             | Add Later?     | Tool                       |
| ------------------- | -------------- | -------------------------- |
| Auth system         | ✅              | JWT / NextAuth             |
| Budgeting UI        | ✅              | Extend DB + analytics      |
| CSV Export          | ✅              | Python or backend endpoint |
| Notifications       | ✅ (iOS = paid) | Firebase / OneSignal       |
| Offline/PWA Support | ✅              | Service Worker + Manifest  |
| Bank Sync           | ✅              | Plaid / Salt Edge (paid)   |

---

## ✅ TL;DR: Core Stack for Daily iPhone Use

| Part     | Stack                               |
| -------- | ----------------------------------- |
| Frontend | React + Vercel + Add to Home Screen |
| Backend  | Node.js + Express + Prisma + Render |
| Database | MySQL (Railway or PlanetScale)      |
| Analysis | Python + pandas + mysql-connector   |
| Extras   | GitHub, .env, optional Docker       |

---

