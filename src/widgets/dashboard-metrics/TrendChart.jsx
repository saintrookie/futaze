export function TrendChart({ data, labels, height = 160 }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex gap-2" style={{ height }} role="img" aria-label="Trend over time">
      {data.map((v, i) => (
        <div key={i} className="flex h-full flex-1 flex-col justify-end gap-2">
          <div className="flex flex-1 items-end">
            <div
              className="w-full rounded-t-md bg-accent/80 transition-all duration-slow ease-emphasized"
              style={{ height: `${Math.max(4, (v / max) * 100)}%` }}
            />
          </div>
          {labels && <span className="text-center text-[10px] text-muted">{labels[i]}</span>}
        </div>
      ))}
    </div>
  );
}
