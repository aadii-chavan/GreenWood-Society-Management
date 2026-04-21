import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Resolved", value: 64, color: "hsl(var(--primary))" },
  { name: "In Progress", value: 22, color: "hsl(var(--primary-glow))" },
  { name: "Pending", value: 14, color: "hsl(var(--muted-foreground) / 0.25)" },
];

export const ComplaintAnalytics = () => {
  return (
    <div className="surface-card p-6">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="eyebrow">Analytics</p>
          <h3 className="display-text text-[19px] font-bold mt-1.5">Complaint Status</h3>
        </div>
        <span className="text-[11px] font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
          Last 30 days
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 items-center mt-4">
        <div className="relative h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={58}
                outerRadius={86}
                paddingAngle={3}
                cornerRadius={6}
                dataKey="value"
                stroke="none"
              >
                {data.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="display-text text-[28px] font-bold leading-none tabular-nums">64%</p>
            <p className="text-[10.5px] text-muted-foreground mt-1.5 tracking-wide">RESOLVED</p>
          </div>
        </div>

        <div className="flex flex-col gap-3.5">
          {data.map((d) => (
            <div key={d.name}>
              <div className="flex items-center justify-between text-[12.5px]">
                <span className="inline-flex items-center gap-2 text-foreground">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ background: d.color }} />
                  {d.name}
                </span>
                <span className="font-semibold tabular-nums">{d.value}%</span>
              </div>
              <div className="h-1 mt-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${d.value}%`, background: d.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
