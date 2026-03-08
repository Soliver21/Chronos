import { useState } from "react"
import { createListing } from "../../services/listing.service"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { X, Plus } from "lucide-react"
import { useTheme } from "../../context/ThemeContext"

interface Props {
  onCreated: () => void
}

export default function CreateListingButton({ onCreated }: Props) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: "", description: "", pricePerHour: "",
    estimatedHours: "", categoryId: "", type: "OFFER" as "OFFER" | "REQUEST",
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
        title: form.title, description: form.description,
        pricePerHour: parseFloat(form.pricePerHour) || 0,
        estimatedHours: form.estimatedHours ? parseInt(form.estimatedHours) : undefined,
        categoryId: parseInt(form.categoryId, 10), type: form.type,
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

  const modalBg = isDark ? "bg-[#0f0f14] border border-white/10" : "bg-white"
  const headerBg = isDark ? "bg-[#0f0f14] border-white/10" : "bg-white border-slate-200"
  const titleCls = isDark ? "text-white" : "text-slate-900"
  const labelCls = isDark ? "text-gray-400" : "text-slate-700"
  const inputCls = isDark ? "bg-[#1a1a1f] border-white/10 text-white" : "border-slate-300 text-black bg-white"
  const selectCls = isDark
    ? "w-full px-3 py-2 rounded-lg border border-white/10 bg-[#1a1a1f] text-white text-sm focus:ring-2 focus:ring-indigo-500"
    : "w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 text-black bg-white"
  const cancelCls = isDark
    ? "flex-1 bg-white/5 hover:bg-white/10 text-gray-300 border-white/10 rounded-lg font-semibold"
    : "flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 rounded-lg font-semibold"

  return (
    <>
      {/* Gomb – mindig látható */}
      <Button
        onClick={() => setOpen(true)}
        className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 rounded-lg px-6 py-2.5 font-semibold flex items-center gap-2 transition-all"
      >
        <Plus size={20} />
        Új hirdetés
      </Button>

      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:items-center justify-center">
          <div className={`rounded-t-2xl md:rounded-2xl shadow-2xl w-full md:max-w-md max-h-[90vh] overflow-y-auto ${modalBg}`}>
            <div className={`sticky top-0 flex items-center justify-between p-5 border-b rounded-t-2xl ${headerBg}`}>
              <h2 className={`text-2xl font-bold ${titleCls}`}>Új hirdetés</h2>
              <button onClick={() => setOpen(false)} className="p-1.5 hover:bg-white/5 rounded-lg">
                <X size={24} className="text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className={`text-sm font-semibold block mb-2 ${labelCls}`}>Cím <span className="text-red-500">*</span></label>
                <Input name="title" placeholder="pl. Baby sitter kerestetik" value={form.title} onChange={handleChange} required className={`rounded-lg ${inputCls}`} />
              </div>
              <div>
                <label className={`text-sm font-semibold block mb-2 ${labelCls}`}>Leírás <span className="text-red-500">*</span></label>
                <Textarea name="description" placeholder="Adjon részletes leírást..." value={form.description} onChange={handleChange} required className={`rounded-lg min-h-24 ${inputCls}`} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-sm font-semibold block mb-2 ${labelCls}`}>Ár/óra <span className="text-red-500">*</span></label>
                  <Input name="pricePerHour" type="number" placeholder="15" value={form.pricePerHour} onChange={handleChange} required className={`rounded-lg ${inputCls}`} />
                </div>
                <div>
                  <label className={`text-sm font-semibold block mb-2 ${labelCls}`}>Becsült órák</label>
                  <Input name="estimatedHours" type="number" placeholder="3" value={form.estimatedHours} onChange={handleChange} className={`rounded-lg ${inputCls}`} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-sm font-semibold block mb-2 ${labelCls}`}>Kategória ID <span className="text-red-500">*</span></label>
                  <Input name="categoryId" type="number" placeholder="1" value={form.categoryId} onChange={handleChange} required className={`rounded-lg ${inputCls}`} />
                </div>
                <div>
                  <label className={`text-sm font-semibold block mb-2 ${labelCls}`}>Típus <span className="text-red-500">*</span></label>
                  <select name="type" value={form.type} onChange={handleChange} className={selectCls}>
                    <option value="OFFER">Ajánlat</option>
                    <option value="REQUEST">Keresett</option>
                  </select>
                </div>
              </div>
              <div className={`flex gap-3 pt-4 border-t ${isDark ? "border-white/10" : "border-slate-100"}`}>
                <Button type="button" variant="outline" onClick={() => setOpen(false)} className={cancelCls}>
                  Mégse
                </Button>
                <Button type="submit" disabled={loading} className="flex-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-lg font-semibold transition-all">
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
