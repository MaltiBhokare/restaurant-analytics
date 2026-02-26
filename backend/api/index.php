<?php


header("Content-Type: application/json; charset=utf-8");


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
  http_response_code(200);
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
    
    if (function_exists("handle_orders")) {
      echo json_encode(handle_orders(), JSON_UNESCAPED_UNICODE);
      exit;
    }

    
    $file = __DIR__ . "/../data/orders.json";
    if (!file_exists($file)) {
      http_response_code(500);
      echo json_encode(["error" => "orders.json not found"]);
      exit;
    }
    $orders = json_decode(file_get_contents($file), true);
    echo json_encode($orders ?: [], JSON_UNESCAPED_UNICODE);
    exit;
  }

  // ✅ Top restaurants by revenue
  if ($path === "analytics/top-restaurants") {
    echo json_encode(handle_top_restaurants(), JSON_UNESCAPED_UNICODE);
    exit;
  }

  // ✅ Trends for selected restaurant
  if ($path === "analytics/trends") {
    // expects restaurantId
    echo json_encode(handle_trends(), JSON_UNESCAPED_UNICODE);
    exit;
  }

  // ✅ Not found
  http_response_code(404);
  echo json_encode(["error" => "Route not found", "path" => $path], JSON_UNESCAPED_UNICODE);

} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(
    ["error" => "Server error", "message" => $e->getMessage()],
    JSON_UNESCAPED_UNICODE
  );
}