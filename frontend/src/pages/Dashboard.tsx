import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import Dashbar from "../components/dashboard/Dashbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowUpRight, Clock, Package, Star, TrendingUp, Activity } from "lucide-react";
import { getUserById, getUserStats } from "../services/user.service";
import { getMyListings } from "../services/listing.service";
import type { User, UserStats } from "../types/user.types";
import type { Listing } from "../types/listing.types";

const Dashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isDark = theme === "dark";

  const [profileData, setProfileData] = useState<User | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [userListings, setUserListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [userData, statsData, listingsData] = await Promise.all([
          getUserById(user.id),
          getUserStats(user.id),
          getMyListings(),
        ]);
        setProfileData(userData);
        setStats(statsData);
        setUserListings(listingsData);
      } catch (err) {
        console.error("Hiba a dashboard adatok betöltésekor:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [user?.id]);

  const pageBg = isDark ? "bg-[#0a0a0a] text-white" : "bg-white text-gray-900";
  const cardBg = isDark ? "bg-[#0f0f14] border-white/10" : "bg-white border-gray-200";
  const cardHeaderBg = isDark ? "border-white/5" : "border-gray-100";
  const subText = isDark ? "text-gray-400" : "text-gray-500";
  const listingHover = isDark ? "hover:bg-white/5" : "hover:bg-gray-50";
  const listingDivide = isDark ? "divide-white/5" : "divide-gray-100";
  const listingDot = isDark ? "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" : "bg-indigo-400";
  const listingTitle = isDark ? "text-gray-200" : "text-gray-800";

  if (loading) {
    return (
      <div className={`min-h-screen flex flex-col ${pageBg}`}>
        <Dashbar />
        <div className="flex-1 flex items-center justify-center font-bold">
          Adatok szinkronizálása...
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${pageBg}`}>
      <Dashbar />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full space-y-6 sm:space-y-8">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="pb-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug">
              Üdvözlünk, {profileData?.name || user?.name || "Felhasználó"}!
            </h1>
            <p className={`mt-1 text-sm sm:text-base ${subText}`}>
              Kezeld az időkrediteid és figyeld a hirdetéseid állapotát.
            </p>
          </div>
          <Button
            onClick={() => navigate("/listings")}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-5 shadow-lg shadow-indigo-600/20"
          >
            <TrendingUp className="mr-2 h-5 w-5" /> Új hirdetés feladása
          </Button>
        </div>

        {/* Stat kártyák */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard isDark={isDark} title="Időkredit egyenleg" value={`${profileData?.balance ?? 0} óra`} icon={<Clock className="text-indigo-400" />} />
          <StatCard isDark={isDark} title="Aktív hirdetések" value={userListings.length} icon={<Package className="text-emerald-400" />} />
          <StatCard isDark={isDark} title="Értékelések száma" value={stats?.totalReviews ?? 0} icon={<Star className="text-yellow-400" />} />
          <StatCard isDark={isDark} title="Átlag értékelés" value={
            stats?.averageRating != null && stats.averageRating > 0
              ? `${Number(stats.averageRating).toFixed(1)} / 5`
              : "Még nincs"
          } icon={<ArrowUpRight className="text-purple-400" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

          {/* Aktivitás */}
          <Card className={`lg:col-span-2 shadow-2xl ${cardBg}`}>
            <CardHeader className={`border-b pb-4 ${cardHeaderBg}`}>
              <CardTitle>Aktivitási összesítő</CardTitle>
              <CardDescription className={subText}>
                A fiókod teljesítménye a Chronos platformon.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              {stats && stats.totalTransactions > 0 ? (
                <div className="w-full space-y-5 p-4">
                  {[
                    { label: "Összes tranzakció", value: stats.totalTransactions, cls: "" },
                    { label: "Összes elköltött / keresett óra", value: `${stats.totalAmount} óra`, cls: "text-indigo-400" },
                    { label: "Kapott értékelések száma", value: stats.totalReviews ?? 0, cls: "text-yellow-400" },
                    { label: "Átlagos értékelés", value: stats.averageRating != null && stats.averageRating > 0 ? `${Number(stats.averageRating).toFixed(1)} / 5 ⭐` : "Még nincs", cls: "text-yellow-400" },
                  ].map(({ label, value, cls }) => (
                    <div key={label} className="flex justify-between items-center text-sm">
                      <span className={subText}>{label}</span>
                      <span className={`font-bold ${cls || (isDark ? "text-white" : "text-gray-900")}`}>{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`flex flex-col items-center ${subText}`}>
                  <Activity className="h-12 w-12 mb-3 opacity-20 text-indigo-500" />
                  <p className="font-medium text-sm text-indigo-400">Még nincs aktivitás a fiókodban.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Hirdetések */}
          <Card className={`shadow-2xl overflow-hidden flex flex-col ${cardBg}`}>
            <CardHeader className={`border-b pb-4 ${isDark ? "bg-white/5 border-white/5" : "bg-gray-50 border-gray-100"}`}>
              <CardTitle className="text-lg">Legutóbbi hirdetéseid</CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-y-auto">
              {userListings.length > 0 ? (
                <div className={`divide-y ${listingDivide}`}>
                  {userListings.slice(0, 5).map((listing: Listing) => (
                    <div key={listing.id} className={`p-4 flex items-center gap-4 transition-colors ${listingHover}`}>
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${listingDot}`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-bold line-clamp-1 ${listingTitle}`}>{listing.title}</p>
                        <p className="text-xs text-indigo-400 font-bold mt-1">
                          {listing.pricePerHour} óra/h · {listing.category?.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center flex flex-col items-center justify-center h-full">
                  <p className={`text-sm italic ${subText}`}>Még nincs hirdetésed.</p>
                </div>
              )}
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
      <CardTitle className="text-xs uppercase tracking-widest font-bold text-gray-500">
        {title}
      </CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className={`text-2xl font-black ${isDark ? "text-white" : "text-gray-900"}`}>{value}</div>
    </CardContent>
  </Card>
);

export default Dashboard;