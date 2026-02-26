🍽️ Restaurant Order Trends Dashboard

A full-stack analytics dashboard for restaurant order insights built using React and PHP.

🚀 Overview

This project provides a complete restaurant analytics system that allows users to:

🔍 View and search restaurants

📅 Apply date range filters

💰 Filter by order amount

🕒 Filter by hour range

📊 Analyze daily orders and revenue

📈 Calculate Average Order Value (AOV)

⏰ Identify peak order hour per day

🏆 View Top 3 restaurants by revenue

🛠 Tech Stack
🔹 Frontend

React (Vite)

Framer Motion

Custom Analytics Utilities

Responsive UI

🔹 Backend

Pure PHP (No Framework)

REST-style API

JSON mock dataset

CORS enabled

📂 Project Structure
restaurant-analytics/
│
├── frontend/        # React frontend (Vite)
│
├── backend/         # PHP backend API
│   ├── public/
│   │   └── index.php
│   ├── src/
│   ├── data/
│
└── README.md
⚙️ Local Setup
1️⃣ Clone the Repository
git clone https://github.com/YOUR_USERNAME/restaurant-analytics.git
cd restaurant-analytics
2️⃣ Run Backend (PHP)

Make sure PHP is installed.

cd backend/public
php -S 127.0.0.1:8000

Backend runs at:

http://127.0.0.1:8000

Test API:

http://127.0.0.1:8000/index.php?path=restaurants
3️⃣ Run Frontend

Open a new terminal:

cd frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173
🔌 API Endpoints
Endpoint	Description
/index.php?path=restaurants	Get all restaurants
/index.php?path=orders	Get all orders
/index.php?path=analytics/top-restaurants	Get top 3 restaurants
/index.php?path=analytics/trends&restaurantId=ID	Get analytics for restaurant
🌍 Deployment
Service	Platform
Frontend	Vercel
Backend	Render (PHP Web Service)
⚡ Performance Considerations

Backend filtering and aggregation logic

Frontend memoization using useMemo

Clean separation of concerns

Scalable API structure

📌 Future Improvements

Database integration (MySQL / PostgreSQL)

Authentication system

Advanced caching

Export reports (CSV / PDF)

👩‍💻 Author

Your Name
GitHub: https://github.com/YOUR_USERNAME
