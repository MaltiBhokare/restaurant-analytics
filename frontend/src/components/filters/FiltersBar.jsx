
export default function FiltersBar({ filters, setFilters }) {
  const clampHour = (v) => {
    const n = Number(v);
    if (Number.isNaN(n)) return undefined;
    return Math.max(0, Math.min(23, n));
  };

  const setFrom = (val) => {
    
    if (filters.to && val && val > filters.to) {
      setFilters({ ...filters, from: val, to: val });
    } else {
      setFilters({ ...filters, from: val });
    }
  };

  const setTo = (val) => {
    
    if (filters.from && val && val < filters.from) {
      setFilters({ ...filters, to: val, from: val });
    } else {
      setFilters({ ...filters, to: val });
    }
  };

  const setAmountMin = (val) => {
    const n = val === "" ? undefined : Number(val);
    const amountMax = filters.amountMax;
    
    if (n != null && amountMax != null && n > amountMax) {
      setFilters({ ...filters, amountMin: n, amountMax: n });
    } else {
      setFilters({ ...filters, amountMin: n });
    }
  };

  const setAmountMax = (val) => {
    const n = val === "" ? undefined : Number(val);
    const amountMin = filters.amountMin;
    
    if (n != null && amountMin != null && n < amountMin) {
      setFilters({ ...filters, amountMax: n, amountMin: n });
    } else {
      setFilters({ ...filters, amountMax: n });
    }
  };

  const setHourFrom = (val) => {
    const n = val === "" ? undefined : clampHour(val);
    const hourTo = filters.hourTo;

    
    if (n != null && hourTo != null && n > hourTo) {
      setFilters({ ...filters, hourFrom: n, hourTo: n });
    } else {
      setFilters({ ...filters, hourFrom: n });
    }
  };

  const setHourTo = (val) => {
    const n = val === "" ? undefined : clampHour(val);
    const hourFrom = filters.hourFrom;

    
    if (n != null && hourFrom != null && n < hourFrom) {
      setFilters({ ...filters, hourTo: n, hourFrom: n });
    } else {
      setFilters({ ...filters, hourTo: n });
    }
  };

  const clearDates = () => setFilters({ ...filters, from: "", to: "" });

  const clearAll = () =>
    setFilters({
      from: "",
      to: "",
      amountMin: undefined,
      amountMax: undefined,
      hourFrom: undefined,
      hourTo: undefined,
    });

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 12,
          alignItems: "end",
        }}
      >
        
        <div className="dateWrap">
          <span className="label">From</span>
          <input
            className="input dateInput"
            type="date"
            value={filters.from || ""}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>

        
        <div className="dateWrap">
          <span className="label">To</span>
          <input
            className="input dateInput"
            type="date"
            value={filters.to || ""}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        
        <div>
          <span className="label">Amount Min</span>
          <input
            className="input"
            type="number"
            placeholder="e.g. 200"
            value={filters.amountMin ?? ""}
            onChange={(e) => setAmountMin(e.target.value)}
          />
        </div>

        
        <div>
          <span className="label">Amount Max</span>
          <input
            className="input"
            type="number"
            placeholder="e.g. 900"
            value={filters.amountMax ?? ""}
            onChange={(e) => setAmountMax(e.target.value)}
          />
        </div>

        
        <div>
          <span className="label">Hour From</span>
          <input
            className="input"
            type="number"
            min={0}
            max={23}
            placeholder="0"
            value={filters.hourFrom ?? ""}
            onChange={(e) => setHourFrom(e.target.value)}
          />
        </div>

       
        <div>
          <span className="label">Hour To</span>
          <input
            className="input"
            type="number"
            min={0}
            max={23}
            placeholder="23"
            value={filters.hourTo ?? ""}
            onChange={(e) => setHourTo(e.target.value)}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
          marginTop: 10,
          flexWrap: "wrap",
        }}
      >
        <div className="small-muted">
          Restaurant filter applies after you click a restaurant.
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button className="button" onClick={clearDates}>
            Clear Dates
          </button>
          <button className="button" onClick={clearAll}>
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}