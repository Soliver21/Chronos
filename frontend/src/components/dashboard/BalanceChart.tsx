import { TrendingUp } from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import type { Transaction } from "../../types/transaction.types";

// Visszaszámolja az egyenleg alakulását a lezárt tranzakciókból
export function buildBalanceChartData(transactions: Transaction[], userId: number, currentBalance: number) {
  const completed = transactions
    .filter((tx) => tx.status === "COMPLETED")
    .sort((a, b) => new Date(a.completedAt ?? a.updatedAt).getTime() - new Date(b.completedAt ?? b.updatedAt).getTime());

  if (completed.length === 0) return [];

  // Jelenlegi egyenlegből visszafelé számoljuk ki a kiindulópontot
  const totalChange = completed.reduce((sum, tx) => {
    return sum + (tx.provider?.id === userId ? tx.totalPrice : -tx.totalPrice);
  }, 0);

  let running = currentBalance - totalChange;

  const chartData = completed.map((tx) => {
    const change = tx.provider?.id === userId ? tx.totalPrice : -tx.totalPrice;
    running += change;
    return {
      label: new Date(tx.completedAt ?? tx.updatedAt).toLocaleDateString("hu-HU", { month: "short", day: "numeric" }),
      egyenleg: running,
      változás: change,
    };
  });

  // Ha csak 1 pont van, egy "Kezdet" ponttal egészítjük ki, hogy vonalat lehessen húzni
  if (chartData.length === 1) {
    chartData.unshift({ label: "Kezdet", egyenleg: currentBalance - chartData[0].változás, változás: 0 });
  }

  return chartData;
}

// Egyedi tooltip a grafikonhoz
const ChartTooltip = ({ active, payload, label, isDark }: any) => {
  if (!active || !payload?.length) return null;
  const val = payload[0]?.value ?? 0;
  const change = payload[0]?.payload?.változás ?? 0;

  return (
    <div className={`rounded-xl border px-4 py-3 shadow-xl text-sm ${isDark ? "bg-[#1a1a2e] border-white/10" : "bg-white border-gray-200"}`}>
      <p className={`font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>{label}</p>
      <p className={isDark ? "text-white" : "text-gray-900"}>
        Egyenleg: <span className="font-bold text-indigo-400">{val} óra</span>
      </p>
      {change !== 0 && (
        <p className={isDark ? "text-gray-400" : "text-gray-500"}>
          Változás: <span className={`font-semibold ${change > 0 ? "text-green-400" : "text-red-400"}`}>
            {change > 0 ? "+" : ""}{change} óra
          </span>
        </p>
      )}
    </div>
  );
};

interface BalanceChartProps {
  data: ReturnType<typeof buildBalanceChartData>;
  isDark: boolean;
  currentBalance: number;
}

// Egyenleg alakulása grafikon
const BalanceChart = ({ data, isDark, currentBalance }: BalanceChartProps) => {
  const gridLine  = isDark ? "#1f1f2e" : "#f0f0f0";
  const axisColor = isDark ? "#4b5563" : "#9ca3af";

  if (data.length === 0) {
    return (
      <div className={`h-[240px] flex flex-col items-center justify-center gap-3 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
        <TrendingUp size={40} className="opacity-20 text-indigo-500" />
        <p className="text-sm font-medium">Még nincs lezárt tranzakció a grafikonhoz.</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#667eea" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#667eea" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={gridLine} vertical={false} />
        <XAxis dataKey="label" hide />
        <YAxis tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}h`} />
        <Tooltip content={<ChartTooltip isDark={isDark} />} />
        <Area type="monotone" dataKey="egyenleg" stroke="#667eea" strokeWidth={2.5} fill="url(#balanceGrad)"
          dot={{ fill: "#667eea", strokeWidth: 0, r: 4 }} activeDot={{ r: 6, fill: "#667eea" }} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default BalanceChart;
