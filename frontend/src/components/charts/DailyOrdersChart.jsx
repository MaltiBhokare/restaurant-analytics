import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function DailyOrdersChart({ data = [] }) {
  return (
    <div>
      <h3 style={{ margin: "0 0 8px", color: "var(--textStrong)" }}>Daily Orders</h3>

      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" stroke="rgba(255,255,255,0.55)" />
            <YAxis allowDecimals={false} stroke="rgba(255,255,255,0.55)" />
            <Tooltip
              contentStyle={{ background: "#0f0f10", border: "1px solid rgba(255,255,255,0.12)" }}
              labelStyle={{ color: "white" }}
            />
            {/* ✅ FIX: orders */}
            <Line dataKey="orders" stroke="#22d3ee" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}