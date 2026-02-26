export default function PeakHourTable({ data = [] }) {
  return (
    <div>
      <h3 style={{ margin: "0 0 8px", color: "var(--textStrong)" }}>
        Peak Order Hour (per day)
      </h3>

      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Peak Hour</th>
              <th>Orders at Peak</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="3" className="small-muted" style={{ padding: 12 }}>
                  No data available
                </td>
              </tr>
            ) : (
              data.map((r) => (
                <tr key={r.date}>
                  <td>{r.date}</td>
                  <td>{String(r.peakHour).padStart(2, "0")}:00</td>
                  {/* ✅ FIX: ordersAtPeak */}
                  <td>{r.ordersAtPeak}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}