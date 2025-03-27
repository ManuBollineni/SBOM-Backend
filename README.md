# SBOM Finder

**SBOM Finder** is a Node.js-based backend application that allows users to manage and analyze Software Bill of Materials (SBOM) for software applications and apps. It supports search, comparison, statistics, and visualization of component usage and vulnerabilities.

---

## 📦 Features

- Add, update, and delete software applications
- Generate and view SBOMs linked to applications
- Manage software components with metadata (version, license, supplier)
- Compare SBOMs between two applications
- Search applications and components using filters and fuzzy logic
- View statistics grouped by category, OS, supplier, manufacturer
- Get vulnerability reports and most-used components

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB (via Mongoose)
- **API Style:** REST

---

## 📁 Project Structure

```
├── models/              # Mongoose schemas (Application, Component, SBOM)
├── controllers/         # API logic for each route
├── routes/              # Route definitions for APIs
├── config/              # DB connection config
├── app.js               # Main entry point
└── .gitignore
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/sbom-finder.git
cd sbom-finder
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create a `.env` file (if needed) to store MongoDB connection string or port info.

### 4. Run the Server
```bash
npm start
```

Server should run on `http://localhost:8080`

---

## 📬 API Endpoints Overview

- `/api/applications` – Manage applications
- `/api/components` – Manage software components
- `/api/sboms` – Manage SBOMs and link to applications
- `/api/stats` – Get app/component statistics

---

## 🔒 Future Enhancements

- Authentication & Authorization (JWT)
- Swagger API documentation
- CI/CD with GitHub Actions
- Frontend Dashboard (React)

---

## 📄 License
MIT

---

## 🙌 Contributions
Pull requests and suggestions are welcome! Feel free to fork and enhance the project.
