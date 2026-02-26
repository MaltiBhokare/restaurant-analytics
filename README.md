🍽️ Restaurant Order Trends Dashboard

A full-stack analytics dashboard for restaurant order insights.

This project allows users to:

View restaurants

Apply filters

Analyze order trends

View top restaurants by revenue

🔹 Tech Stack
Frontend

React (Vite)

Framer Motion

Custom analytics utilities

Backend

Pure PHP (No Laravel / No Framework)

JSON mock dataset

REST-style API

📁 Project Structure
restaurant-analytics/
│
├── frontend/        # React frontend
│
├── backend/         # PHP backend API
│   ├── public/
│   │   └── index.php
│   ├── src/
│   ├── data/
│
└── README.md
🚀 How to Run Locally
1️⃣ Clone Repository
git clone https://github.com/YOUR_USERNAME/restaurant-analytics.git
cd restaurant-analytics
2️⃣ Run Backend (PHP)

Make sure PHP is installed.

Open terminal:

cd backend/public
php -S 127.0.0.1:8000

Backend will run at:

http://127.0.0.1:8000

Test in browser:

http://127.0.0.1:8000/index.php?path=restaurants
3️⃣ Run Frontend

Open new terminal:

cd frontend
npm install
npm run dev

Frontend will run at:

http://localhost:5173
📊 Features

Restaurant list view

Search and selection

Date range filtering

Order amount filtering

Hour range filtering

Daily Orders count

Daily Revenue

Average Order Value

Peak Order Hour per day

Top 3 Restaurants by Revenue

🔌 API Endpoints
Get Restaurants
GET /index.php?path=restaurants
Get Orders
GET /index.php?path=orders
Get Top Restaurants
GET /index.php?path=analytics/top-restaurants
Get Restaurant Trends
GET /index.php?path=analytics/trends&restaurantId=101
🌍 Deployment

Frontend deployed on Vercel
Backend deployed on Render (PHP Web Service)

⚡ Performance Considerations

Data filtering handled efficiently

Backend aggregation logic

Frontend memoization using useMemo

Clean separation between frontend and backend

📝 Notes

Uses JSON mock dataset (4 restaurants, 200 orders)

Easily extendable to database integration

Designed with scalable API structure

👩‍💻 Author

Your Name
GitHub: https://github.com/YOUR_USERNAME
