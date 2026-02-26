import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function AvgOrderValueChart({ data = [] }) {
  return (
    <div>
      <h3 style={{ margin: "0 0 8px", color: "var(--textStrong)" }}>Average Order Value</h3>

      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" stroke="rgba(255,255,255,0.55)" />
            <YAxis stroke="rgba(255,255,255,0.55)" />
            <Tooltip
              contentStyle={{ background: "#0f0f10", border: "1px solid rgba(255,255,255,0.12)" }}
              labelStyle={{ color: "white" }}
            />
            
            <Line dataKey="aov" stroke="#22d3ee" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}