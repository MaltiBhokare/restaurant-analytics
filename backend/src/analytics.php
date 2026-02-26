<?php


require_once __DIR__ . "/helpers.php";
require_once __DIR__ . "/data.php";


function apply_order_filters($orders, $filters, $restaurantId = null) {
  $amountMin = $filters["amountMin"];
  $amountMax = $filters["amountMax"];
  $hourFrom  = $filters["hourFrom"];
  $hourTo    = $filters["hourTo"];
  $from      = $filters["from"];
  $to        = $filters["to"];

  
  if (!$from || !$to) {
    $min = null; $max = null;
    foreach ($orders as $o) {
      $day = substr($o["order_time"], 0, 10);
      if ($min === null || $day < $min) $min = $day;
      if ($max === null || $day > $max) $max = $day;
    }
    if (!$from) $from = $min;
    if (!$to) $to = $max;
  }

  $out = [];
  foreach ($orders as $o) {
    if ($restaurantId !== null && (int)$o["restaurant_id"] !== (int)$restaurantId) continue;

    $day = substr($o["order_time"], 0, 10);
    
    if ($from && $day < $from) continue;
    if ($to && $day > $to) continue;

    $amt = (float)$o["order_amount"];
    if ($amountMin !== null && $amt < $amountMin) continue;
    if ($amountMax !== null && $amt > $amountMax) continue;

    $hour = (int)date("G", strtotime($o["order_time"]));
    if ($hourFrom !== null && $hour < $hourFrom) continue;
    if ($hourTo !== null && $hour > $hourTo) continue;

    $out[] = $o;
  }

  return $out;
}

function group_daily_metrics($orders) {
  $map = [];

  foreach ($orders as $o) {
    $date = substr($o["order_time"], 0, 10);
    if (!isset($map[$date])) {
      $map[$date] = ["date" => $date, "orders" => 0, "revenue" => 0.0];
    }
    $map[$date]["orders"] += 1;
    $map[$date]["revenue"] += (float)$o["order_amount"];
  }

  ksort($map);

  $result = [];
  foreach ($map as $row) {
    $aov = $row["orders"] ? $row["revenue"] / $row["orders"] : 0;
    $row["aov"] = $aov;
    $result[] = $row;
  }

  return $result;
}


function peak_hour_per_day($orders) {
  $dayHourCount = [];

  foreach ($orders as $o) {
    $day = substr($o["order_time"], 0, 10);
    $hour = (int)date("G", strtotime($o["order_time"]));

    if (!isset($dayHourCount[$day])) $dayHourCount[$day] = [];
    if (!isset($dayHourCount[$day][$hour])) $dayHourCount[$day][$hour] = 0;
    $dayHourCount[$day][$hour] += 1;
  }

  ksort($dayHourCount);

  $result = [];
  foreach ($dayHourCount as $day => $hm) {
    $bestHour = 0;
    $bestCount = -1;

    foreach ($hm as $h => $c) {
      if ($c > $bestCount) {
        $bestCount = $c;
        $bestHour = (int)$h;
      }
    }

    $result[] = [
      "date" => $day,
      "peakHour" => $bestHour,
      "ordersAtPeak" => max(0, (int)$bestCount),
    ];
  }

  return $result;
}


function top_restaurants_by_revenue($restaurants, $orders, $topN = 3) {
  $rev = [];

  foreach ($orders as $o) {
    $rid = (int)$o["restaurant_id"];
    if (!isset($rev[$rid])) $rev[$rid] = 0.0;
    $rev[$rid] += (float)$o["order_amount"];
  }

  $list = [];
  foreach ($restaurants as $r) {
    $id = (int)$r["id"];
    $list[] = array_merge($r, [
      "revenue" => isset($rev[$id]) ? $rev[$id] : 0.0
    ]);
  }

  usort($list, fn($a, $b) => $b["revenue"] <=> $a["revenue"]);
  return array_slice($list, 0, $topN);
}



