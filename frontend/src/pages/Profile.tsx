import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";
import Dashbar from "../components/dashboard/Dashbar";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Star, Pencil, Trash2 } from "lucide-react";
import StarPicker from "../components/profile/StarPicker";
import { getUserById, getUserStats, updateMyProfile, getCategories } from "../services/user.service";
import { getMyListings, getListings, updateListing, deleteListing } from "../services/listing.service";
import { getMyTransactions, completeTransaction, cancelTransaction } from "../services/transaction.service";
import { getUserReviews, createReview, type UserReview } from "../services/rating.service";
import { ThemeSwitch } from "../components/ui/theme-switch";
import { api } from "../services/api";
import type { User, UserStats } from "../types/user.types";
import type { Listing } from "../types/listing.types";
import type { Transaction } from "../types/transaction.types";


// Téma-alapú osztályok – dark/light mód szerint
const buildTheme = (isDark: boolean) => ({
  pageBg:         isDark ? "bg-[#0a0a0a] text-white"                        : "bg-white text-gray-900",
  cardBg:         isDark ? "bg-[#0f0f14] border-white/10"                   : "bg-white border-gray-200",
  cardHeaderBg:   isDark ? "border-white/5 bg-white/5"                      : "border-gray-100 bg-gray-50",
  subText:        isDark ? "text-gray-400"                                   : "text-gray-500",
  labelCls:       isDark ? "text-gray-400"                                   : "text-gray-600",
  inputBg:        isDark ? "bg-[#1a1a1f] border-white/10 text-white"        : "bg-white border-gray-300 text-gray-900",
  inputReadonly:  isDark ? "bg-[#0a0a0a] border-white/5 text-gray-500 opacity-60 cursor-not-allowed"
                        : "bg-gray-100 border-gray-200 text-gray-400 opacity-70 cursor-not-allowed",
  textareaBg:     isDark ? "bg-[#1a1a1f] border-white/10 text-white"        : "bg-white border-gray-300 text-gray-900",
  tabBorder:      isDark ? "border-white/10"                                 : "border-gray-200",
  listingCardBg:  isDark ? "bg-[#0f0f14] border-white/10 hover:border-indigo-500/50"
                        : "bg-white border-gray-200 hover:border-indigo-400",
  txCardBg:       isDark ? "bg-[#0f0f14] border-white/10"                   : "bg-white border-gray-200",
  emptyBorder:    isDark ? "border-white/10 bg-white/5"                     : "border-gray-200 bg-gray-50",
  typeBadge:      isDark ? "bg-white/5 text-gray-400"                       : "bg-gray-100 text-gray-500",
  reviewFormBg:   isDark ? "bg-white/5 border-white/10"                     : "bg-gray-50 border-gray-200",
  reviewTextarea: isDark ? "bg-[#1a1a1f] border-white/10 text-white placeholder-gray-600"
                        : "bg-white border-gray-200 text-gray-900 placeholder-gray-400",
  modalBg:        isDark ? "bg-[#0f0f14] border-white/10"                   : "bg-white border-gray-200",
  modalInput:     isDark ? "bg-[#1a1a1f] border-white/10 text-white placeholder:text-gray-600 focus:border-indigo-500/50"
                        : "bg-white border-gray-200 text-gray-900 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100",
  modalCancel:    isDark ? "border-white/10 text-gray-400 hover:bg-white/5" : "border-gray-200 text-gray-600 hover:bg-gray-50",
  dividerBorder:  isDark ? "border-white/10"                                : "border-gray-100",
  tabTrigger: `rounded-none cursor-pointer border-b-2 border-transparent px-2 pb-2.5 pt-2 font-semibold text-[11px] sm:text-xs md:text-sm text-gray-500
    data-[state=active]:border-indigo-500 ${isDark ? "data-[state=active]:text-white" : "data-[state=active]:text-gray-900"}
    bg-transparent transition-all shadow-none whitespace-nowrap flex-1 text-center`,
});

const VALID_TABS = ["profile", "listings", "transactions", "reviews"] as const;

