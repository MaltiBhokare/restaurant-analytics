import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 10 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.06, ease: "easeOut" },
  }),
};

const formatINR = (n) => {
  const num = Number(n || 0);
  return num.toLocaleString("en-IN");
};

export default function TopRestaurants({ top3 = [] }) {
  return (
    <div>
      <h2 style={{ margin: "0 0 10px", color: "var(--textStrong)" }}>
        Top 3 by Revenue
      </h2>

      {top3.length === 0 ? (
        <div className="small-muted" style={{ padding: 8 }}>
          No data for selected filters.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {top3.map((r, idx) => (
            <motion.div
              key={r.id}
              variants={item}
              initial="hidden"
              animate="show"
              whileHover={{ y: -2, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              custom={idx}
              style={{
                border: "1px solid var(--border)",
                borderRadius: 14,
                padding: 12,
                background:
                  "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(34,211,238,0.07))",
                boxShadow: "0 10px 26px rgba(0,0,0,0.35)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}
              >
               
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 800,
                      color: "var(--textStrong)",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 28,
                        height: 28,
                        borderRadius: 999,
                        border: "1px solid rgba(255,255,255,0.16)",
                        background:
                          idx === 0
                            ? "linear-gradient(135deg, rgba(124,58,237,0.35), rgba(34,211,238,0.25))"
                            : "rgba(255,255,255,0.05)",
                        boxShadow:
                          idx === 0
                            ? "0 0 18px rgba(34,211,238,0.18)"
                            : "none",
                        fontSize: 12,
                      }}
                    >
                      {idx + 1}
                    </span>

                    <span
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      title={r.name}
                    >
                      {r.name}
                    </span>
                  </div>

                  <div className="small-muted" style={{ marginTop: 4 }}>
                    {r.location} • {r.cuisine}
                  </div>
                </div>

                
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div
                    style={{
                      fontWeight: 900,
                      fontSize: 18,
                      color: "var(--textStrong)",
                      textShadow: "0 0 18px rgba(34,211,238,0.16)",
                    }}
                  >
                    ₹{formatINR(r.revenue)}
                  </div>
                  <div className="small-muted">Revenue</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}