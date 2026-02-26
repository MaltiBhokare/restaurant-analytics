<?php


function q($key, $default = null) {
  return isset($_GET[$key]) ? $_GET[$key] : $default;
}

function to_int_or_null($v) {
  if ($v === null || $v === "") return null;
  if (!is_numeric($v)) return null;
  return (int)$v;
}

function to_float_or_null($v) {
  if ($v === null || $v === "") return null;
  if (!is_numeric($v)) return null;
  return (float)$v;
}

function clamp_hour($h) {
  if ($h === null) return null;
  return max(0, min(23, (int)$h));
}


function cache_get($key, $ttlSeconds) {
  $dir = sys_get_temp_dir() . "/php_rest_cache";
  $file = $dir . "/" . md5($key) . ".json";

  if (!file_exists($file)) return null;

  $age = time() - filemtime($file);
  if ($age > $ttlSeconds) return null;

  $raw = file_get_contents($file);
  $decoded = json_decode($raw, true);
  return $decoded;
}


function cache_set($key, $data) {
  $dir = sys_get_temp_dir() . "/php_rest_cache";
  if (!is_dir($dir)) mkdir($dir, 0777, true);

  $file = $dir . "/" . md5($key) . ".json";
  file_put_contents($file, json_encode($data));
}