const Profile = () => {
  const { user, login, token } = useAuth();
  const { theme } = useTheme();
  const { showToast } = useToast();
  const isDark = theme === "dark";
  const t = buildTheme(isDark);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // URL-ből olvassuk az aktív tabot
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") ?? "profile";
  const activeTab = VALID_TABS.includes(tabParam as any) ? tabParam : "profile";

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value }, { replace: true });
  };

  // Adatok
  const [profileData, setProfileData] = useState<User | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string; slug: string }[]>([]);

  // Profil szerkesztés
  const [formName, setFormName] = useState("");
  const [formBio, setFormBio] = useState("");

  // Értékelés írás
  const [reviewOpen, setReviewOpen] = useState<number | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewedTxIds, setReviewedTxIds] = useState<Set<number>>(new Set());

  // Hirdetés szerkesztés/törlés
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [editForm, setEditForm] = useState({
    title: "", description: "", pricePerHour: "", estimatedHours: "", categoryId: "",
  });

  // Oldal betöltésekor összes adat lekérése párhuzamosan
  useEffect(() => {
    if (!user?.id) return;
    Promise.all([
      getUserById(user.id),
      getUserStats(user.id),
      getMyListings(),
      getMyTransactions(),
      getUserReviews(user.id),
      getCategories(),
    ]).then(([userData, statsData, listingsData, txData, reviewsData, catsData]) => {
      setProfileData(userData);
      setStats(statsData);
      setListings(listingsData);
      setTransactions(txData);
      setReviews(reviewsData);
      setCategories(catsData);
      setFormName(userData.name ?? "");
      setFormBio(userData.bio ?? "");
    }).catch((err) => {
      console.error("Hiba az adatok betöltésekor:", err);
      showToast("Hiba az adatok betöltésekor.", "error");
    });
  }, [user?.id]);

  // Profil mentése
  const handleSave = async () => {
    if (!user || !token) return;
    try {
      const updated = await updateMyProfile({ name: formName, bio: formBio });
      setProfileData(updated);
      login(updated, token);
      showToast("Profil sikeresen mentve!", "success");
    } catch {
      showToast("Hiba a mentés során.", "error");
    }
  };

  // Profilkép feltöltése
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await api.post("/upload/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const updated = res.data.user;
      setProfileData(updated);
      login(updated, token!);
      showToast("Profilkép sikeresen frissítve!", "success");
    } catch {
      showToast("Hiba a profilkép feltöltésekor.", "error");
    } finally {
      e.target.value = "";
    }
  };

  // Tranzakció után frissíti a user adatokat és a tranzakciókat
  const refreshAfterTxAction = async () => {
    if (!user?.id) return;
    const [userData, statsData, txData] = await Promise.all([
      getUserById(user.id),
      getUserStats(user.id),
      getMyTransactions(),
    ]);
    setProfileData(userData);
    setStats(statsData);
    setTransactions(txData);
  };

  // Tranzakció lezárása
  const handleCompleteTransaction = async (txId: number) => {
    try {
      await completeTransaction(txId);
      await refreshAfterTxAction();
      showToast("Tranzakció sikeresen lezárva!", "success");
    } catch {
      showToast("Hiba a tranzakció lezárásakor.", "error");
    }
  };

  // Tranzakció törlése
  const handleCancelTransaction = async (txId: number) => {
    try {
      await cancelTransaction(txId);
      await refreshAfterTxAction();
      showToast("Tranzakció törölve.", "warning");
    } catch {
      showToast("Hiba a tranzakció törlésekor.", "error");
    }
  };

  // Értékelés beküldése
  const handleSubmitReview = async (txId: number) => {
    try {
      await createReview({
        transactionId: txId,
        rating: reviewRating,
        comment: reviewComment.trim() || undefined,
      });
      setReviewedTxIds((prev) => new Set(prev).add(txId));
      setReviewOpen(null);
      setReviewRating(5);
      setReviewComment("");
      if (user?.id) {
        const [reviewsData, statsData] = await Promise.all([
          getUserReviews(user.id),
          getUserStats(user.id),
        ]);
        setReviews(reviewsData);
        setStats(statsData);
      }
      showToast("Értékelés sikeresen elküldve!", "success");
    } catch {
      showToast("Hiba az értékelés beküldésekor.", "error");
    }
  };

  // Hirdetés szerkesztő megnyitása
  const openEditListing = (item: Listing) => {
    setEditingListing(item);
    setEditForm({
      title: item.title,
      description: item.description,
      pricePerHour: String(item.pricePerHour),
      estimatedHours: item.estimatedHours != null ? String(item.estimatedHours) : "",
      categoryId: String(item.categoryId),
    });
  };

  // Hirdetés módosítása
  const handleEditSave = async () => {
    if (!editingListing) return;

    const price = parseFloat(editForm.pricePerHour);
    const hours = parseInt(editForm.estimatedHours);
    const errors: [boolean, string][] = [
      [!editForm.title.trim(),                              "A cím megadása kötelező."],
      [!editForm.description.trim(),                        "A leírás megadása kötelező."],
      [!editForm.pricePerHour || isNaN(price),              "Az ár/óra megadása kötelező."],
      [price < 1,                                           "Az ár/óra minimum 1 lehet."],
      [price > 10,                                          "Az ár/óra maximum 10 lehet."],
      [!editForm.estimatedHours || isNaN(hours),            "A becsült órák megadása kötelező."],
      [hours < 1,                                           "A becsült órák minimum 1 lehet."],
      [hours > 6,                                           "A becsült órák maximum 6 lehet."],
      [!editForm.categoryId,                                "A kategória kiválasztása kötelező."],
    ];
    const firstError = errors.find(([cond]) => cond);
    if (firstError) { showToast(firstError[1], "error"); return; }

    try {
      await updateListing(editingListing.id, {
        title: editForm.title,
        description: editForm.description,
        pricePerHour: price,
        estimatedHours: hours,
        categoryId: parseInt(editForm.categoryId, 10),
      });
      setListings(await getMyListings());
      setEditingListing(null);
      showToast("Hirdetés sikeresen módosítva!", "success");
    } catch {
      showToast("Hiba a hirdetés módosításakor.", "error");
    }
  };

  // Hirdetés törlése
  const handleDeleteListing = async (id: number) => {
    try {
      await deleteListing(id);
      setListings((prev) => prev.filter((l) => l.id !== id));
      showToast("Hirdetés sikeresen törölve.", "success");
    } catch {
      showToast("Hiba a hirdetés törlésekor.", "error");
    }
  };

  // Statisztikai kártyák adatai
  const statCards = [
    { label: "Összes hirdetés",   value: listings.length },
    { label: "Kapott értékelések", value: stats?.totalReviews ?? 0 },
    {
      label: "Átlag értékelés",
      value: stats?.averageRating != null && stats.averageRating > 0
        ? <span className="flex items-center gap-2">{Number(stats.averageRating).toFixed(1)} / 5 <Star className="text-violet-500 w-6 h-6" /></span>
        : "N/A",
    },
    { label: "Egyenleg", value: `${profileData?.balance ?? 0} óra` },
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${t.pageBg}`}>
      <Dashbar />
      <main className="flex-1 flex flex-col items-center w-full p-4 sm:p-6 pt-8 pb-10">
        <div className="w-full max-w-6xl space-y-8">

          {/* Fejléc */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-2">
            <div className="flex flex-col space-y-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-normal">
                {profileData?.name || user?.name || "Felhasználó"}
              </h1>
              <p className={`font-medium ${t.subText}`}>{user?.email}</p>
            </div>
            <div className="pt-1"><ThemeSwitch /></div>
          </div>

          {/* Statisztikai kártyák */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat, i) => (
              <Card key={i} className={`shadow-xl transition-all hover:border-indigo-500/30 ${t.cardBg}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-widest font-semibold text-gray-500">{stat.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Kontrollált Tabs – URL ?tab= paraméterből */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className={`w-full flex border-b bg-transparent p-0 h-auto mb-6 gap-0 ${t.tabBorder}`}>
              <TabsTrigger value="profile"      className={t.tabTrigger}><span className="hidden xs:inline">Saját </span>Adatok</TabsTrigger>
              <TabsTrigger value="listings"     className={t.tabTrigger}>Hirdetések ({listings.length})</TabsTrigger>
              <TabsTrigger value="transactions" className={t.tabTrigger}>Tranzakciók ({transactions.length})</TabsTrigger>
              <TabsTrigger value="reviews"      className={t.tabTrigger}>Értékelések ({reviews.length})</TabsTrigger>
            </TabsList>

            {/* PROFIL SZERKESZTÉS */}
            <TabsContent value="profile" className="focus-visible:outline-none">
              <Card className={`shadow-xl overflow-hidden ${t.cardBg}`}>
                <CardHeader className={`border-b py-4 ${t.cardHeaderBg}`}>
                  <CardTitle className="text-lg font-bold">Profil adatok szerkesztése</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-8 space-y-6 sm:space-y-8">

                  {/* Avatar feltöltő */}
                  <div className="flex justify-center w-full">
                    <div className="relative group">
                      <Avatar className={`w-32 h-32 border-4 shadow-2xl transition-transform group-hover:scale-105 ${isDark ? "border-[#1a1a1f]" : "border-gray-100"}`}>
                        <AvatarImage
                          src={profileData?.avatar ? `${profileData.avatar}` : undefined}
                          alt={profileData?.name ?? ""}
                        />
                        <AvatarFallback className="text-5xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white font-bold">
                          {(profileData?.name || user?.name || "?").substring(0, 1).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className={`absolute bottom-1 right-1 bg-indigo-600 p-2 rounded-full border-2 hover:bg-indigo-500 transition-colors ${isDark ? "border-[#0f0f14]" : "border-white"}`}
                        title="Profilkép módosítása"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
                          <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                          <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
                        </svg>
                      </button>
                      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    <div className="grid gap-3">
                      <Label className={`font-semibold ml-1 ${t.labelCls}`}>Megjelenítendő név</Label>
                      <Input value={formName} onChange={(e) => setFormName(e.target.value)}
                        className={`h-12 focus:ring-2 focus:ring-indigo-500 transition-all ${t.inputBg}`} />
                    </div>
                    <div className="grid gap-3">
                      <Label className={`font-semibold ml-1 ${t.labelCls}`}>E-mail cím (nem módosítható)</Label>
                      <Input value={user?.email} readOnly className={`h-12 ${t.inputReadonly}`} />
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <Label className={`font-semibold ml-1 ${t.labelCls}`}>Bemutatkozás</Label>
                    <Textarea value={formBio} onChange={(e) => setFormBio(e.target.value)}
                      placeholder="Meséljen magáról néhány mondatban..."
                      className={`min-h-[120px] focus:ring-2 focus:ring-indigo-500 transition-all resize-none ${t.textareaBg}`} />
                  </div>

                  <div className={`pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-6 ${t.dividerBorder}`}>
                    <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                      <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Bizalmi szint</p>
                      <p className="font-bold text-indigo-400 text-sm tracking-wide">{profileData?.trustLevel || "NEWCOMER"}</p>
                    </div>
                    <Button onClick={handleSave} className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-10 h-12 font-bold shadow-lg shadow-indigo-600/20">
                      Adatok mentése
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* HIRDETÉSEK */}
            <TabsContent value="listings" className="focus-visible:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.length > 0 ? listings.map((item: Listing) => (
                  <Card key={item.id} className={`transition-all group ${t.listingCardBg}`}>
                    <CardHeader>
                      <CardTitle className={`text-base font-bold group-hover:text-indigo-400 transition-colors ${isDark ? "text-white" : "text-gray-900"}`}>
                        {item.title}
                      </CardTitle>
                      <p className="text-xs text-gray-500">{item.category?.name}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <p className="text-indigo-400 font-black text-lg">{item.pricePerHour} kredit/óra</p>
                        <span className={`text-[10px] uppercase px-2 py-1 rounded font-semibold ${t.typeBadge}`}>
                          {item.type === "OFFER" ? "Ajánlat" : "Kereslet"}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-4 justify-end">
                        <button
                          onClick={() => openEditListing(item)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border bg-orange-500/15 border-orange-500/30 text-orange-400 hover:bg-orange-500/25"
                        >
                          <Pencil size={12} /> Módosítás
                        </button>
                        <button
                          onClick={() => handleDeleteListing(item.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
                        >
                          <Trash2 size={12} /> Törlés
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                )) : (
                  <div className={`col-span-full py-20 text-center border-2 border-dashed rounded-3xl ${t.emptyBorder}`}>
                    <div className="text-4xl mb-4">📦</div>
                    <p className={`font-medium ${t.subText}`}>Még nincsenek feltöltött hirdetések.</p>
                  </div>
                )}
              </div>

              {/* Hirdetés szerkesztő modal */}
              {editingListing && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <div className={`w-full max-w-md rounded-2xl shadow-2xl border overflow-y-auto max-h-[90vh] ${t.modalBg}`}>

                    <div className={`sticky top-0 flex items-center justify-between p-5 border-b ${t.modalBg}`}>
                      <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Hirdetés módosítása</h2>
                      <button onClick={() => setEditingListing(null)} className={`p-1.5 rounded-lg transition-colors ${isDark ? "hover:bg-white/10 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                      </button>
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <label className={`text-sm font-semibold block mb-2 ${t.labelCls}`}>Cím <span className="text-red-500">*</span></label>
                        <input value={editForm.title} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
                          className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-all ${t.modalInput}`} />
                      </div>
                      <div>
                        <label className={`text-sm font-semibold block mb-2 ${t.labelCls}`}>Leírás <span className="text-red-500">*</span></label>
                        <textarea value={editForm.description} onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                          rows={3} className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-all resize-none ${t.modalInput}`} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={`text-sm font-semibold block mb-2 ${t.labelCls}`}>Ár/óra <span className="text-red-500">*</span></label>
                          <input type="number" min={1} max={10} value={editForm.pricePerHour}
                            onChange={e => setEditForm(f => ({ ...f, pricePerHour: e.target.value }))}
                            className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-all ${t.modalInput}`} />
                        </div>
                        <div>
                          <label className={`text-sm font-semibold block mb-2 ${t.labelCls}`}>Becsült órák <span className="text-red-500">*</span></label>
                          <input type="number" min={1} max={6} value={editForm.estimatedHours}
                            onChange={e => setEditForm(f => ({ ...f, estimatedHours: e.target.value }))}
                            className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-all ${t.modalInput}`} />
                        </div>
                      </div>
                      <div>
                        <label className={`text-sm font-semibold block mb-2 ${t.labelCls}`}>Kategória <span className="text-red-500">*</span></label>
                        <select value={editForm.categoryId} onChange={e => setEditForm(f => ({ ...f, categoryId: e.target.value }))}
                          className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-all ${t.modalInput}`}>
                          <option value="">Válassz kategóriát...</option>
                          {categories.map(cat => (
                            <option key={cat.id} value={cat.id} className={isDark ? "bg-[#1a1a2e]" : "bg-white"}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className={`flex gap-3 p-5 border-t ${isDark ? "border-white/10" : "border-gray-100"}`}>
                      <button onClick={() => setEditingListing(null)}
                        className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-colors ${t.modalCancel}`}>
                        Mégse
                      </button>
                      <button onClick={handleEditSave}
                        className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-sm font-bold shadow hover:-translate-y-0.5 transition-all">
                        Módosítások mentése
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* TRANZAKCIÓK */}
            <TabsContent value="transactions" className="focus-visible:outline-none">
              {transactions.length > 0 ? (
                <div className="space-y-4">
                  {transactions.map((tx: Transaction) => {
                    const isClient   = tx.client?.id === user?.id;
                    const isProvider = tx.provider?.id === user?.id;
                    const isPending  = tx.status === "PENDING";
                    const isCompleted = tx.status === "COMPLETED";
                    const txTitle    = tx.listing?.title ?? tx.listingTitle ?? `Tranzakció #${tx.id}`;
                    const canReview  = isCompleted && (isClient || isProvider) && !reviewedTxIds.has(tx.id);

                    return (
                      <Card key={tx.id} className={t.txCardBg}>
                        <CardContent className="p-5 flex flex-col gap-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                              <p className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{txTitle}</p>
                              <p className={`text-xs mt-1 ${t.subText}`}>{tx.client?.name} → {tx.provider?.name}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{new Date(tx.createdAt).toLocaleDateString("hu-HU")}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-indigo-400 font-black">{tx.agreedHours} óra</p>
                                <p className={`text-xs ${t.subText}`}>{tx.totalPrice} kredit</p>
                              </div>
                              <span className={`text-[10px] font-bold uppercase px-3 py-1.5 rounded-full ${
                                tx.status === "COMPLETED" ? "bg-green-500/20 text-green-500"
                                : tx.status === "CANCELLED" ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-500"
                              }`}>
                                {tx.status === "PENDING" ? "Folyamatban" : tx.status === "COMPLETED" ? "Teljesítve" : "Törölve"}
                              </span>
                            </div>
                          </div>

                          {isPending && (isClient || isProvider) && (
                            <div className="flex justify-end gap-2">
                              {isClient && (
                                <Button size="sm" onClick={() => handleCompleteTransaction(tx.id)}
                                  className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 h-8">
                                  Befejezés
                                </Button>
                              )}
                              <Button size="sm" onClick={() => handleCancelTransaction(tx.id)}
                                className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 h-8">
                                Törlés
                              </Button>
                            </div>
                          )}

                          {canReview && (
                            <div>
                              {reviewOpen !== tx.id ? (
                                <div className="flex justify-end">
                                  <button
                                    onClick={() => { setReviewOpen(tx.id); setReviewRating(5); setReviewComment(""); }}
                                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
                                  >
                                    <Star size={13} className="fill-indigo-400" /> Értékelés írása
                                  </button>
                                </div>
                              ) : (
                                <div className={`rounded-xl border p-4 space-y-3 ${t.reviewFormBg}`}>
                                  <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>Értékelje ezt a tranzakciót</p>
                                  <StarPicker value={reviewRating} onChange={setReviewRating} />
                                  <textarea
                                    value={reviewComment}
                                    onChange={(e) => setReviewComment(e.target.value)}
                                    placeholder="Írja le tapasztalatait (nem kötelező)..."
                                    rows={2}
                                    className={`w-full px-3 py-2 rounded-lg border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${t.reviewTextarea}`}
                                  />
                                  <div className="flex gap-2 justify-end">
                                    <button onClick={() => setReviewOpen(null)}
                                      className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${isDark ? "text-gray-400 hover:text-white hover:bg-white/10" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"}`}>
                                      Mégsem
                                    </button>
                                    <button onClick={() => handleSubmitReview(tx.id)}
                                      className="text-xs px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors">
                                      Beküldés
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {reviewedTxIds.has(tx.id) && (
                            <p className="text-xs text-green-500 font-medium text-right">✓ Értékelés elküldve</p>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className={`py-20 text-center border-2 border-dashed rounded-3xl ${t.emptyBorder}`}>
                  <div className="text-4xl mb-4">💸</div>
                  <p className={`font-medium ${t.subText}`}>Még nincs tranzakció.</p>
                </div>
              )}
            </TabsContent>

            {/* ÉRTÉKELÉSEK */}
            <TabsContent value="reviews" className="focus-visible:outline-none">
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id} className={t.txCardBg}>
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className={`text-xs ${t.subText} mb-2`}>{review.transaction?.listing?.title ?? "Ismeretlen hirdetés"}</p>
                            {review.comment && (
                              <p className={`text-sm leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>"{review.comment}"</p>
                            )}
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} size={16} className={star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"} />
                            ))}
                            <span className={`ml-1 text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{review.rating}/5</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className={`py-20 text-center border-2 border-dashed rounded-3xl ${t.emptyBorder}`}>
                  <div className="text-4xl mb-4">⭐</div>
                  <p className={`font-medium ${t.subText}`}>Még nem érkezett értékelés.</p>
                  <p className={`text-xs mt-1 ${t.subText}`}>Az értékelések lezárt tranzakciók után jelennek meg.</p>
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
