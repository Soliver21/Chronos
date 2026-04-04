import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface StatCardProps {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  isDark: boolean;
}

// Statisztikai összefoglaló kártya – dashboard tetején
const StatCard = ({ title, value, icon, isDark }: StatCardProps) => (
  <Card className={`hover:border-indigo-500/30 transition-all shadow-xl ${isDark ? "bg-[#0f0f14] border-white/10" : "bg-white border-gray-200"}`}>
    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
      <CardTitle className="text-xs uppercase tracking-widest font-bold text-gray-500">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className={`text-2xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>{value}</div>
    </CardContent>
  </Card>
);

export default StatCard;
