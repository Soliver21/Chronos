import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Dashbar from "../components/dashboard/Dashbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowUpRight, Clock, Package, Star, TrendingUp, Activity } from "lucide-react";
import { getUserById, getUserStats } from "../services/user.service";
import { getMyListings } from "../services/listing.service";
import type{ User, UserStats } from "../types/user.types";
import type{ Listing } from "../types/listing.types";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
        <Dashbar />
        <div className="flex-1 flex items-center justify-center text-white font-bold">
          Adatok szinkronizálása...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
      <Dashbar />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full space-y-6 sm:space-y-8">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="pb-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-snug">
              Üdvözlünk, {profileData?.name || user?.name || "Felhasználó"}!
            </h1>
            <p className="text-gray-400 mt-1 text-sm sm:text-base">
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

        {/* Stat kártyák – valós backend adatok */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Időkredit egyenleg"
            value={`${profileData?.balance ?? 0} óra`}
            icon={<Clock className="text-indigo-400" />}
          />
          <StatCard
            title="Aktív hirdetések"
            value={userListings.length}
            icon={<Package className="text-emerald-400" />}
          />
          <StatCard
            title="Értékelések"
            value={stats?.totalReviews ?? 0}
            icon={<Star className="text-yellow-400" />}
          />
          <StatCard
            title="Bizalmi szint"
            value={profileData?.trustLevel ?? "NEWCOMER"}
            icon={<ArrowUpRight className="text-purple-400" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

          {/* Aktivitási trendek */}
          <Card className="lg:col-span-2 bg-[#0f0f14] border-white/10 shadow-2xl">
            <CardHeader className="border-b border-white/5 pb-4">
              <CardTitle className="text-white">Aktivitási trendek</CardTitle>
              <CardDescription className="text-gray-400">
                A fiókod teljesítménye a Chronos platformon.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              {stats && stats.totalTransactions > 0 ? (
                <div className="w-full space-y-4 p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Összes tranzakció</span>
                    <span className="text-white font-bold">{stats.totalTransactions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Összes elköltött/keresett óra</span>
                    <span className="text-indigo-400 font-bold">{stats.totalAmount} óra</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Átlag értékelés</span>
                    <span className="text-yellow-400 font-bold">
                      {stats.averageRating != null ? `${stats.averageRating} / 5` : "N/A"}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 flex flex-col items-center">
                  <Activity className="h-12 w-12 mb-3 opacity-20 text-indigo-500" />
                  <p className="font-medium text-sm text-indigo-400">
                    Még nincs aktivitás a fiókodban.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Legutóbbi hirdetések */}
          <Card className="bg-[#0f0f14] border-white/10 shadow-2xl overflow-hidden flex flex-col">
            <CardHeader className="border-b border-white/5 pb-4 bg-white/5">
              <CardTitle className="text-white text-lg">Legutóbbi hirdetéseid</CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-y-auto">
              {userListings.length > 0 ? (
                <div className="divide-y divide-white/5">
                  {userListings.slice(0, 5).map((listing: Listing) => (
                    <div key={listing.id} className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-200 line-clamp-1">{listing.title}</p>
                        <p className="text-xs text-indigo-400 font-bold mt-1">
                          {listing.pricePerHour} óra/h · {listing.category?.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center flex flex-col items-center justify-center h-full">
                  <p className="text-sm text-gray-500 italic">Még nincs hirdetésed.</p>
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, icon }: any) => (
  <Card className="bg-[#0f0f14] border-white/10 hover:border-indigo-500/30 transition-all shadow-xl group">
    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
      <CardTitle className="text-xs uppercase tracking-widest font-bold text-gray-500">
        {title}
      </CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-black text-white">{value}</div>
    </CardContent>
  </Card>
);

export default Dashboard;