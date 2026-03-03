import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Search, X } from "lucide-react"
import type { ListingFilter } from "../../types/listing.types"

interface Props {
  onFilter: (filters: ListingFilter) => void
}

export default function FilterBar({ onFilter }: Props) {
  const [filters, setFilters] = useState<ListingFilter>({})
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    let v: any = value
    if (type === "number") {
      v = value === "" ? undefined : parseFloat(value)
    }
    setFilters({ ...filters, [name]: v || undefined })
  }

  const handleApply = () => {
    onFilter(filters)
    setIsOpen(false)
  }

  const hasFilters = Object.values(filters).some(v => v !== undefined && v !== "")

  const handleReset = () => {
    setFilters({})
    onFilter({})
  }

  return (
    <>
      {/* Toggle button */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="rounded-lg font-semibold transition-all bg-white text-black border-slate-300 hover:bg-slate-50"
      >
        <Search size={16} className="mr-2" />
        {hasFilters ? `Szűrők (${Object.values(filters).filter(v => v).length})` : "Szűrések"}
      </Button>

      {/* Modal overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">

            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-slate-200 bg-white">
              <h2 className="text-2xl font-bold text-slate-900">Szűrések</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={24} className="text-slate-600" />
              </button>
            </div>

            {/* Filters */}
            <div className="p-6 space-y-4">

              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">Keresés</label>
                <Input
                  name="search"
                  placeholder="Cím vagy leírás..."
                  onChange={handleChange}
                  className="rounded-lg border-slate-300 text-black"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">Kategória</label>
                <Input
                  name="category"
                  placeholder="pl. Babysitting"
                  onChange={handleChange}
                  className="rounded-lg border-slate-300 text-black"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">Típus</label>
                <select
                  name="type"
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                >
                  <option value="">Összes</option>
                  <option value="REQUEST">Keresett</option>
                  <option value="OFFER">Ajánlat</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Min ár ($/hr)</label>
                  <Input
                    name="minPrice"
                    type="number"
                    placeholder="0"
                    onChange={handleChange}
                    className="rounded-lg border-slate-300 text-black"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Max ár ($/hr)</label>
                  <Input
                    name="maxPrice"
                    type="number"
                    placeholder="1000"
                    onChange={handleChange}
                    className="rounded-lg border-slate-300 text-black"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 rounded-lg font-semibold transition-colors"
                >
                  Mégse
                </Button>
                <Button
                  onClick={handleApply}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Alkalmazás
                </Button>
              </div>

              {hasFilters && (
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="w-full bg-red-50 hover:bg-red-100 text-red-600 border-red-200 rounded-lg font-semibold transition-colors"
                >
                  <X size={16} className="mr-1" />
                  Szűrők törlése
                </Button>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  )
}