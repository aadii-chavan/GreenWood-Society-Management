import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowUpRight } from "lucide-react";

const data = [
  { month: "Jan", collected: 420, pending: 80 },
  { month: "Feb", collected: 480, pending: 70 },
  { month: "Mar", collected: 510, pending: 95 },
  { month: "Apr", collected: 460, pending: 60 },
  { month: "May", collected: 540, pending: 110 },
  { month: "Jun", collected: 590, pending: 75 },
  { month: "Jul", collected: 620, pending: 90 },
  { month: "Aug", collected: 580, pending: 100 },
  { month: "Sep", collected: 650, pending: 65 },
];

export const RevenueChart = () => {
  return (
    <div className="surface-card p-6">
      <div className="flex items-start justify-between mb-1">
        <div>
          <p className="eyebrow">Revenue · YTD</p>
          <h3 className="display-text text-[19px] font-bold mt-1.5">Maintenance Collection</h3>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="display-text text-[26px] font-bold tabular-nums leading-none">₹48.5L</span>
            <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-success bg-success/10 px-1.5 py-0.5 rounded-md">
              <ArrowUpRight className="h-3 w-3" /> 12.4%
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[11.5px]">
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <span className="h-2 w-2 rounded-sm bg-primary" />
            Collected
          </span>
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <span className="h-2 w-2 rounded-sm bg-muted-foreground/30" />
            Pending
          </span>
        </div>
      </div>

      <div className="h-[244px] mt-6 -ml-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap={22}>
            <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeDasharray="3 4" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              dy={6}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={(v) => `₹${v}k`}
              width={48}
            />
            <Tooltip
              cursor={{ fill: "hsl(var(--muted))", radius: 10 }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid hsl(var(--border))",
                background: "hsl(var(--card))",
                fontSize: 12,
                fontWeight: 500,
                boxShadow: "var(--shadow-card)",
                padding: "8px 12px",
              }}
              labelStyle={{ fontWeight: 600, marginBottom: 4 }}
              formatter={(v: number) => [`₹${v}k`, ""]}
            />
            <Bar dataKey="pending" stackId="a" fill="hsl(var(--muted-foreground) / 0.2)" radius={[0, 0, 6, 6]} />
            <Bar dataKey="collected" stackId="a" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
