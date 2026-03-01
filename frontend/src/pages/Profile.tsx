import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Dashbar from "../components/dashboard/Dashbar";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { getUserById, getUserStats, updateMyProfile } from "../services/user.service";
import { getMyListings } from "../services/listing.service";
import { getMyTransactions } from "../services/transaction.service";
import type{ User, UserStats } from "../types/user.types";
import type{ Listing } from "../types/listing.types";
import type { Transaction } from "../types/transaction.types";

const Profile = () => {
  const { user, login, token } = useAuth();

  const [profileData, setProfileData] = useState<User | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [formName, setFormName] = useState("");
  const [formBio, setFormBio] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    const fetchAllData = async () => {
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
        setListings(listingsData);
        setTransactions(txData);
        setFormName(userData.name ?? "");
        setFormBio(userData.bio ?? "");
      } catch (err) {
        console.error("Hiba az adatok betöltésekor:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [user?.id]);

  const handleSave = async () => {
    if (!user || !token) return;
    try {
      setSaving(true);
      const updated = await updateMyProfile({ name: formName, bio: formBio });
      setProfileData(updated);
      // AuthContext user frissítése is, hogy a Dashbar neve is változzon
      login(updated, token);
      setSaveMsg("Profil sikeresen mentve!");
      setTimeout(() => setSaveMsg(null), 3000);
    } catch {
      setSaveMsg("Hiba a mentés során.");
    } finally {
      setSaving(false);
    }
  };

  const statCards = [
    { label: "Összes hirdetés", value: listings.length },
    { label: "Értékelések", value: stats?.totalReviews ?? 0 },
    {
      label: "Rating",
      value: stats?.averageRating != null && stats.averageRating > 0
        ? `${stats.averageRating}/5`
        : "N/A",
    },
    { label: "Egyenleg", value: `${profileData?.balance ?? 0} óra` },
  ];

  if (loading && !profileData) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
        <div className="animate-pulse font-bold text-xl">Profil betöltése...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white font-sans">
      <Dashbar />

      <main className="flex-1 flex flex-col items-center w-full p-4 pt-10 pb-10 relative z-10">
        <div className="w-full max-w-6xl space-y-8">
          <div className="flex flex-col space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
              {profileData?.name || user?.name || "Felhasználó"}
            </h1>
            <p className="text-gray-400 font-medium">{user?.email}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat, i) => (
              <Card key={i} className="bg-[#0f0f14] border-white/10 shadow-2xl transition-all hover:border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-widest font-semibold text-gray-500">
                    {stat.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="w-full justify-start border-b border-white/10 bg-transparent p-0 h-auto space-x-8 mb-8">
              <TabsTrigger
                value="profile"
                className="rounded-none border-b-2 border-transparent px-2 pb-4 pt-2 font-semibold text-gray-500 data-[state=active]:border-indigo-500 data-[state=active]:text-white bg-transparent transition-all shadow-none"
              >
                Saját adatok
              </TabsTrigger>
              <TabsTrigger
                value="listings"
                className="rounded-none border-b-2 border-transparent px-2 pb-4 pt-2 font-semibold text-gray-500 data-[state=active]:border-indigo-500 data-[state=active]:text-white bg-transparent transition-all shadow-none"
              >
                Hirdetéseim ({listings.length})
              </TabsTrigger>
              <TabsTrigger
                value="transactions"
                className="rounded-none border-b-2 border-transparent px-2 pb-4 pt-2 font-semibold text-gray-500 data-[state=active]:border-indigo-500 data-[state=active]:text-white bg-transparent transition-all shadow-none"
              >
                Tranzakciók ({transactions.length})
              </TabsTrigger>
            </TabsList>

            {/* === PROFIL SZERKESZTÉS === */}
            <TabsContent value="profile" className="focus-visible:outline-none">
              <Card className="bg-[#0f0f14] border-white/10 shadow-xl text-white overflow-hidden">
                <CardHeader className="border-b border-white/5 bg-white/5 py-4">
                  <CardTitle className="text-lg font-bold">Profil adatok szerkesztése</CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">

                  <div className="flex justify-center w-full">
                    <div className="relative group">
                      <Avatar className="w-32 h-32 border-4 border-[#1a1a1f] shadow-2xl transition-transform group-hover:scale-105">
                        <AvatarFallback className="text-5xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white font-bold">
                          {(profileData?.name || user?.name || "?").substring(0, 1).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute bottom-1 right-1 bg-indigo-600 p-2 rounded-full border-2 border-[#0f0f14] cursor-pointer hover:bg-indigo-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
                          <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                          <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="grid gap-3">
                      <Label className="text-gray-400 font-semibold ml-1">Megjelenítendő név</Label>
                      <Input
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="bg-[#1a1a1f] border-white/10 text-white h-12 focus:ring-2 focus:ring-indigo-500 transition-all"
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label className="text-gray-400 font-semibold ml-1">E-mail (Nem módosítható)</Label>
                      <Input
                        value={user?.email}
                        readOnly
                        className="bg-[#0a0a0a] border-white/5 text-gray-500 h-12 opacity-60 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <Label className="text-gray-400 font-semibold ml-1">Bemutatkozás</Label>
                    <Textarea
                      value={formBio}
                      onChange={(e) => setFormBio(e.target.value)}
                      placeholder="Mesélj magadról néhány mondatban..."
                      className="bg-[#1a1a1f] border-white/10 text-white min-h-[120px] focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                    />
                  </div>

                  <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                        <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Bizalmi szint</p>
                        <p className="font-bold text-indigo-400 text-sm tracking-wide">
                          {profileData?.trustLevel || "NEWCOMER"}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {saveMsg && (
                        <p className={`text-sm font-medium ${saveMsg.includes("Hiba") ? "text-red-400" : "text-green-400"}`}>
                          {saveMsg}
                        </p>
                      )}
                      <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-10 h-12 font-bold shadow-lg shadow-indigo-600/20 transition-all"
                      >
                        {saving ? "Mentés..." : "Adatok mentése"}
                      </Button>
                    </div>
                  </div>

                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="listings" className="focus-visible:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.length > 0 ? (
                  listings.map((item: Listing) => (
                    <Card key={item.id} className="bg-[#0f0f14] border-white/10 hover:border-indigo-500/50 transition-all group">
                      <CardHeader>
                        <CardTitle className="text-base font-bold group-hover:text-indigo-400 transition-colors">
                          {item.title}
                        </CardTitle>
                        <p className="text-xs text-gray-500">{item.category?.name}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <p className="text-indigo-400 font-black text-lg">{item.pricePerHour} óra/h</p>
                          <span className="text-[10px] text-gray-500 uppercase bg-white/5 px-2 py-1 rounded">
                            {item.type === "OFFER" ? "Ajánlat" : "Kereslet"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center border-2 border-dashed border-white/10 rounded-3xl bg-white/5">
                    <div className="text-4xl mb-4">📦</div>
                    <p className="text-gray-400 font-medium">Még nincsenek feltöltött hirdetéseid.</p>
                    <Button variant="link" className="text-indigo-400 mt-2">Hirdetés feladása most</Button>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="transactions" className="focus-visible:outline-none">
              {transactions.length > 0 ? (
                <div className="space-y-4">
                  {transactions.map((tx: Transaction) => (
                    <Card key={tx.id} className="bg-[#0f0f14] border-white/10">
                      <CardContent className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <p className="font-bold text-white">{tx.listing?.title ?? `Hirdetés #${tx.id}`}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {tx.client?.name} → {tx.provider?.name}
                          </p>
                          <p className="text-xs text-gray-600 mt-0.5">
                            {new Date(tx.createdAt).toLocaleDateString("hu-HU")}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-indigo-400 font-black">{tx.agreedHours} óra</p>
                            <p className="text-xs text-gray-500">{tx.totalPrice} kredit</p>
                          </div>
                          <span className={`text-[10px] font-bold uppercase px-3 py-1.5 rounded-full ${
                            tx.status === "COMPLETED"
                              ? "bg-green-500/20 text-green-400"
                              : tx.status === "CANCELLED"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}>
                            {tx.status === "PENDING" ? "Folyamatban" : tx.status === "COMPLETED" ? "Teljesítve" : "Törölve"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center border-2 border-dashed border-white/10 rounded-3xl bg-white/5">
                  <div className="text-4xl mb-4">💸</div>
                  <p className="text-gray-400 font-medium">Itt fogod látni a vásárlásaid és eladásaid történetét.</p>
                  <p className="text-xs text-gray-600 mt-1">Jelenleg nincs rögzített tranzakció.</p>
                </div>
              )}
            </TabsContent>

          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;