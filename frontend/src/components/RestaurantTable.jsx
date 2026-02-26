import { motion } from "framer-motion";
import { useMemo, useState } from "react";

export default function RestaurantTable({ restaurants, selectedId, onSelect }) {
  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [cuisine, setCuisine] = useState("");

  const cuisines = useMemo(() => Array.from(new Set(restaurants.map((r) => r.cuisine))), [restaurants]);

  const rows = useMemo(() => {
    const query = q.trim().toLowerCase();

    let data = restaurants.filter((r) => {
      const matchText =
        r.name.toLowerCase().includes(query) ||
        r.location.toLowerCase().includes(query) ||
        r.cuisine.toLowerCase().includes(query);

      const matchCuisine = cuisine ? r.cuisine === cuisine : true;
      return matchText && matchCuisine;
    });

    data.sort((a, b) => {
      const va = String(a[sortKey]).toLowerCase();
      const vb = String(b[sortKey]).toLowerCase();
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return data;
  }, [restaurants, q, cuisine, sortKey, sortDir]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 220px 260px", gap: 10 }}>
        <input
          className="input"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name / location / cuisine..."
        />

        <select className="select" value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
          <option value="">All Cuisines</option>
          {cuisines.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <div style={{ display: "flex", gap: 8 }}>
          <select className="select" value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
            <option value="name">Sort: Name</option>
            <option value="location">Sort: Location</option>
            <option value="cuisine">Sort: Cuisine</option>
          </select>

          <button className="button" onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}>
            {sortDir === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Cuisine</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => {
              const isSelected = selectedId === r.id;

              return (
                <motion.tr
                  key={r.id}
                  onClick={() => onSelect(r)}
                  className={isSelected ? "rowSelected" : ""}
                  style={{ cursor: "pointer" }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.995 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                >
                  <td style={{ fontWeight: 800 }}>{r.name}</td>
                  <td>{r.location}</td>
                  <td>{r.cuisine}</td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {rows.length === 0 && (
        <div className="small-muted" style={{ padding: 8 }}>
          No restaurants match your search/filter.
        </div>
      )}
    </div>
  );
}