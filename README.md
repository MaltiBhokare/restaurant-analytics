# 🍽️ Restaurant Order Trends Dashboard

A full-stack analytics dashboard built using React (Vite) and Pure PHP.

---

## 🚀 Overview

This project provides restaurant order analytics with:

- View restaurants
- Apply date range filters
- Filter by order amount
- Filter by hour range
- Daily orders analysis
- Daily revenue analysis
- Average order value (AOV)
- Peak order hour per day
- Top 3 restaurants by revenue

---

## 🛠 Tech Stack

Frontend:
- React (Vite)
- Framer Motion

Backend:
- Pure PHP
- REST-style API
- JSON mock dataset

---

## 📂 Project Structure

restaurant-analytics/
│
├── frontend/
├── backend/
│   ├── public/
│   │   └── index.php
│   ├── src/
│   ├── data/
│
└── README.md

---

## ⚙️ Run Locally

### Backend

cd backend/public
php -S 127.0.0.1:8000
C:\xampp\php\php.exe -S 127.0.0.1:8000 -t .  

### Frontend

cd frontend
npm install
npm run dev

---

## 🔌 API Endpoints

GET /index.php?path=restaurants  
GET /index.php?path=orders  
GET /index.php?path=analytics/top-restaurants  
GET /index.php?path=analytics/trends&restaurantId=ID  

---

## 🌍 Deployment

Frontend: Vercel  
Backend: Render  

---

## 👩‍💻 Author

Malti Bhokare