function read_filters_from_query() {
  return [
    "from" => trim((string)q("from", "")) ?: "",
    "to" => trim((string)q("to", "")) ?: "",
    "amountMin" => to_float_or_null(q("amountMin")),
    "amountMax" => to_float_or_null(q("amountMax")),
    "hourFrom" => clamp_hour(to_int_or_null(q("hourFrom"))),
    "hourTo" => clamp_hour(to_int_or_null(q("hourTo"))),
  ];
}


function handle_restaurants() {
  $restaurants = get_restaurants();

  $search = strtolower(trim((string)q("search", "")));
  $cuisine = trim((string)q("cuisine", ""));
  $location = trim((string)q("location", ""));
  $sort = trim((string)q("sort", "name"));       // name|location|cuisine
  $order = strtolower(trim((string)q("order", "asc"))); // asc|desc

  
  $filtered = array_filter($restaurants, function($r) use ($search, $cuisine, $location) {
    if ($cuisine && ($r["cuisine"] ?? "") !== $cuisine) return false;
    if ($location && ($r["location"] ?? "") !== $location) return false;

    if ($search) {
      $hay = strtolower(($r["name"] ?? "") . " " . ($r["location"] ?? "") . " " . ($r["cuisine"] ?? ""));
      if (strpos($hay, $search) === false) return false;
    }
    return true;
  });

  $filtered = array_values($filtered);

  
  $allowed = ["name", "location", "cuisine", "id"];
  if (!in_array($sort, $allowed, true)) $sort = "name";
  usort($filtered, function($a, $b) use ($sort, $order) {
    $va = $a[$sort] ?? "";
    $vb = $b[$sort] ?? "";
    $cmp = is_numeric($va) && is_numeric($vb) ? ((float)$va <=> (float)$vb) : strcmp((string)$va, (string)$vb);
    return $order === "desc" ? -$cmp : $cmp;
  });

  
  $page = max(1, (int)q("page", 1));
  $perPage = max(1, min(100, (int)q("perPage", 10)));
  $total = count($filtered);
  $start = ($page - 1) * $perPage;
  $items = array_slice($filtered, $start, $perPage);

  return [
    "data" => $items,
    "meta" => [
      "page" => $page,
      "perPage" => $perPage,
      "total" => $total,
      "totalPages" => (int)ceil($total / $perPage),
    ],
  ];
}


function handle_top_restaurants() {
  $filters = read_filters_from_query();
  $topN = max(1, min(20, (int)q("top", 3)));

  $cacheKey = "top_restaurants:" . md5(json_encode([$filters, $topN]));
  $cached = cache_get($cacheKey, 60);
  if ($cached !== null) return $cached;

  $restaurants = get_restaurants();
  $orders = get_orders();

  $filteredOrders = apply_order_filters($orders, $filters);
  $top = top_restaurants_by_revenue($restaurants, $filteredOrders, $topN);

  $resp = ["top" => $top, "filters" => $filters];
  cache_set($cacheKey, $resp);
  return $resp;
}


function handle_trends() {
  $restaurantId = to_int_or_null(q("restaurantId"));
  if ($restaurantId === null) {
    http_response_code(400);
    return ["error" => "restaurantId is required"];
  }

  $filters = read_filters_from_query();

  $cacheKey = "trends:" . $restaurantId . ":" . md5(json_encode($filters));
  $cached = cache_get($cacheKey, 60);
  if ($cached !== null) return $cached;

  $orders = get_orders();
  $filteredOrders = apply_order_filters($orders, $filters, $restaurantId);

  $daily = group_daily_metrics($filteredOrders);
  $peak = peak_hour_per_day($filteredOrders);

  $resp = [
    "restaurantId" => $restaurantId,
    "filters" => $filters,
    "daily" => $daily,
    "peak" => $peak,
    "count" => count($filteredOrders),
  ];

  cache_set($cacheKey, $resp);
  return $resp;
}