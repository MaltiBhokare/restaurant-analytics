<?php

header("Content-Type: application/json; charset=utf-8");


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Max-Age: 86400");


if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
  http_response_code(204);
  exit;
}

require_once __DIR__ . "/../src/helpers.php";
require_once __DIR__ . "/../src/data.php";
require_once __DIR__ . "/../src/analytics.php";


$path = $_GET["path"] ?? "";
$path = trim($path, "/");


function respond($data, int $status = 200) {
  http_response_code($status);
  echo json_encode($data, JSON_UNESCAPED_UNICODE);
  exit;
}

try {
 
  if ($path === "" || $path === "health") {
    respond(["ok" => true, "message" => "PHP API is running"]);
  }

 
  if ($path === "restaurants") {
    respond(handle_restaurants());
  }

  if ($path === "orders") {
    if (function_exists("handle_orders")) {
      respond(handle_orders());
    }

    $file = __DIR__ . "/../data/orders.json";
    if (!file_exists($file)) {
      respond(["error" => "orders.json not found"], 500);
    }

    $orders = json_decode(file_get_contents($file), true);
    respond(["data" => ($orders ?: [])]);
  }

  
  if ($path === "analytics/top-restaurants") {
    respond(handle_top_restaurants());
  }

  
  if ($path === "analytics/trends") {
    respond(handle_trends());
  }

 
  respond(["error" => "Route not found", "path" => $path], 404);

} catch (Throwable $e) {
  respond(["error" => "Server error", "message" => $e->getMessage()], 500);
}