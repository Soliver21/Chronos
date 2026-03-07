import { useState } from "react"
import { createListing } from "../../services/listing.service"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { X, Plus } from "lucide-react"

interface Props {
  onCreated: () => void
}

export default function CreateListingButton({ onCreated }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: "",
    description: "",
    pricePerHour: "",
    estimatedHours: "",
    categoryId: "",
    type: "OFFER" as "OFFER" | "REQUEST",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await createListing({
        title: form.title,
        description: form.description,
        pricePerHour: parseFloat(form.pricePerHour) || 0,
        estimatedHours: form.estimatedHours ? parseInt(form.estimatedHours) : undefined,
        categoryId: parseInt(form.categoryId, 10),
        type: form.type,
      })
      setForm({ title: "", description: "", pricePerHour: "", estimatedHours: "", categoryId: "", type: "OFFER" })
      setOpen(false)
      onCreated()
    } catch (error) {
      console.error("Error creating listing:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Gomb – mindig látható */}
      <Button
        onClick={() => setOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl rounded-lg px-6 py-2.5 font-semibold flex items-center gap-2 transition-all"
      >
        <Plus size={20} />
        Új hirdetés
      </Button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="bg-white rounded-t-2xl md:rounded-2xl shadow-2xl w-full md:max-w-md max-h-[90vh] overflow-y-auto">

            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between p-5 border-b border-slate-200 bg-white rounded-t-2xl md:rounded-t-none">
              <h2 className="text-2xl font-bold text-slate-900">Új hirdetés</h2>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={24} className="text-slate-600" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">

              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">
                  Cím <span className="text-red-500">*</span>
                </label>
                <Input
                  name="title"
                  placeholder="pl. Baby sitter kerestetik"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="rounded-lg border-slate-300 text-black"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">
                  Leírás <span className="text-red-500">*</span>
                </label>
                <Textarea
                  name="description"
                  placeholder="Adjon részletes leírást..."
                  value={form.description}
                  onChange={handleChange}
                  required
                  className="rounded-lg border-slate-300 min-h-24 text-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">
                    Ár/óra <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="pricePerHour"
                    type="number"
                    placeholder="15"
                    value={form.pricePerHour}
                    onChange={handleChange}
                    required
                    className="rounded-lg border-slate-300 text-black"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">
                    Becsült órák
                  </label>
                  <Input
                    name="estimatedHours"
                    type="number"
                    placeholder="3"
                    value={form.estimatedHours}
                    onChange={handleChange}
                    className="rounded-lg border-slate-300 text-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">
                    Kategória ID <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="categoryId"
                    type="number"
                    placeholder="1"
                    value={form.categoryId}
                    onChange={handleChange}
                    required
                    className="rounded-lg border-slate-300 text-black"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">
                    Típus <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  >
                    <option value="OFFER">Ajánlat</option>
                    <option value="REQUEST">Keresett</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 rounded-lg font-semibold transition-colors"
                >
                  Mégse
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  {loading ? "Mentés..." : "Mentés"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}