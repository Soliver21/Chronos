import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Search, X, SlidersHorizontal } from "lucide-react"
import type { ListingFilter } from "../../types/listing.types"

interface Props {
  onFilter: (filters: ListingFilter) => void
  mobileOnly?: boolean  // ha true, csak a gombot rendereli (modal módban)
}

function FilterFields({
  values,
  onChange,
}: {
  values: ListingFilter
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-semibold text-slate-700 block mb-1.5">Keresés</label>
        <Input name="search" placeholder="Cím vagy leírás..." value={values.search ?? ""} onChange={onChange} className="rounded-lg border-slate-300 text-black" />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-700 block mb-1.5">Kategória</label>
        <Input name="category" placeholder="pl. Babysitting" value={values.category ? String(values.category) : ""} onChange={onChange} className="rounded-lg border-slate-300 text-black" />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-700 block mb-1.5">Típus</label>
        <select name="type" value={values.type ?? ""} onChange={onChange} className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 text-black">
          <option value="">Összes</option>
          <option value="REQUEST">Keresett</option>
          <option value="OFFER">Ajánlat</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-1.5">Min ár</label>
          <Input name="minPrice" type="number" placeholder="0" value={values.minPrice ?? ""} onChange={onChange} className="rounded-lg border-slate-300 text-black" />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-1.5">Max ár</label>
          <Input name="maxPrice" type="number" placeholder="1000" value={values.maxPrice ?? ""} onChange={onChange} className="rounded-lg border-slate-300 text-black" />
        </div>
      </div>
    </div>
  )
}

export default function FilterBar({ onFilter, mobileOnly = false }: Props) {
  const [filters, setFilters] = useState<ListingFilter>({})
  const [modalOpen, setModalOpen] = useState(false)

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
  }

  const handleReset = () => {
    setFilters({})
    onFilter({})
  }

  // --- MOBIL: sadece gomb + modal ---
  if (mobileOnly) {
    return (
      <>
        <Button
          variant="outline"
          onClick={() => setModalOpen(true)}
          className="relative rounded-lg font-semibold bg-white text-black border-slate-300 hover:bg-slate-50 transition-all"
        >
          <SlidersHorizontal size={16} className="mr-2" />
          Szűrés
          {hasFilters && (
            <span className="ml-1.5 bg-blue-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </Button>

        {modalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4">
            <div className="bg-white rounded-t-2xl md:rounded-2xl shadow-2xl w-full md:max-w-md max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 flex items-center justify-between p-5 border-b border-slate-200 bg-white rounded-t-2xl md:rounded-t-none">
                <h2 className="text-xl font-bold text-slate-900">Szűrések</h2>
                <button onClick={() => setModalOpen(false)} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                  <X size={22} className="text-slate-600" />
                </button>
              </div>
              <div className="p-5 space-y-4">
                <FilterFields values={filters} onChange={handleChange} />
                <div className="flex gap-3 pt-3 border-t border-slate-100">
                  <Button variant="outline" onClick={() => setModalOpen(false)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 rounded-lg font-semibold transition-colors">
                    Mégse
                  </Button>
                  <Button onClick={() => handleApply(() => setModalOpen(false))}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                    Alkalmazás
                  </Button>
                </div>
                {hasFilters && (
                  <Button variant="outline" onClick={handleReset}
                    className="w-full bg-red-50 hover:bg-red-100 text-red-600 border-red-200 rounded-lg font-semibold transition-colors">
                    <X size={15} className="mr-1" /> Szűrők törlése
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  // --- DESKTOP: oldalsáv panel ---
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
      <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
        <SlidersHorizontal size={16} className="text-slate-500" />
        Szűrések
      </h2>
      <FilterFields values={filters} onChange={handleChange} />
      <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
        <Button onClick={() => handleApply()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
          Alkalmazás
        </Button>
        {hasFilters && (
          <Button variant="outline" onClick={handleReset}
            className="w-full bg-red-50 hover:bg-red-100 text-red-600 border-red-200 rounded-lg font-semibold transition-colors">
            <X size={15} className="mr-1" /> Törlés
          </Button>
        )}
      </div>
    </div>
  )
}