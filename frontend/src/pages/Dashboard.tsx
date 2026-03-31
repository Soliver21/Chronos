import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import Dashbar from "../components/dashboard/Dashbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Clock, Package, Star, TrendingUp, TrendingDown,
  ArrowUpRight, CheckCircle, XCircle, AlertCircle, Plus
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { getUserById, getUserStats } from "../services/user.service";
import { getMyListings } from "../services/listing.service";
import { getMyTransactions } from "../services/transaction.service";
import type { User, UserStats } from "../types/user.types";
import type { Listing } from "../types/listing.types";
import type { Transaction } from "../types/transaction.types";
function buildBalanceChartData(transactions: Transaction[], userId: number, currentBalance: number) {
  // időrendbe állítva
  const completed = transactions
    .filter((tx) => tx.status === "COMPLETED")
    .sort((a, b) => new Date(a.completedAt ?? a.updatedAt).getTime() - new Date(b.completedAt ?? b.updatedAt).getTime());

  if (completed.length === 0) return [];

  // Visszaszámoljuk a kezdő egyenleget a jelenlegiből
  const totalChange = completed.reduce((sum, tx) => {
    const isProvider = tx.provider?.id === userId;
    return sum + (isProvider ? tx.totalPrice : -tx.totalPrice);
  }, 0);

  let runningBalance = currentBalance - totalChange;

  // Létrehozzuk a grafikon pontjait tranzakciónként, kicsit komplikáltabb a logika, utánanézek hogyan lehet ezt egyszerűsíteni (olivér)
  const chartData = completed.map((tx) => {
    const date = new Date(tx.completedAt ?? tx.updatedAt);
    const isProvider = tx.provider?.id === userId;
    const change = isProvider ? tx.totalPrice : -tx.totalPrice;

    runningBalance += change;

    return {
      label: date.toLocaleDateString("hu-HU", { month: "short", day: "numeric" }),
      egyenleg: runningBalance,
      változás: change
    };
  });

  // Ha csak 1 tranzakció van, adjunk hozzá egy "Kezdet" pontot, hogy a grafikon vonalat tudjon húzni, és ne csak egy pontot mutasson (ez a legegyszerűbb megoldás a "grafikon vonal nélküli pont" problémára) (olivér)
  if (chartData.length === 1) {
    chartData.unshift({
      label: "Kezdet",
      egyenleg: currentBalance - chartData[0].változás,
      változás: 0
    });
  }

  return chartData;
}

