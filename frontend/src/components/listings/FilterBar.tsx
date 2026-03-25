import { useState, useEffect } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { X, SlidersHorizontal } from "lucide-react"
import type { ListingFilter } from "../../types/listing.types"
import { useTheme } from "../../context/ThemeContext"
import { useToast } from "../../context/ToastContext"
import { api } from "../../services/api"

interface Category {
  id: number
  name: string
  slug: string
}

interface Props {
  onFilter: (filters: ListingFilter) => void
  mobileOnly?: boolean
}

function FilterFields({ values, categories, onChange, isDark }: {
  values: ListingFilter
  categories: Category[]
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  isDark: boolean
}) {
  const labelCls = isDark ? "text-gray-400 transition-colors duration-300" : "text-slate-700 transition-colors duration-300"
  const inputCls = isDark ? "bg-[#1a1a1f] border-white/10 text-white transition-colors duration-300" : "border-slate-300 text-black bg-white transition-colors duration-300"
  const selectCls = isDark
    ? "w-full px-3 py-2 rounded-lg border border-white/10 bg-[#1a1a1f] text-white text-sm focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
    : "w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 text-black bg-white transition-colors duration-300"

  return (
    <div className="space-y-4">
      <div>
        <label className={`text-sm font-semibold block mb-1.5 ${labelCls}`}>Keresés</label>
        <Input name="search" placeholder="Cím vagy leírás..." value={values.search ?? ""} onChange={onChange} className={`rounded-lg ${inputCls}`} />
      </div>
      <div>
        <label className={`text-sm font-semibold block mb-1.5 ${labelCls}`}>Kategória</label>
        <select name="category" value={values.category ? String(values.category) : ""} onChange={onChange} className={selectCls}>
          <option value="">Összes</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={`text-sm font-semibold block mb-1.5 ${labelCls}`}>Típus</label>
        <select name="type" value={values.type ?? ""} onChange={onChange} className={selectCls}>
          <option value="">Összes</option>
          <option value="REQUEST">Keresett</option>
          <option value="OFFER">Ajánlat</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={`text-sm font-semibold block mb-1.5 ${labelCls}`}>Min ár</label>
          <Input name="minPrice" type="number" placeholder="0" value={values.minPrice ?? ""} onChange={onChange} className={`rounded-lg ${inputCls}`} />
        </div>
        <div>
          <label className={`text-sm font-semibold block mb-1.5 ${labelCls}`}>Max ár</label>
          <Input name="maxPrice" type="number" placeholder="1000" value={values.maxPrice ?? ""} onChange={onChange} className={`rounded-lg ${inputCls}`} />
        </div>
      </div>
    </div>
  )
}

function buildFilterSummary(filters: ListingFilter): string {
  const parts: string[] = []
  if (filters.search) parts.push(`"${filters.search}"`)
  if (filters.category) parts.push(String(filters.category))
  if (filters.type) parts.push(filters.type === "OFFER" ? "Ajánlat" : "Keresett")
  if (filters.minPrice !== undefined) parts.push(`min. ${filters.minPrice} $/h`)
  if (filters.maxPrice !== undefined) parts.push(`max. ${filters.maxPrice} $/h`)
  return parts.join(", ")
}

