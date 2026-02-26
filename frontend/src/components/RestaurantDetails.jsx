import { motion, AnimatePresence } from "framer-motion";
import DailyOrdersChart from "./charts/DailyOrdersChart";
import DailyRevenueChart from "./charts/DailyRevenueChart";
import AvgOrderValueChart from "./charts/AvgOrderValueChart";
import PeakHourTable from "./charts/PeakHourTable";

export default function RestaurantDetails({ restaurant, daily = [], peak = [] }) {
  const hasDaily = Array.isArray(daily) && daily.length > 0;
  const hasPeak = Array.isArray(peak) && peak.length > 0;

  return (
    <div>
      <AnimatePresence mode="wait">
        {!restaurant ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="small-muted"
            style={{ padding: 8 }}
          >
            Select a restaurant to view trends.
          </motion.div>
        ) : (
          <motion.div
            key={restaurant.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            {/* Header */}
            <div>
              <h2 style={{ margin: 0, color: "var(--textStrong)" }}>
                {restaurant.name}
              </h2>
              <div className="small-muted">
                {restaurant.location} • {restaurant.cuisine}
              </div>
            </div>

            {/* Charts */}
            {!hasDaily ? (
              <div className="small-muted" style={{ padding: 8 }}>
                No daily data for selected filters.
              </div>
            ) : (
              <div className="grid3">
                <div className="card" style={{ padding: 12 }}>
                  <DailyOrdersChart data={daily} />
                </div>
                <div className="card" style={{ padding: 12 }}>
                  <DailyRevenueChart data={daily} />
                </div>
                <div className="card" style={{ padding: 12 }}>
                  <AvgOrderValueChart data={daily} />
                </div>
              </div>
            )}

            {/* Peak hour table */}
            <div className="card" style={{ padding: 12 }}>
              {!hasPeak ? (
                <div className="small-muted" style={{ padding: 8 }}>
                  No peak-hour data for selected filters.
                </div>
              ) : (
                <PeakHourTable data={peak} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}