const CustomTooltip = ({ active, payload, label, isDark }: any) => {
  if (!active || !payload?.length) return null;
  const val = payload[0]?.value ?? 0;
  const change = payload[0]?.payload?.változás ?? 0;
  const bg = isDark ? "bg-[#1a1a2e] border-white/10" : "bg-white border-gray-200";
  const textCls = isDark ? "text-white" : "text-gray-900";
  const subCls = isDark ? "text-gray-400" : "text-gray-500";

  return (
    <div className={`rounded-xl border px-4 py-3 shadow-xl text-sm ${bg}`}>
      <p className={`font-bold mb-1 ${textCls}`}>{label}</p>
      <p className={`${textCls}`}>Egyenleg: <span className="font-bold text-indigo-400">{val} óra</span></p>
      {change !== 0 && (
        <p className={subCls}>
          Változás: <span className={`font-semibold ${change > 0 ? "text-green-400" : "text-red-400"}`}>
            {change > 0 ? "+" : ""}{change} óra
          </span>
        </p>
      )}
    </div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isDark = theme === "dark";

  const [profileData, setProfileData] = useState<User | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [userListings, setUserListings] = useState<Listing[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userData, statsData, listingsData, txData] = await Promise.all([
          getUserById(user.id),
          getUserStats(user.id),
          getMyListings(),
          getMyTransactions(),
        ]);
        setProfileData(userData);
        setStats(statsData);
        setUserListings(listingsData);
        setTransactions(txData);
      } catch (err) {
        console.error("Hiba a dashboard adatok betöltésekor:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user?.id]);

  const chartData = useMemo(() => {
    if (!user?.id || !profileData) return [];
    return buildBalanceChartData(transactions, user.id, profileData.balance);
  }, [transactions, user?.id, profileData]);

  // Tranzakció statisztikák
  const pendingCount = transactions.filter((tx) => tx.status === "PENDING").length;
  const completedCount = transactions.filter((tx) => tx.status === "COMPLETED").length;
  const recentTx = [...transactions]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const pageBg = isDark ? "bg-[#0a0a0a] text-white" : "bg-white text-gray-900";
  const cardBg = isDark ? "bg-[#0f0f14] border-white/10" : "bg-white border-gray-200";
  const subText = isDark ? "text-gray-400" : "text-gray-500";
  const dividerCls = isDark ? "border-white/5" : "border-gray-100";
  const gridLine = isDark ? "#1f1f2e" : "#f0f0f0";
  const axisColor = isDark ? "#4b5563" : "#9ca3af";

  if (loading) {
    return (
      <div className={`min-h-screen flex flex-col ${pageBg}`}>
        <Dashbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className={`text-sm font-medium ${subText}`}>Adatok betöltése...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${pageBg}`}>
      <Dashbar />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full space-y-6">
        {/* Fejléc */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Üdvözöljük, {profileData?.name || user?.name || "Felhasználó"}!
            </h1>
            <p className={`mt-1 text-sm ${subText}`}>
              Áttekintés a fiókja aktuális állapotáról.
            </p>
          </div>
          <Button
            onClick={() => navigate("/listings")}
            className="w-full sm:w-auto bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:opacity-90 text-white font-bold px-6 h-10 shadow-lg shadow-indigo-600/20 flex items-center gap-2"
          >
            <Plus size={16} /> Új hirdetés feladása
          </Button>
        </div>

        {/* Statisztikák */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard isDark={isDark} title="Jelenlegi egyenleg" value={`${profileData?.balance ?? 0} óra`} icon={<Clock size={20} className="text-indigo-400" />} />
          <StatCard isDark={isDark} title="Folyamatban lévő tranzakciók" value={pendingCount} icon={<AlertCircle size={20} className="text-yellow-400" />} />
          <StatCard isDark={isDark} title="Teljesített tranzakciók" value={completedCount} icon={<CheckCircle size={20} className="text-green-400" />} />
          <StatCard isDark={isDark} title="Aktív hirdetések" value={userListings.length} icon={<Package size={20} className="text-purple-400" />} />
        </div>

        {/* Grafikon + Tranzakciók */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className={`lg:col-span-2 shadow-xl ${cardBg}`}>
            <CardHeader className={`border-b pb-4 ${dividerCls}`}>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold">Egyenleg alakulása</CardTitle>
                  <CardDescription className={`text-xs mt-0.5 ${subText}`}>
                    Lezárt tranzakciók alapján
                  </CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-indigo-400">{profileData?.balance ?? 0}</p>
                  <p className={`text-xs ${subText}`}>jelenlegi egyenleg (óra)</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 pb-2">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#667eea" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#667eea" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridLine} vertical={false} />
                    <XAxis dataKey="label" hide />
                    <YAxis tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}h`} />
                    <Tooltip content={<CustomTooltip isDark={isDark} />} />
                    <Area type="monotone" dataKey="egyenleg" stroke="#667eea" strokeWidth={2.5} fill="url(#balanceGrad)" dot={{ fill: "#667eea", strokeWidth: 0, r: 4 }} activeDot={{ r: 6, fill: "#667eea" }} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className={`h-[240px] flex flex-col items-center justify-center gap-3 ${subText}`}>
                  <TrendingUp size={40} className="opacity-20 text-indigo-500" />
                  <p className="text-sm font-medium">Még nincs lezárt tranzakció a grafikonhoz.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Legutóbbi tranzakciók */}
          <Card className={`shadow-xl flex flex-col ${cardBg}`}>
            <CardHeader className={`border-b pb-4 ${dividerCls}`}>
              <CardTitle className="text-base font-bold">Legutóbbi tranzakciók</CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1">
              {recentTx.length > 0 ? (
                <div>
                  {recentTx.map((tx, i) => {
                    const isProvider = tx.provider?.id === user?.id;
                    const isLast = i === recentTx.length - 1;
                    const statusIcon =
                      tx.status === "COMPLETED" ? <CheckCircle size={14} className="text-green-500" /> :
                        tx.status === "CANCELLED" ? <XCircle size={14} className="text-red-400" /> :
                          <AlertCircle size={14} className="text-yellow-500" />;
                    const amountCls = isProvider ? "text-green-400" : "text-red-400";

                    return (
                      <div key={tx.id} className={`px-5 py-4 flex items-center gap-3 ${!isLast ? `border-b ${dividerCls}` : ""}`}>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold truncate ${isDark ? "text-gray-200" : "text-gray-800"}`}>
                            {tx.listing?.title ?? tx.listingTitle ?? `Tranzakció #${tx.id}`}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {statusIcon}
                            <p className={`text-xs ${subText}`}>{new Date(tx.createdAt).toLocaleDateString("hu-HU")}</p>
                          </div>
                        </div>
                        <p className={`text-sm font-bold flex-shrink-0 ${amountCls}`}>
                          {isProvider ? "+" : "-"}{tx.totalPrice} h
                        </p>
                      </div>
                    );
                  })}
                  <div className={`px-5 py-3 border-t ${dividerCls}`}>
                    <button onClick={() => navigate("/profile")} className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 transition-colors">
                      Összes megtekintése <ArrowUpRight size={12} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className={`p-8 h-full flex flex-col items-center justify-center ${subText}`}>
                  <p className="text-sm">Még nincs tranzakció.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className={`lg:col-span-2 shadow-xl ${cardBg}`}>
            <CardHeader className={`border-b pb-4 ${dividerCls}`}>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold">Aktív hirdetések</CardTitle>
                <button onClick={() => navigate("/listings")} className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1">
                  Piactér <ArrowUpRight size={12} />
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {userListings.length > 0 ? (
                <div>
                  {userListings.slice(0, 4).map((listing, i) => {
                    const isLast = i === Math.min(userListings.length, 4) - 1;
                    const typeCls = listing.type === "OFFER" ? "bg-green-500/10 text-green-500" : "bg-blue-500/10 text-blue-400";
                    return (
                      <div key={listing.id} className={`px-5 py-3.5 flex items-center gap-4 ${!isLast ? `border-b ${dividerCls}` : ""}`}>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold truncate ${isDark ? "text-gray-200" : "text-gray-800"}`}>{listing.title}</p>
                          <p className={`text-xs mt-0.5 ${subText}`}>{listing.category?.name}</p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${typeCls}`}>
                            {listing.type === "OFFER" ? "Ajánlat" : "Kereslet"}
                          </span>
                          <p className="text-sm font-bold text-indigo-400">{listing.pricePerHour} h</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className={`p-8 text-center ${subText}`}>
                  <p className="text-sm mb-3">Még nincs aktív hirdetése.</p>
                  <button onClick={() => navigate("/listings")} className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold underline">
                    Hirdetés feladása
                  </button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className={`shadow-xl ${cardBg}`}>
            <CardHeader className={`border-b pb-4 ${dividerCls}`}>
              <CardTitle className="text-base font-bold">Összesítő</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              {[
                { label: "Összes tranzakció", value: transactions.length, icon: <TrendingUp size={15} className="text-indigo-400" /> },
                { label: "Megszerzett órák", value: `+${transactions.filter((tx) => tx.status === "COMPLETED" && tx.provider?.id === user?.id).reduce((s, tx) => s + tx.totalPrice, 0)} h`, icon: <TrendingUp size={15} className="text-green-400" /> },
                { label: "Elköltött órák", value: `-${transactions.filter((tx) => tx.status === "COMPLETED" && tx.client?.id === user?.id).reduce((s, tx) => s + tx.totalPrice, 0)} h`, icon: <TrendingDown size={15} className="text-red-400" /> },
                {
                  label: "Átlag értékelés",

                  value: stats?.averageRating && stats.averageRating > 0
                    ? (
                      <span className="flex items-center gap-1.5">
                        {Number(stats.averageRating).toFixed(1)} / 5

                        <Star className="text-violet-500 w-4 h-4" />
                      </span>
                    )
                    : "–",
                  icon: <Star size={15} className="text-violet-500" />
                },
                { label: "Bizalmi szint", value: profileData?.trustLevel ?? "NEWCOMER", icon: <CheckCircle size={15} className="text-purple-400" /> },
              ].map(({ label, value, icon }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <div className={`flex items-center gap-2 ${subText}`}>{icon} {label}</div>
                  <span className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, icon, isDark }: any) => (
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

export default Dashboard;