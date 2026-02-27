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
<img width="1907" height="956" alt="R1" src="https://github.com/user-attachments/assets/457abab0-9414-48b9-8986-6ff568289524" />
<img width="1907" height="968" alt="R2" src="https://github.com/user-attachments/assets/f4b49f06-80a8-4a2b-8af9-f998b7cadc0f" />
<img width="1907" height="957" alt="R3" src="https://github.com/user-attachments/assets/57647c83-0ac4-46f3-8f42-596e45bdedd1" />