export default function FilterBar({ onFilter, mobileOnly = false }: Props) {
  const { theme } = useTheme()
  const { showToast } = useToast()
  const isDark = theme === "dark"
  const [filters, setFilters] = useState<ListingFilter>({})
  const [modalOpen, setModalOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    api.get("/categories").then(res => setCategories(res.data)).catch(console.error)
  }, [])

  const hasFilters = Object.values(filters).some(v => v !== undefined && v !== "")
  const activeCount = Object.values(filters).filter(v => v !== undefined && v !== "").length

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    let v: any = value
    if (type === "number") v = value === "" ? undefined : parseFloat(value)
    setFilters(prev => ({ ...prev, [name]: v || undefined }))
  }

  const handleApply = (close?: () => void) => {
    onFilter(filters)
    close?.()
    const summary = buildFilterSummary(filters)
    if (summary) {
      showToast(`Szűrő alkalmazva: ${summary}`, "info")
    } else {
      showToast("Szűrők alkalmazva – összes hirdetés látható.", "info")
    }
  }

  const handleReset = () => {
    setFilters({})
    onFilter({})
    showToast("Szűrők törölve.", "warning")
  }

  const panelBg = isDark ? "bg-[#0f0f14] border-white/10 transition-colors duration-300" : "bg-white border-slate-200 transition-colors duration-300"
  const panelTitle = isDark ? "text-white transition-colors duration-300" : "text-slate-900 transition-colors duration-300"
  const resetBtn = isDark ? "bg-red-900/30 hover:bg-red-900/50 text-red-400 border-red-900/50 transition-colors duration-300" : "bg-red-50 hover:bg-red-100 text-red-600 border-red-200 transition-colors duration-300"
  const mobileBtn = isDark ? "bg-white/5 text-white border-white/10 hover:bg-white/10 transition-colors duration-300" : "bg-white text-black border-slate-300 hover:bg-slate-50 transition-colors duration-300"

  if (mobileOnly) {
    return (
      <>
        <Button variant="outline" onClick={() => setModalOpen(true)} className={`relative rounded-lg font-semibold transition-all ${mobileBtn}`}>
          <SlidersHorizontal size={16} className="mr-2" />Szűrés
          {hasFilters && <span className="ml-1.5 bg-indigo-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{activeCount}</span>}
        </Button>
        {modalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:items-center justify-center">
            <div className={`rounded-t-2xl md:rounded-2xl shadow-2xl w-full md:max-w-md max-h-[90vh] overflow-y-auto border ${panelBg}`}>
              <div className={`sticky top-0 flex items-center justify-between p-5 border-b rounded-t-2xl ${panelBg}`}>
                <h2 className={`text-xl font-bold ${panelTitle}`}>Szűrések</h2>
                <button onClick={() => setModalOpen(false)} className="p-1.5 hover:bg-white/5 rounded-lg"><X size={22} className="text-gray-400" /></button>
              </div>
              <div className="p-5 space-y-4">
                <FilterFields values={filters} categories={categories} onChange={handleChange} isDark={isDark} />
                <div className={`flex gap-3 pt-3 border-t ${isDark ? "border-white/10" : "border-slate-100"}`}>
                  <Button variant="outline" onClick={() => setModalOpen(false)}
                    className={`flex-1 rounded-lg font-semibold transition-colors ${isDark ? "bg-white/5 hover:bg-white/10 text-gray-300 border-white/10" : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"}`}>
                    Mégse
                  </Button>
                  <Button onClick={() => handleApply(() => setModalOpen(false))}
                    className="flex-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-lg font-semibold transition-colors">
                    Alkalmazás
                  </Button>
                </div>
                {hasFilters && <Button variant="outline" onClick={handleReset} className={`w-full rounded-lg font-semibold ${resetBtn}`}><X size={15} className="mr-1" />Szűrők törlése</Button>}
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <div className={`border rounded-2xl shadow-sm p-5 ${panelBg}`}>
      <h2 className={`text-base font-bold mb-4 flex items-center gap-2 ${panelTitle}`}>
        <SlidersHorizontal size={16} className="text-gray-400" />Szűrések
      </h2>
      <FilterFields values={filters} categories={categories} onChange={handleChange} isDark={isDark} />
      <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
        <Button onClick={() => handleApply()} className="w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-lg font-semibold transition-all">Alkalmazás</Button>
        {hasFilters && <Button variant="outline" onClick={handleReset} className={`w-full rounded-lg font-semibold ${resetBtn}`}><X size={15} className="mr-1" />Törlés</Button>}
      </div>
    </div>
  )
}