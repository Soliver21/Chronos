import { useState, useEffect, useRef } from "react"
import { createListing } from "../../services/listing.service"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { X, Plus, ImagePlus, Loader2 } from "lucide-react"
import { api } from "../../services/api"
import { useTheme } from "../../context/ThemeContext"
import { useToast } from "../../context/ToastContext"

interface Category {
  id: number
  name: string
  slug: string
}

interface Props {
  onCreated: () => void
}

export default function CreateListingButton({ onCreated }: Props) {
  const { theme } = useTheme()
  const { showToast } = useToast()
  const isDark = theme === "dark"
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [form, setForm] = useState({
    title: "",
    description: "",
    pricePerHour: "",
    estimatedHours: "",
    categoryId: "",
    type: "OFFER" as "OFFER" | "REQUEST",
  })

  useEffect(() => {
    api.get("/categories").then(res => setCategories(res.data)).catch(console.error)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImagePreview(URL.createObjectURL(file))
    setImageUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setImageUrl(res.data.url)
    } catch {
      showToast("Hiba a kép feltöltésekor.", "error")
      setImagePreview(null)
      setImageUrl(null)
    } finally {
      setImageUploading(false)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    setImageUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
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
        imageUrl: imageUrl ?? undefined,
      })
      setForm({ title: "", description: "", pricePerHour: "", estimatedHours: "", categoryId: "", type: "OFFER" })
      setImagePreview(null)
      setImageUrl(null)
      setOpen(false)
      onCreated()
      showToast("Hirdetés sikeresen létrehozva!", "success")
    } catch (error: any) {
      console.error("Error creating listing:", error)
      const rawMessage = error?.response?.data?.message
      const errorTranslations: Record<string, string> = {
        "pricePerHour must not be greater than 10": "Az óradíj maximum 10 időkredit lehet.",
        "pricePerHour must not be less than 1": "Az óradíj nem lehet kevesebb mint 1.",
        "estimatedHours must not be greater than 6": "A becsült órák száma legfeljebb 6 lehet.",
        "pricePerHour must not be less than 0": "Az óradíj nem lehet kevesebb mint 0.",
        "estimatedHours must not be less than 1": "A becsült órák száma legalább 1 legyen.",
        "title should not be empty": "A cím megadása kötelező.",
        "description should not be empty": "A leírás megadása kötelező.",
        "categoryId must be a number": "Kategória kiválasztása kötelező.",
      }
      if (Array.isArray(rawMessage) && rawMessage.length > 0) {
        rawMessage.forEach((m: string) => {
          showToast(errorTranslations[m] ?? "Hiba történt a hirdetés létrehozásakor.", "error")
        })
      } else if (typeof rawMessage === "string") {
        showToast(errorTranslations[rawMessage] ?? "Hiba történt a hirdetés létrehozásakor.", "error")
      } else {
        showToast("Hiba történt a hirdetés létrehozásakor.", "error")
      }
    } finally {
      setLoading(false)
    }
  }

  const modalBg = isDark ? "bg-[#0f0f14]" : "bg-white"
  const headerBorder = isDark ? "border-white/10" : "border-slate-200"
  const titleCls = isDark ? "text-white" : "text-slate-900"
  const labelCls = isDark ? "text-gray-400" : "text-slate-700"
  const inputCls = isDark ? "bg-[#1a1a1f] border-white/10 text-white placeholder:text-gray-600" : "border-slate-300 text-black bg-white"
  const selectCls = isDark
    ? "w-full px-3 py-2 rounded-lg border border-white/10 bg-[#1a1a1f] text-white text-sm focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
    : "w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 text-black bg-white transition-colors duration-300"
  const footerBorder = isDark ? "border-white/10" : "border-slate-100"
  const cancelBtn = isDark
    ? "bg-white/5 hover:bg-white/10 text-gray-300 border-white/10"
    : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
  const closeBtn = isDark ? "hover:bg-white/10 text-gray-400" : "hover:bg-slate-100 text-slate-600"

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 rounded-lg px-6 py-2.5 font-semibold flex items-center gap-2 transition-all duration-300"
      >
        <Plus size={20} />
        Új hirdetés
      </Button>

      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-4">
          <div className={`rounded-t-2xl md:rounded-2xl shadow-2xl w-full md:max-w-md max-h-[90vh] overflow-y-auto transition-colors duration-300 ${modalBg}`}>

            {/* Header */}
            <div className={`sticky top-0 flex items-center justify-between p-5 border-b rounded-t-2xl transition-colors duration-300 ${modalBg} ${headerBorder}`}>
              <h2 className={`text-2xl font-bold transition-colors duration-300 ${titleCls}`}>Új hirdetés</h2>
              <button
                onClick={() => { setOpen(false); removeImage() }}
                className={`p-1.5 rounded-lg transition-colors duration-300 ${closeBtn}`}
              >
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">

              <div>
                <label className={`text-sm font-semibold block mb-2 transition-colors duration-300 ${labelCls}`}>
                  Cím <span className="text-red-500">*</span>
                </label>
                <Input
                  name="title"
                  placeholder="pl. Baby sitter kerestetik"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className={`rounded-lg transition-colors duration-300 ${inputCls}`}
                />
              </div>

              <div>
                <label className={`text-sm font-semibold block mb-2 transition-colors duration-300 ${labelCls}`}>
                  Leírás <span className="text-red-500">*</span>
                </label>
                <Textarea
                  name="description"
                  placeholder="Adjon részletes leírást..."
                  value={form.description}
                  onChange={handleChange}
                  required
                  className={`rounded-lg min-h-24 transition-colors duration-300 ${inputCls}`}
                />
              </div>

              {/* Kép feltöltés */}
              <div>
                <label className={`text-sm font-semibold block mb-2 transition-colors duration-300 ${labelCls}`}>
                  Kép <span className={`font-normal ${isDark ? "text-gray-500" : "text-gray-400"}`}>(opcionális)</span>
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {imagePreview ? (
                  <div className="relative rounded-xl overflow-hidden h-36">
                    <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                    {imageUploading && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Loader2 size={24} className="animate-spin text-white" />
                      </div>
                    )}
                    {!imageUploading && (
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full h-36 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors duration-300 ${isDark
                        ? "border-white/10 hover:border-indigo-500/50 text-gray-500 hover:text-indigo-400"
                        : "border-slate-200 hover:border-indigo-400 text-slate-400 hover:text-indigo-500"
                      }`}
                  >
                    <ImagePlus size={28} />
                    <span className="text-sm font-medium">Kép hozzáadása</span>
                    <span className="text-xs opacity-60">Max 3 MB, JPG/PNG/WEBP</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-sm font-semibold block mb-2 transition-colors duration-300 ${labelCls}`}>
                    Ár/óra <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="pricePerHour"
                    type="number"
                    placeholder="15"
                    value={form.pricePerHour}
                    onChange={handleChange}
                    required
                    className={`rounded-lg transition-colors duration-300 ${inputCls}`}
                  />
                </div>
                <div>
                  <label className={`text-sm font-semibold block mb-2 transition-colors duration-300 ${labelCls}`}>
                    Becsült órák <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="estimatedHours"
                    type="number"
                    placeholder="3"
                    required
                    value={form.estimatedHours}
                    onChange={handleChange}
                    className={`rounded-lg transition-colors duration-300 ${inputCls}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-sm font-semibold block mb-2 transition-colors duration-300 ${labelCls}`}>
                    Kategória <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="categoryId"
                    value={form.categoryId}
                    onChange={handleChange}
                    required
                    className={selectCls}
                  >
                    <option value="">Válassz kategóriát...</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`text-sm font-semibold block mb-2 transition-colors duration-300 ${labelCls}`}>
                    Típus <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className={selectCls}
                  >
                    <option value="OFFER">Ajánlat</option>
                    <option value="REQUEST">Keresett</option>
                  </select>
                </div>
              </div>

              <div className={`flex gap-3 pt-4 border-t transition-colors duration-300 ${footerBorder}`}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => { setOpen(false); removeImage() }}
                  className={`flex-1 rounded-lg font-semibold transition-colors duration-300 ${cancelBtn}`}
                >
                  Mégse
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-lg font-semibold transition-all duration-300"
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