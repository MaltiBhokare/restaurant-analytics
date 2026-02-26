import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import FiltersBar from "../components/filters/FiltersBar";
import RestaurantTable from "../components/RestaurantTable";
import TopRestaurants from "../components/TopRestaurants";
import RestaurantDetails from "../components/RestaurantDetails";

import {
  applyOrderFilters,
  groupDailyMetrics,
  peakHourPerDay,
  topRestaurantsByRevenue,
} from "../lib/analytics";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" },
  }),
};


const API_BASE = "http://127.0.0.1:8000/api/index.php";

export default function Dashboard() {
  
  const [restaurants, setRestaurants] = useState([]);
  const [orders, setOrders] = useState([]);

  const [selected, setSelected] = useState(null);

  const [filters, setFilters] = useState({
    from: "",
    to: "",
    amountMin: undefined,
    amountMax: undefined,
    hourFrom: undefined,
    hourTo: undefined,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const [rRes, oRes] = await Promise.all([
          fetch(`${API_BASE}?path=restaurants`),
          fetch(`${API_BASE}?path=orders`),
        ]);

        if (!rRes.ok) throw new Error("Failed to load restaurants from backend.");
        if (!oRes.ok) throw new Error("Failed to load orders from backend.");

        const rJson = await rRes.json();
        const oJson = await oRes.json();

        if (!alive) return;

        
        setRestaurants(Array.isArray(rJson) ? rJson : rJson.data || []);
        setOrders(Array.isArray(oJson) ? oJson : oJson.data || []);
      } catch (e) {
        if (!alive) return;
        setError(e?.message || "Backend error");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  
  useEffect(() => {
    if (!selected) return;
    const stillExists = restaurants.some((r) => r.id === selected.id);
    if (!stillExists) setSelected(null);
  }, [restaurants, selected]);

 
  const filteredOrders = useMemo(() => {
    return applyOrderFilters(orders, filters, selected?.id);
  }, [orders, filters, selected?.id]);

  const daily = useMemo(() => groupDailyMetrics(filteredOrders), [filteredOrders]);
  const peak = useMemo(() => peakHourPerDay(filteredOrders), [filteredOrders]);

  
  const top3 = useMemo(() => {
    const allInRange = applyOrderFilters(orders, filters);
    return topRestaurantsByRevenue(restaurants, allInRange, 3);
  }, [orders, filters, restaurants]);

  return (
    <div className="container">
      <motion.h1 className="h1" variants={fadeUp} initial="hidden" animate="show" custom={0}>
        Restaurant Order Trends Dashboard
      </motion.h1>

      
      {loading ? (
        <div className="card" style={{ padding: 14 }}>
          Loading data from PHP backend...
          <div className="small-muted" style={{ marginTop: 6 }}>
            Checking: {API_BASE}?path=restaurants and {API_BASE}?path=orders
          </div>
        </div>
      ) : error ? (
        <div className="card" style={{ padding: 14, borderColor: "rgba(255,0,0,0.25)" }}>
          <div style={{ fontWeight: 800, color: "var(--textStrong)" }}>Backend Error</div>
          <div className="small-muted" style={{ marginTop: 6 }}>{error}</div>

          <div className="small-muted" style={{ marginTop: 10 }}>
            Fix checklist:
            <ul style={{ margin: "6px 0 0 18px" }}>
              <li>Open in browser: <b>{API_BASE}?path=restaurants</b></li>
              <li>Open in browser: <b>{API_BASE}?path=orders</b></li>
              <li>If blocked: add CORS headers in backend/api/index.php</li>
            </ul>
          </div>
        </div>
      ) : (
        <>
          <motion.div className="card" variants={fadeUp} initial="hidden" animate="show" custom={1}>
            <FiltersBar filters={filters} setFilters={setFilters} />
          </motion.div>

          <div className="grid2" style={{ marginTop: 16 }}>
            <motion.div className="card" variants={fadeUp} initial="hidden" animate="show" custom={2}>
              <h2 style={{ margin: "0 0 12px", color: "var(--textStrong)" }}>Restaurants</h2>

              <RestaurantTable
                restaurants={restaurants}
                selectedId={selected?.id}
                onSelect={(r) => setSelected(r)}
              />
            </motion.div>

            <motion.div className="card" variants={fadeUp} initial="hidden" animate="show" custom={3}>
              <TopRestaurants top3={top3} />
            </motion.div>
          </div>

          <motion.div
            className="card"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            style={{ marginTop: 16 }}
          >
            <RestaurantDetails restaurant={selected} daily={daily} peak={peak} />
          </motion.div>
        </>
      )}
    </div>
  );
}