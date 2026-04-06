import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import Dashbar from "../components/dashboard/Dashbar";
import StatCard from "../components/dashboard/StatCard";
import BalanceChart, { buildBalanceChartData } from "../components/dashboard/BalanceChart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Clock, Package, Star, TrendingUp, TrendingDown,
  ArrowUpRight, CheckCircle, XCircle, AlertCircle, Plus,
} from "lucide-react";
import { getUserById, getUserStats } from "../services/user.service";
import { getMyListings } from "../services/listing.service";
import { getMyTransactions } from "../services/transaction.service";
import type { User, UserStats } from "../types/user.types";
import type { Listing } from "../types/listing.types";
import type { Transaction } from "../types/transaction.types";

// Téma-alapú osztályok – dark/light mód szerint
const buildTheme = (isDark: boolean) => ({
  pageBg:    isDark ? "bg-[#0a0a0a] text-white"        : "bg-white text-gray-900",
  cardBg:    isDark ? "bg-[#0f0f14] border-white/10"   : "bg-white border-gray-200",
  subText:   isDark ? "text-gray-400"                   : "text-gray-500",
  divider:   isDark ? "border-white/5"                  : "border-gray-100",
  rowText:   isDark ? "text-gray-200"                   : "text-gray-800",
  valueText: isDark ? "text-white"                      : "text-gray-900",
});

const Dashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isDark = theme === "dark";
  const t = buildTheme(isDark);

  // Adatok
  const [profileData, setProfileData] = useState<User | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [userListings, setUserListings] = useState<Listing[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Oldal betöltésekor összes adat lekérése párhuzamosan
  useEffect(() => {
    if (!user?.id) return;
    (async () => {
      try {
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
      }
    })();
  }, [user?.id]);

  // Egyenleg grafikon adatai – csak akkor számítjuk újra, ha változnak a tranzakciók
  const chartData = useMemo(() => {
    if (!user?.id || !profileData) return [];
    return buildBalanceChartData(transactions, user.id, profileData.balance);
  }, [transactions, user?.id, profileData]);

  // Tranzakció szűrők
  const pendingCount   = transactions.filter((tx) => tx.status === "PENDING").length;
  const completedCount = transactions.filter((tx) => tx.status === "COMPLETED").length;
  const recentTx       = [...transactions]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${t.pageBg}`}>
      <Dashbar />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full space-y-6">

        {/* Fejléc */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Üdvözöljük, {profileData?.name || user?.name || "Felhasználó"}!
            </h1>
            <p className={`mt-1 text-sm ${t.subText}`}>Áttekintés a fiókja aktuális állapotáról.</p>
          </div>
          <Button
            onClick={() => navigate("/listings")}
            className="w-full sm:w-auto bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:opacity-90 text-white font-bold px-6 h-10 shadow-lg shadow-indigo-600/20 flex items-center gap-2"
          >
            <Plus size={16} /> Új hirdetés feladása
          </Button>
        </div>

        {/* Statisztikai kártyák */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard isDark={isDark} title="Jelenlegi egyenleg"               value={`${profileData?.balance ?? 0} óra`} icon={<Clock size={20} className="text-indigo-400" />} />
          <StatCard isDark={isDark} title="Folyamatban lévő tranzakciók"     value={pendingCount}   icon={<AlertCircle size={20} className="text-yellow-400" />} />
          <StatCard isDark={isDark} title="Teljesített tranzakciók"          value={completedCount} icon={<CheckCircle size={20} className="text-green-400" />} />
          <StatCard isDark={isDark} title="Aktív hirdetések"                 value={userListings.length} icon={<Package size={20} className="text-purple-400" />} />
        </div>

        {/* Grafikon + Legutóbbi tranzakciók */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className={`lg:col-span-2 shadow-xl ${t.cardBg}`}>
            <CardHeader className={`border-b pb-4 ${t.divider}`}>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold">Egyenleg alakulása</CardTitle>
                  <CardDescription className={`text-xs mt-0.5 ${t.subText}`}>Lezárt tranzakciók alapján</CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-indigo-400">{profileData?.balance ?? 0}</p>
                  <p className={`text-xs ${t.subText}`}>jelenlegi egyenleg (óra)</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 pb-2">
              <BalanceChart data={chartData} isDark={isDark} currentBalance={profileData?.balance ?? 0} />
            </CardContent>
          </Card>

          {/* Legutóbbi tranzakciók listája */}
          <Card className={`shadow-xl flex flex-col ${t.cardBg}`}>
            <CardHeader className={`border-b pb-4 ${t.divider}`}>
              <CardTitle className="text-base font-bold">Legutóbbi tranzakciók</CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1">
              {recentTx.length > 0 ? (
                <div>
                  {recentTx.map((tx, i) => {
                    const isProvider = tx.provider?.id === user?.id;
                    const isLast     = i === recentTx.length - 1;
                    const statusIcon =
                      tx.status === "COMPLETED" ? <CheckCircle size={14} className="text-green-500" /> :
                      tx.status === "CANCELLED" ? <XCircle size={14} className="text-red-400" /> :
                                                  <AlertCircle size={14} className="text-yellow-500" />;
                    return (
                      <div key={tx.id} className={`px-5 py-4 flex items-center gap-3 ${!isLast ? `border-b ${t.divider}` : ""}`}>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold truncate ${t.rowText}`}>
                            {tx.listing?.title ?? tx.listingTitle ?? `Tranzakció #${tx.id}`}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {statusIcon}
                            <p className={`text-xs ${t.subText}`}>{new Date(tx.createdAt).toLocaleDateString("hu-HU")}</p>
                          </div>
                        </div>
                        <p className={`text-sm font-bold flex-shrink-0 ${isProvider ? "text-green-400" : "text-red-400"}`}>
                          {isProvider ? "+" : "-"}{tx.totalPrice} h
                        </p>
                      </div>
                    );
                  })}
                  <div className={`px-5 py-3 border-t ${t.divider}`}>
                    <button onClick={() => navigate("/profile?tab=transactions")} className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 transition-colors">
                      Összes megtekintése <ArrowUpRight size={12} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className={`p-8 h-full flex flex-col items-center justify-center ${t.subText}`}>
                  <p className="text-sm">Még nincs tranzakció.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Aktív hirdetések + Összesítő */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className={`lg:col-span-2 shadow-xl ${t.cardBg}`}>
            <CardHeader className={`border-b pb-4 ${t.divider}`}>
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
                    const isLast  = i === Math.min(userListings.length, 4) - 1;
                    const typeCls = listing.type === "OFFER" ? "bg-green-500/10 text-green-500" : "bg-blue-500/10 text-blue-400";
                    return (
                      <div key={listing.id} className={`px-5 py-3.5 flex items-center gap-4 ${!isLast ? `border-b ${t.divider}` : ""}`}>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold truncate ${t.rowText}`}>{listing.title}</p>
                          <p className={`text-xs mt-0.5 ${t.subText}`}>{listing.category?.name}</p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${typeCls}`}>
                            {listing.type === "OFFER" ? "Ajánlat" : "Kereslet"}
                          </span>
                          <p className="text-sm font-bold text-indigo-400">{listing.pricePerHour} kredit/óra</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className={`p-8 text-center ${t.subText}`}>
                  <p className="text-sm mb-3">Még nincs aktív hirdetése.</p>
                  <button onClick={() => navigate("/listings")} className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold underline">
                    Hirdetés feladása
                  </button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Összesítő adatok */}
          <Card className={`shadow-xl ${t.cardBg}`}>
            <CardHeader className={`border-b pb-4 ${t.divider}`}>
              <CardTitle className="text-base font-bold">Összesítő</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              {[
                {
                  label: "Összes tranzakció",
                  value: transactions.length,
                  icon: <TrendingUp size={15} className="text-indigo-400" />,
                },
                {
                  label: "Megszerzett órák",
                  value: `+${transactions.filter((tx) => tx.status === "COMPLETED" && tx.provider?.id === user?.id).reduce((s, tx) => s + tx.totalPrice, 0)} h`,
                  icon: <TrendingUp size={15} className="text-green-400" />,
                },
                {
                  label: "Elköltött órák",
                  value: `-${transactions.filter((tx) => tx.status === "COMPLETED" && tx.client?.id === user?.id).reduce((s, tx) => s + tx.totalPrice, 0)} h`,
                  icon: <TrendingDown size={15} className="text-red-400" />,
                },
                {
                  label: "Átlag értékelés",
                  value: stats?.averageRating && stats.averageRating > 0
                    ? <span className="flex items-center gap-1.5">{Number(stats.averageRating).toFixed(1)} / 5 <Star className="text-violet-500 w-4 h-4" /></span>
                    : "–",
                  icon: <Star size={15} className="text-violet-500" />,
                },
                {
                  label: "Bizalmi szint",
                  value: profileData?.trustLevel ?? "NEWCOMER",
                  icon: <CheckCircle size={15} className="text-purple-400" />,
                },
              ].map(({ label, value, icon }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <div className={`flex items-center gap-2 ${t.subText}`}>{icon} {label}</div>
                  <span className={`font-bold ${t.valueText}`}>{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
