<?php
// backend/src/data.php

function load_json($filename) {
  $path = __DIR__ . "/../data/" . $filename;
  if (!file_exists($path)) {
    throw new Exception("Missing data file: " . $path);
  }
  $raw = file_get_contents($path);
  $data = json_decode($raw, true);

  if (!is_array($data)) {
    throw new Exception("Invalid JSON in " . $filename);
  }
  return $data;
}

function get_restaurants() {
  static $restaurants = null;
  if ($restaurants === null) $restaurants = load_json("restaurants.json");
  return $restaurants;
}

function get_orders() {
  static $orders = null;
  if ($orders === null) $orders = load_json("orders.json");
  return $orders;
}