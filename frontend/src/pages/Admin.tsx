import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";
import {
  getAdminStats, getAdminUsers, getAdminTransactions, getAdminUserCharts, getAdminListingCharts, getAdminReviewCharts, adminUpdateUser, adminResolveTransaction,
} from "../services/admin.service";
import { api } from "../services/api";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend, AreaChart, Area } from "recharts";
import { Users, Package, Star, ArrowLeftRight, Shield, CheckCircle, XCircle, Tag, Pencil, Trash2, Plus, Search, Sun, Moon } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface AdminStats {
  totalUsers: number;
  totalListings: number;
  totalReviews: number;
  transactions: { pending: number; completed: number; cancelled: number; total: number };
}
interface AdminUser {
  id: number; name: string; email: string; role: string;
  trustLevel: string; isActive: boolean; balance: number; averageRating: number | null;
}
interface AdminTransaction {
  id: number; listing: { title: string } | null; listingTitle?: string | null;
  client: { name: string }; provider: { name: string };
  agreedHours: number; totalPrice: number;
  status: "PENDING" | "COMPLETED" | "CANCELLED"; createdAt: string;
}
interface Category { id: number; name: string; slug: string; }

// ─── Helpers ─────────────────────────────────────────────────────────────────
const TRUST_COLORS: Record<string, string> = {
  NEWCOMER: "bg-gray-500/20 text-gray-400 border border-gray-500/30",
  TRUSTED: "bg-sky-500/20 text-sky-400 border border-sky-500/30",
  VETERAN: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
};
const ROLE_COLORS: Record<string, string> = {
  ADMIN: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  USER: "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30",
};
const STATUS_CONFIG = {
  PENDING: { cls: "bg-amber-500/20 text-amber-400 border border-amber-500/30", label: "FÜGGŐBEN" },
  COMPLETED: { cls: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30", label: "BEFEJEZETT" },
  CANCELLED: { cls: "bg-red-500/20 text-red-400 border border-red-500/30", label: "TÖRÖLVE" },
};

const StatCard = ({ icon: Icon, label, value, sub, accent, isDark }: any) => (
  <div className={`rounded-2xl border p-5 flex flex-col gap-3 transition-all hover:-translate-y-0.5 ${isDark ? "bg-[#0f0f14] border-white/8" : "bg-white border-gray-200 shadow-sm"
    }`}>
    <div className="flex items-center justify-between">
      <span className={`text-xs font-semibold uppercase tracking-widest ${isDark ? "text-gray-500" : "text-gray-400"}`}>{label}</span>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${accent}`}>
        <Icon size={17} className="text-white" />
      </div>
    </div>
    <div>
      <p className={`text-3xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>{value}</p>
      {sub && <p className={`text-xs mt-0.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}>{sub}</p>}
    </div>
  </div>
);

const SectionHeader = ({ icon: Icon, title, sub, isDark }: any) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center shadow-lg shadow-indigo-500/20">
      <Icon size={18} className="text-white" />
    </div>
    <div>
      <h2 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{title}</h2>
      <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>{sub}</p>
    </div>
  </div>
);

const tooltipStyle = (isDark: boolean) => ({
  background: isDark ? "#1e1e2e" : "#fff",
  border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid #e5e7eb",
  borderRadius: "12px", fontSize: 13,
  color: isDark ? "#f1f5f9" : "#1e293b",
  boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.6)" : "0 4px 16px rgba(0,0,0,0.1)",
});

const tooltipLabelStyle = (isDark: boolean) => ({
  color: isDark ? "#94a3b8" : "#64748b",
  marginBottom: 2,
});

const formatDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("hu-HU", { month: "short", day: "numeric" });
  } catch { return dateStr; }
};

// ─── Admin Page ───────────────────────────────────────────────────────────────
// Az App.tsx AdminRoute garantálja hogy csak ADMIN user kerülhet ide.
const Admin = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const isDark = theme === "dark";

  // ── State ──
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "transactions" | "categories">("overview");
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [transactions, setTransactions] = useState<AdminTransaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [userCharts, setUserCharts] = useState<any>(null);
  const [listingCharts, setListingCharts] = useState<any>(null);
  const [reviewCharts, setReviewCharts] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [txFilter, setTxFilter] = useState<"ALL" | "PENDING" | "COMPLETED" | "CANCELLED">("ALL");
  const [userSearch, setUserSearch] = useState("");
  const [catName, setCatName] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const { logout } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const [s, u, tx, uc, lc, rc] = await Promise.all([
          getAdminStats(), getAdminUsers(), getAdminTransactions(),
          getAdminUserCharts(), getAdminListingCharts(), getAdminReviewCharts(),
        ]);
        setStats(s); setUsers(u); setTransactions(tx);
        setUserCharts(uc); setListingCharts(lc); setReviewCharts(rc);
        const catRes = await api.get("/categories").catch(() => ({ data: [] }));
        setCategories(catRes.data || []);
      } finally { setLoading(false); }
    })();
  }, []);

  const refreshCategories = async () => {
    const r = await api.get("/categories").catch(() => ({ data: [] }));
    setCategories(r.data || []);
  };

  const handleBanToggle = async (u: AdminUser) => {
    try {
      await adminUpdateUser(u.id, { isActive: !u.isActive });
      setUsers(prev => prev.map(x => x.id === u.id ? { ...x, isActive: !u.isActive } : x));
      showToast(u.isActive ? `${u.name} fiókja tiltva lett.` : `${u.name} fiókja aktiválva lett.`, u.isActive ? "warning" : "success");
    } catch {
      showToast("Hiba történt a művelet során.", "error");
    }
  };

  const handleTrustChange = async (u: AdminUser, val: string) => {
    try {
      await adminUpdateUser(u.id, { trustLevel: val });
      setUsers(prev => prev.map(x => x.id === u.id ? { ...x, trustLevel: val } : x));
      showToast(`${u.name} bizalmi szintje: ${val}`, "success");
    } catch {
      showToast("Hiba a bizalmi szint módosításakor.", "error");
    }
  };

  const handleResolve = async (id: number, action: "COMPLETE" | "CANCEL") => {
    try {
      await adminResolveTransaction(id, action);
      setTransactions(await getAdminTransactions());
      showToast(action === "COMPLETE" ? "Tranzakció sikeresen lezárva." : "Tranzakció törölve.", action === "COMPLETE" ? "success" : "warning");
    } catch {
      showToast("Hiba a tranzakció kezelésekor.", "error");
    }
  };

  const handleCreateCategory = async () => {
    if (!catName || !catSlug) return;
    try {
      await api.post("/admin/categories", { name: catName, slug: catSlug });
      setCatName(""); setCatSlug("");
      await refreshCategories();
      showToast(`„${catName}" kategória létrehozva.`, "success");
    } catch {
      showToast("Hiba a kategória létrehozásakor.", "error");
    }
  };

  const handleDeleteCategory = async (id: number) => {
    const cat = categories.find(c => c.id === id);
    try {
      await api.delete(`/admin/categories/${id}`);
      await refreshCategories();
      showToast(`„${cat?.name ?? "Kategória"}" törölve.`, "warning");
    } catch {
      showToast("Hiba a kategória törlésekor.", "error");
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCat) return;
    try {
      await api.patch(`/admin/categories/${editingCat.id}`, { name: editName, slug: editSlug });
      setEditingCat(null);
      await refreshCategories();
      showToast(`„${editName}" kategória frissítve.`, "success");
    } catch {
      showToast("Hiba a kategória módosításakor.", "error");
    }
  };

  const filteredTx = transactions.filter(tx => txFilter === "ALL" ? true : tx.status === txFilter);
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  // ── Chart data ──
  // byTrustLevel: [{trustLevel, count}]
  const trustData = (userCharts?.byTrustLevel ?? []).map((r: any) => ({ name: r.trustLevel, value: r.count }));
  // dailyRegistrations: [{date, count}]
  const registrationData = (userCharts?.registrationsLast30Days ?? []).slice(-30);
  // byCategory: [{category, count}]
  const categoryListingData = (listingCharts?.byCategory ?? []).map((r: any) => ({ name: r.category, value: r.count }));
  // ratingDistribution: [{rating, count}]
  const ratingData = (reviewCharts?.ratingDistribution ?? []).map((r: any) => ({ star: `${r.rating}★`, count: r.count }));
  const txStatusData = stats ? [
    { name: "Befejezett", value: stats.transactions.completed, fill: "#10b981" },
    { name: "Függőben", value: stats.transactions.pending, fill: "#f59e0b" },
    { name: "Törölve", value: stats.transactions.cancelled, fill: "#ef4444" },
  ] : [];

  // ── Styles ──
  const pageBg = isDark ? "bg-[#080810] min-h-screen transition-colors duration-300" : "bg-gray-50 min-h-screen transition-colors duration-300";
  const cardBg = isDark ? "bg-[#0f0f14] border-white/8" : "bg-white border-gray-200 shadow-sm";
  const tableBg = cardBg;
  const rowHover = isDark ? "hover:bg-white/3" : "hover:bg-gray-50";
  const divider = isDark ? "border-white/6" : "border-gray-100";
  const textPrimary = isDark ? "text-white" : "text-gray-900";
  const textSub = isDark ? "text-gray-400" : "text-gray-500";
  const inputCls = `w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition-all ${isDark
    ? "bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-indigo-500/50"
    : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
    }`;

  // ── Loading / guard ──
  if (loading) return (
    <div className={`${pageBg} flex items-center justify-center`}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
        <p className={`text-sm ${textSub}`}>Admin panel betöltése…</p>
      </div>
    </div>
  );

  const tabs = [
    { id: "overview", label: "Áttekintés", icon: "bi-bar-chart-line" },
    { id: "users", label: "Felhasználók", icon: "bi-people" },
    { id: "transactions", label: "Tranzakciók", icon: "bi-arrow-left-right" },
    { id: "categories", label: "Kategóriák", icon: "bi-tag" },
  ] as const;
  return (
    <div className={pageBg}>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">

        {/* Page header */}
        <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center shadow-lg shadow-indigo-500/25 flex-shrink-0">
              <Shield size={20} className="text-white" />
            </div>
            <div>
              <h1 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${textPrimary}`}>
                Admin Panel
              </h1>
              <p className={`text-xs sm:text-sm ${textSub}`}>
                Platform kezelés és felügyelet
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleTheme}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${isDark ? "hover:bg-white/10 text-yellow-400" : "hover:bg-gray-100 text-indigo-600"}`}
              title={isDark ? "Váltás világos módra" : "Váltás sötét módra"}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25 text-sm font-bold transition-all"
            >
              Kilépés
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="overflow-x-auto mb-8">
          <div className={`flex gap-1 p-1 rounded-2xl border w-fit min-w-full sm:min-w-0 ${isDark ? "bg-white/4 border-white/8" : "bg-gray-100 border-gray-200"}`}>
          {tabs.map(t => {
            const active = activeTab === t.id;
            return (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${active
                  ? "bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-lg shadow-indigo-500/20"
                  : isDark ? "text-gray-400 hover:text-white hover:bg-white/5" : "text-gray-500 hover:text-gray-900 hover:bg-white"
                  }`}>
                <i className={`bi ${t.icon} text-xs`} />
                {t.label}
              </button>
            );
          })}
        </div>
        </div>

        {/* ══ OVERVIEW ══════════════════════════════════════════════════════════ */}
        {activeTab === "overview" && stats && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <StatCard icon={Users} label="Felhasználók" value={stats.totalUsers} accent="bg-indigo-600" isDark={isDark} />
              <StatCard icon={Package} label="Hirdetések" value={stats.totalListings} accent="bg-purple-600" isDark={isDark} />
              <StatCard icon={Star} label="Értékelések" value={stats.totalReviews} accent="bg-amber-600" isDark={isDark} />
              <StatCard icon={ArrowLeftRight} label="Tranzakciók" value={stats.transactions.total}
                sub={`${stats.transactions.pending} függőben`} accent="bg-emerald-600" isDark={isDark} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Tx status pie */}
              <div className={`rounded-2xl border p-6 ${cardBg}`}>
                <SectionHeader icon={ArrowLeftRight} title="Tranzakció státuszok" sub="Megoszlás státusz szerint" isDark={isDark} />
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={txStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={3}>
                      {txStatusData.map((e, i) => <Cell key={i} fill={e.fill} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle(isDark)} labelStyle={tooltipLabelStyle(isDark)} itemStyle={{ color: isDark ? "#f1f5f9" : "#1e293b" }} formatter={(v: any, name: any) => [v, name]} />
                    <Legend iconType="circle" iconSize={8} formatter={(v) => <span className={textSub}>{v}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Trust level bar */}
              <div className={`rounded-2xl border p-6 ${cardBg}`}>
                <SectionHeader icon={Users} title="Bizalmi szint eloszlás" sub="Felhasználók trust level szerint" isDark={isDark} />
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={trustData} barSize={40}>
                    <defs>
                      <linearGradient id="trustGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#667eea" /><stop offset="100%" stopColor="#764ba2" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255,255,255,0.05)" : "#f3f4f6"} />
                    <XAxis dataKey="name" tick={{ fill: isDark ? "#6b7280" : "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: isDark ? "#6b7280" : "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={tooltipStyle(isDark)} labelStyle={tooltipLabelStyle(isDark)} itemStyle={{ color: isDark ? "#f1f5f9" : "#1e293b" }} cursor={{ fill: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }} formatter={(v: any) => [v, "Felhasználó"]} />
                    <Bar dataKey="value" fill="url(#trustGrad)" radius={[8, 8, 0, 0]}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Daily registrations */}
              <div className={`rounded-2xl border p-6 ${cardBg}`}>
                <SectionHeader icon={Users} title="Napi regisztrációk" sub="Utolsó 30 nap" isDark={isDark} />
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={registrationData}>
                    <defs>
                      <linearGradient id="regGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#667eea" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#667eea" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255,255,255,0.05)" : "#f3f4f6"} />
                    <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fill: isDark ? "#6b7280" : "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
                    <YAxis tick={{ fill: isDark ? "#6b7280" : "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                    <Tooltip contentStyle={tooltipStyle(isDark)} labelStyle={tooltipLabelStyle(isDark)} itemStyle={{ color: isDark ? "#f1f5f9" : "#1e293b" }} cursor={{ stroke: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)", strokeWidth: 1 }} formatter={(v: any) => [v, "Regisztráció"]} labelFormatter={formatDate} />
                    <Area type="monotone" dataKey="count" stroke="#667eea" strokeWidth={2} fill="url(#regGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Rating distribution */}
              <div className={`rounded-2xl border p-6 ${cardBg}`}>
                <SectionHeader icon={Star} title="Értékelések eloszlása"
                  sub={`Átlag: ${reviewCharts?.averageRating?.toFixed(2) ?? "–"} ★`} isDark={isDark} />
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={ratingData} barSize={36}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255,255,255,0.05)" : "#f3f4f6"} />
                    <XAxis dataKey="star" tick={{ fill: isDark ? "#6b7280" : "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: isDark ? "#6b7280" : "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
                    <Tooltip contentStyle={tooltipStyle(isDark)} labelStyle={tooltipLabelStyle(isDark)} itemStyle={{ color: isDark ? "#f1f5f9" : "#1e293b" }} cursor={{ fill: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }} formatter={(v: any) => [v, "Értékelés"]} />
                    <Bar dataKey="count" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category listing distribution */}
            {categoryListingData.length > 0 && (
              <div className={`rounded-2xl border p-6 ${cardBg}`}>
                <SectionHeader icon={Tag} title="Hirdetések kategóriánként" sub="Aktív hirdetések megoszlása" isDark={isDark} />
                <ResponsiveContainer width="100%" height={Math.max(240, categoryListingData.length * 36)}>
                  <BarChart data={categoryListingData} layout="vertical" barSize={18} margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
                    <defs>
                      <linearGradient id="catGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#667eea" /><stop offset="100%" stopColor="#764ba2" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255,255,255,0.05)" : "#f3f4f6"} horizontal={false} />
                    <XAxis type="number" tick={{ fill: isDark ? "#6b7280" : "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
                    <YAxis type="category" dataKey="name" tick={{ fill: isDark ? "#9ca3af" : "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} width={160} />
                    <Tooltip contentStyle={tooltipStyle(isDark)} labelStyle={tooltipLabelStyle(isDark)} itemStyle={{ color: isDark ? "#f1f5f9" : "#1e293b" }} cursor={{ fill: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }} formatter={(v: any) => [v, "Hirdetés"]} />
                    <Bar dataKey="value" fill="url(#catGrad)" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}

        {/* ══ USERS ════════════════════════════════════════════════════════════ */}
        {activeTab === "users" && (
          <div className="space-y-6">
            <SectionHeader icon={Users} title="Felhasználók" sub="Összes regisztrált felhasználó kezelése" isDark={isDark} />
            <div className="relative max-w-sm">
              <Search size={15} className={`absolute left-3 top-1/2 -translate-y-1/2 ${textSub}`} />
              <input className={`${inputCls} pl-9`} placeholder="Keresés név vagy e-mail alapján…"
                value={userSearch} onChange={e => setUserSearch(e.target.value)} />
            </div>
            <div className={`rounded-2xl border overflow-hidden ${tableBg}`}>
              <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead>
                  <tr className={`border-b text-xs uppercase tracking-wider ${divider} ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                    <th className="text-left px-5 py-4 font-semibold">Felhasználó</th>
                    <th className="text-left px-4 py-4 font-semibold">Szerepkör</th>
                    <th className="text-left px-4 py-4 font-semibold">Bizalmi szint</th>
                    <th className="text-left px-4 py-4 font-semibold">Státusz</th>
                    <th className="text-right px-4 py-4 font-semibold">Egyenleg</th>
                    <th className="text-right px-5 py-4 font-semibold">Műveletek</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u, i) => (
                    <tr key={u.id} className={`border-b transition-colors ${divider} ${rowHover} ${i === filteredUsers.length - 1 ? "border-0" : ""}`}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {u.name[0].toUpperCase()}
                          </div>
                          <div>
                            <p className={`font-semibold leading-tight ${textPrimary}`}>{u.name}</p>
                            <p className={`text-xs ${textSub}`}>{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${ROLE_COLORS[u.role] || ROLE_COLORS.USER}`}>{u.role}</span>
                      </td>
                      <td className="px-4 py-4">
                        {u.role !== "ADMIN" ? (
                          <select value={u.trustLevel} onChange={e => handleTrustChange(u, e.target.value)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer outline-none border ${isDark ? "bg-transparent border-white/10 text-gray-200" : "bg-transparent border-gray-200 text-gray-700"}`}>
                            {["NEWCOMER", "TRUSTED", "VETERAN"].map(t => (
                              <option key={t} value={t} className={isDark ? "bg-[#1a1a2e]" : "bg-white"}>{t}</option>
                            ))}
                          </select>
                        ) : (
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${TRUST_COLORS[u.trustLevel] || TRUST_COLORS.VETERAN}`}>{u.trustLevel}</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${u.isActive ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>
                          {u.isActive ? "Aktív" : "Tiltott"}
                        </span>
                      </td>
                      <td className={`px-4 py-4 text-right font-semibold ${textPrimary}`}>
                        {u.balance} <span className={`text-xs font-normal ${textSub}`}>kr</span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        {u.role !== "ADMIN" && (
                          <button onClick={() => handleBanToggle(u)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${u.isActive
                              ? "bg-red-500/15 text-red-400 hover:bg-red-500/25 border border-red-500/30"
                              : "bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30"}`}>
                            {u.isActive ? "Tiltás" : "Aktiválás"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr><td colSpan={6} className={`px-5 py-10 text-center ${textSub}`}>Nincs találat</td></tr>
                  )}
                </tbody>
              </table>
              </div>
            </div>
          </div>
        )}

        {/* ══ TRANSACTIONS ════════════════════════════════════════════════════ */}
        {activeTab === "transactions" && (
          <div className="space-y-6">
            <SectionHeader icon={ArrowLeftRight} title="Tranzakciók" sub="Platform-szintű tranzakciók kezelése" isDark={isDark} />
            <div className="overflow-x-auto">
            <div className={`flex gap-1 p-1 rounded-xl border w-fit ${isDark ? "bg-white/4 border-white/8" : "bg-gray-100 border-gray-200"}`}>
              {(["ALL", "PENDING", "COMPLETED", "CANCELLED"] as const).map(f => (
                <button key={f} onClick={() => setTxFilter(f)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${txFilter === f
                    ? "bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow"
                    : isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}>
                  {f === "ALL" ? "ÖSSZES" : f === "PENDING" ? "FÜGGŐBEN" : f === "COMPLETED" ? "BEFEJEZETT" : "TÖRÖLVE"}
                  <span className={`ml-1.5 px-1.5 py-0.5 rounded text-[10px] ${txFilter === f ? "bg-white/20" : isDark ? "bg-white/8" : "bg-gray-200"}`}>
                    {f === "ALL" ? transactions.length : transactions.filter(t => t.status === f).length}
                  </span>
                </button>
              ))}
            </div>
            </div>
            <div className={`rounded-2xl border overflow-hidden ${tableBg}`}>
              <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[800px]">
                <thead>
                  <tr className={`border-b text-xs uppercase tracking-wider ${divider} ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                    <th className="text-left px-4 py-4 font-semibold">Hirdetés</th>
                    <th className="text-left px-4 py-4 font-semibold">Kliens</th>
                    <th className="text-left px-4 py-4 font-semibold">Szolgáltató</th>
                    <th className="text-center px-4 py-4 font-semibold">Órák</th>
                    <th className="text-right px-4 py-4 font-semibold">Összeg</th>
                    <th className="text-left px-4 py-4 font-semibold">Státusz</th>
                    <th className="text-left px-4 py-4 font-semibold">Dátum</th>
                    <th className="text-right px-5 py-4 font-semibold">Műveletek</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTx.map((tx, i) => {
                    const sc = STATUS_CONFIG[tx.status];
                    const title = tx.listing?.title || tx.listingTitle || "–";
                    const date = new Date(tx.createdAt).toLocaleDateString("hu-HU", { year: "numeric", month: "short", day: "numeric" });
                    return (
                      <tr key={tx.id} className={`border-b transition-colors ${divider} ${rowHover} ${i === filteredTx.length - 1 ? "border-0" : ""}`}>
                        <td className={`px-4 py-4 max-w-[160px] truncate font-medium ${textPrimary}`} title={title}>{title}</td>
                        <td className={`px-4 py-4 ${textPrimary}`}>{tx.client.name}</td>
                        <td className={`px-4 py-4 ${textPrimary}`}>{tx.provider.name}</td>
                        <td className={`px-4 py-4 text-center ${textSub}`}>{tx.agreedHours}ó</td>
                        <td className={`px-4 py-4 text-right font-semibold ${textPrimary}`}>
                          {tx.totalPrice} <span className={`text-xs font-normal ${textSub}`}>kr</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${sc.cls}`}>{sc.label}</span>
                        </td>
                        <td className={`px-4 py-4 text-xs ${textSub}`}>{date}</td>
                        <td className="px-5 py-4 text-right">
                          {tx.status === "PENDING" && (
                            <div className="flex gap-2 justify-end">
                              <button onClick={() => handleResolve(tx.id, "COMPLETE")}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30 text-xs font-bold transition-all">
                                <CheckCircle size={12} /> Befejezett
                              </button>
                              <button onClick={() => handleResolve(tx.id, "CANCEL")}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-500/15 text-red-400 hover:bg-red-500/25 border border-red-500/30 text-xs font-bold transition-all">
                                <XCircle size={12} /> Törlés
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {filteredTx.length === 0 && (
                    <tr><td colSpan={8} className={`px-5 py-10 text-center ${textSub}`}>Nincs tranzakció ebben a kategóriában</td></tr>
                  )}
                </tbody>
              </table>
              </div>
            </div>
          </div>
        )}

        {/* ══ CATEGORIES ══════════════════════════════════════════════════════ */}
        {activeTab === "categories" && (
          <div className="space-y-6">
            <SectionHeader icon={Tag} title="Kategóriák" sub="Hirdetési kategóriák kezelése" isDark={isDark} />

            {/* Create form */}
            <div className={`rounded-2xl border p-6 ${cardBg}`}>
              <h3 className={`text-sm font-bold mb-4 ${textPrimary}`}>Új kategória létrehozása</h3>
              <div className="flex gap-3 flex-wrap">
                <div className="flex-1 min-w-[180px]">
                  <label className={`text-xs font-semibold mb-1.5 block ${textSub}`}>Név</label>
                  <input className={inputCls} placeholder="pl. Otthon & Kert" value={catName}
                    onChange={e => { setCatName(e.target.value); setCatSlug(e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")); }} />
                </div>
                <div className="flex-1 min-w-[180px]">
                  <label className={`text-xs font-semibold mb-1.5 block ${textSub}`}>Slug</label>
                  <input className={inputCls} placeholder="pl. otthon-kert" value={catSlug}
                    onChange={e => setCatSlug(e.target.value)} />
                </div>
                <div className="flex items-end">
                  <button onClick={handleCreateCategory} disabled={!catName || !catSlug}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-sm font-bold shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                    <Plus size={15} /> Létrehozás
                  </button>
                </div>
              </div>
            </div>

            {/* Edit modal */}
            {editingCat && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
                <div className={`w-full max-w-md rounded-2xl border p-6 ${isDark ? "bg-[#0f0f14] border-white/10" : "bg-white border-gray-200"} shadow-2xl`}>
                  <h3 className={`text-base font-bold mb-5 ${textPrimary}`}>Kategória szerkesztése</h3>
                  <div className="space-y-4">
                    <div>
                      <label className={`text-xs font-semibold mb-1.5 block ${textSub}`}>Név</label>
                      <input className={inputCls} value={editName} onChange={e => setEditName(e.target.value)} />
                    </div>
                    <div>
                      <label className={`text-xs font-semibold mb-1.5 block ${textSub}`}>Slug</label>
                      <input className={inputCls} value={editSlug} onChange={e => setEditSlug(e.target.value)} />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={handleUpdateCategory}
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-sm font-bold shadow hover:-translate-y-0.5 transition-all">
                      Mentés
                    </button>
                    <button onClick={() => setEditingCat(null)}
                      className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-colors ${isDark ? "border-white/10 text-gray-400 hover:bg-white/5" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                      Mégse
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Categories table */}
            <div className={`rounded-2xl border overflow-hidden ${tableBg}`}>
              <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[400px]">
                <thead>
                  <tr className={`border-b text-xs uppercase tracking-wider ${divider} ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                    <th className="text-left px-4 py-4 font-semibold">Név</th>
                    <th className="text-left px-4 py-4 font-semibold">Slug</th>
                    <th className="text-right px-5 py-4 font-semibold">Műveletek</th>
                  </tr>
                </thead>
                <tbody>
                  {[...categories].sort((a, b) => a.name.localeCompare(b.name)).map((cat, i, arr) => (
                    <tr key={cat.id} className={`border-b transition-colors ${divider} ${rowHover} ${i === arr.length - 1 ? "border-0" : ""}`}>
                      <td className={`px-4 py-4 font-semibold ${textPrimary}`}>{cat.name}</td>
                      <td className="px-4 py-4">
                        <code className={`px-2 py-0.5 rounded text-xs font-mono ${isDark ? "bg-white/8 text-indigo-400" : "bg-indigo-50 text-indigo-600"}`}>{cat.slug}</code>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <button onClick={() => { setEditingCat(cat); setEditName(cat.name); setEditSlug(cat.slug); }}
                            className={`p-2 rounded-xl transition-colors ${isDark ? "hover:bg-white/8 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}>
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => handleDeleteCategory(cat.id)}
                            className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {categories.length === 0 && (
                    <tr><td colSpan={3} className={`px-5 py-10 text-center ${textSub}`}>Nincsenek kategóriák</td></tr>
                  )}
                </tbody>
              </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Admin;