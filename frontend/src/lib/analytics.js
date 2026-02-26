// src/lib/analytics.js

// ✅ Filters orders by: restaurantId, date range, amount range, hour range
export function applyOrderFilters(orders, filters = {}, restaurantId) {
  if (!Array.isArray(orders)) return [];

  const amountMin = filters.amountMin ?? null;
  const amountMax = filters.amountMax ?? null;
  const hourFrom = filters.hourFrom ?? null;
  const hourTo = filters.hourTo ?? null;

  // ✅ If from/to empty → auto use dataset min/max
  let fromISO = (filters.from || "").trim();
  let toISO = (filters.to || "").trim();

  if (!fromISO || !toISO) {
    let min = null;
    let max = null;

    for (const o of orders) {
      const d = o.order_time.slice(0, 10);
      if (!min || d < min) min = d;
      if (!max || d > max) max = d;
    }

    if (!fromISO) fromISO = min;
    if (!toISO) toISO = max;
  }

  return orders.filter((o) => {
    const day = o.order_time.slice(0, 10);
    const hour = new Date(o.order_time).getHours();

    if (restaurantId != null && o.restaurant_id !== restaurantId) return false;

    if (fromISO && day < fromISO) return false;
    if (toISO && day > toISO) return false;

    if (amountMin != null && o.order_amount < amountMin) return false;
    if (amountMax != null && o.order_amount > amountMax) return false;

    if (hourFrom != null && hour < hourFrom) return false;
    if (hourTo != null && hour > hourTo) return false;

    return true;
  });
}

// ✅ Daily metrics: { date, orders, revenue, aov }
export function groupDailyMetrics(orders = []) {
  const map = new Map();

  for (const o of orders) {
    const date = o.order_time.slice(0, 10);
    if (!map.has(date)) map.set(date, { date, orders: 0, revenue: 0 });

    const row = map.get(date);
    row.orders += 1;
    row.revenue += Number(o.order_amount) || 0;
  }

  return Array.from(map.values())
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((r) => ({
      ...r,
      aov: r.orders ? r.revenue / r.orders : 0,
    }));
}

// ✅ Peak hour per day: { date, peakHour, ordersAtPeak }
export function peakHourPerDay(orders = []) {
  const dayHourCount = new Map();

  for (const o of orders) {
    const day = o.order_time.slice(0, 10);
    const hour = new Date(o.order_time).getHours();

    if (!dayHourCount.has(day)) dayHourCount.set(day, new Map());
    const hm = dayHourCount.get(day);
    hm.set(hour, (hm.get(hour) || 0) + 1);
  }

  const result = [];
  for (const [day, hm] of dayHourCount.entries()) {
    let bestHour = 0;
    let bestCount = -1;

    for (const [h, c] of hm.entries()) {
      if (c > bestCount) {
        bestCount = c;
        bestHour = h;
      }
    }

    result.push({
      date: day,
      peakHour: bestHour,
      ordersAtPeak: Math.max(0, bestCount),
    });
  }

  return result.sort((a, b) => a.date.localeCompare(b.date));
}

// ✅ Top restaurants by revenue in given filtered orders
export function topRestaurantsByRevenue(restaurants = [], orders = [], topN = 3) {
  const revenueMap = new Map();

  for (const o of orders) {
    const rid = o.restaurant_id;
    revenueMap.set(rid, (revenueMap.get(rid) || 0) + (Number(o.order_amount) || 0));
  }

  return restaurants
    .map((r) => ({ ...r, revenue: revenueMap.get(r.id) || 0 }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, topN);
}