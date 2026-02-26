
🍽️ Restaurant Order Trends Dashboard

A full-stack analytics dashboard for restaurant order insights built using React (Vite) and Pure PHP.

🚀 Project Overview

This project provides a complete analytics system for restaurant order data.
Users can analyze restaurant performance using filters and trend visualizations.

✨ Features

View list of restaurants

Search and select restaurants

Filter by date range

Filter by order amount range

Filter by hour range

Daily Orders count

Daily Revenue

Average Order Value (AOV)

Peak Order Hour per day

Top 3 Restaurants by Revenue

🛠 Tech Stack
Frontend

React (Vite)

Framer Motion

Custom Analytics Logic

Responsive UI Design

Backend

Pure PHP (No Laravel / No Framework)

REST-style API

JSON-based mock dataset

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
⚙️ How to Run Locally
1️⃣ Clone Repository
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

Frontend deployed on Vercel

Backend deployed on Render (PHP Web Service)

⚡ Performance Considerations

Backend aggregation logic for filtering and analytics

Frontend memoization using useMemo

Clean separation between frontend and backend

Easily extendable to database integration

📌 Future Improvements

Database integration (MySQL / PostgreSQL)

Authentication system

Caching layer

Export reports (CSV / PDF)

👩‍💻 Author

Malti Bhokare
GitHub: https://github.com/YOUR_USERNAME
