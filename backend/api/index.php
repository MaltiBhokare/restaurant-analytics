<?php
// backend/api/index.php

// ✅ ALWAYS set headers before any output
header("Content-Type: application/json; charset=utf-8");

// ✅ CORS (allow your Vercel app)
$allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://restaurant-analytics-rl5r.vercel.app"
];

$origin = $_SERVER["HTTP_ORIGIN"] ?? "";

if (in_array($origin, $allowedOrigins, true)) {
  header("Access-Control-Allow-Origin: " . $origin);
  header("Vary: Origin"); // important for caches/CDN
} else {
  // fallback (some hosts strip dynamic origins)
  header("Access-Control-Allow-Origin: *");
}

header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// ✅ Handle preflight
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
  http_response_code(204);
  exit;
}

require_once __DIR__ . "/../src/helpers.php";
require_once __DIR__ . "/../src/data.php";
require_once __DIR__ . "/../src/analytics.php";

$path = $_GET["path"] ?? "";
$path = trim($path, "/");

try {
  if ($path === "" || $path === "health") {
    echo json_encode(["ok" => true, "message" => "PHP API is running"], JSON_UNESCAPED_UNICODE);
    exit;
  }

  if ($path === "restaurants") {
    echo json_encode(handle_restaurants(), JSON_UNESCAPED_UNICODE);
    exit;
  }

  if ($path === "orders") {
    // if you have handle_orders in analytics.php or data.php
    if (function_exists("handle_orders")) {
      echo json_encode(handle_orders(), JSON_UNESCAPED_UNICODE);
      exit;
    }

    $file = __DIR__ . "/../data/orders.json";
    if (!file_exists($file)) {
      http_response_code(500);
      echo json_encode(["error" => "orders.json not found"], JSON_UNESCAPED_UNICODE);
      exit;
    }

    $orders = json_decode(file_get_contents($file), true);
    echo json_encode(["data" => ($orders ?: [])], JSON_UNESCAPED_UNICODE);
    exit;
  }

  if ($path === "analytics/top-restaurants") {
    echo json_encode(handle_top_restaurants(), JSON_UNESCAPED_UNICODE);
    exit;
  }

  if ($path === "analytics/trends") {
    echo json_encode(handle_trends(), JSON_UNESCAPED_UNICODE);
    exit;
  }

  http_response_code(404);
  echo json_encode(["error" => "Route not found", "path" => $path], JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(["error" => "Server error", "message" => $e->getMessage()], JSON_UNESCAPED_UNICODE);
}