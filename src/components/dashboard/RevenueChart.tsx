import { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { MOCK_REVENUE } from "@/lib/mockData";

export const RevenueChart = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCollected, setTotalCollected] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/stats/revenue");
        const result = await response.json();
        setData(result);
        
        const total = result.reduce((sum: number, item: any) => sum + Number(item.collected), 0);
        setTotalCollected(total);
      } catch (error) {
        console.warn("Backend not reached for revenue stats, using mock data fallback.");
        setData(MOCK_REVENUE);
        const total = MOCK_REVENUE.reduce((sum: number, item: any) => sum + Number(item.collected), 0);
        setTotalCollected(total);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="surface-card p-6 h-[400px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const formatCurrency = (val: number) => {
    if (val >= 100) return `₹${(val / 100).toFixed(1)}L`;
    return `₹${val.toFixed(1)}K`;
  };

  return (
    <div className="surface-card p-6">
      <div className="flex items-start justify-between mb-1">
        <div>
          <p className="eyebrow">Revenue · YTD</p>
          <h3 className="display-text text-[19px] font-bold mt-1.5">Maintenance Collection</h3>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="display-text text-[26px] font-bold tabular-nums leading-none">{formatCurrency(totalCollected)}</span>
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
