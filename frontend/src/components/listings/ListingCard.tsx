import { useState } from "react"
import { type Listing } from "../../types/listing.types"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Clock, DollarSign, Loader2 } from "lucide-react"
import { createTransaction } from "../../services/transaction.service"
import { useAuth } from "../../context/AuthContext"
import { useTheme } from "../../context/ThemeContext"

interface Props {
  listing: Listing
  onDelete?: (id: number) => void
  onClaimed?: () => void
}

export default function ListingCard({ listing, onClaimed }: Props) {
  const { user } = useAuth()
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [loading, setLoading] = useState(false)
  const [claimed, setClaimed] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const categoryName = typeof listing.category === "object" ? (listing.category as any).name : listing.category || "Egyéb"
  const typeName = typeof listing.type === "object" ? (listing.type as any).name : listing.type || "REQUEST"
  const firstName = listing.user?.name?.split(" ")[0] || "Felhasználó"
  const avatarUrl = listing.user?.avatar || undefined
  const initials = firstName.slice(0, 2).toUpperCase()
  const isRequest = typeName === "REQUEST"
  const isOwn = user?.id === listing.userId

  const badgeColor = isRequest ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-green-100 text-green-700 border-green-200"
  const badgeText = isRequest ? "KERESETT" : "AJÁNLAT"
  const cardBg = isDark ? "border-white/10 bg-[#0f0f14]" : "border-gray-200 bg-white"
  const titleCls = isDark ? "text-gray-100" : "text-gray-900"
  const descCls = isDark ? "text-gray-400" : "text-gray-600"
  const catCls = isDark ? "text-gray-500" : "text-gray-400"
  const dividerCls = isDark ? "border-white/5" : "border-gray-100"
  const avatarFallbackCls = isDark ? "bg-slate-700 text-slate-200" : "bg-slate-200 text-slate-700"
  const avatarBorderCls = isDark ? "border-slate-700 ring-slate-800" : "border-slate-200 ring-slate-100"
  const userNameCls = isDark ? "text-gray-200" : "text-gray-800"

  const handleClaim = async () => {
    if (isOwn || loading || claimed) return
    setLoading(true)
    try {
      await createTransaction({
        listingId: listing.id,
        agreedHours: Math.min(Math.max(listing.estimatedHours ?? 1, 1), 6),
      })
      setClaimed(true)
      onClaimed?.()
    } catch (err: any) {
      const raw = err.response?.data?.message ?? ""
      let msg = "Hiba történt az igénylésnél."
      if (raw.includes("Insufficient credits")) {
        const required = raw.match(/Required: (\d+)/)?.[1]
        const available = raw.match(/Available: (\d+)/)?.[2]
        msg = `Nincs elég kredited. Szükséges: ${required}, elérhető: ${available}.`
      } else if (raw.includes("own listing")) {
        msg = "Saját hirdetést nem igényelhetsz."
      } else if (raw.includes("not found")) {
        msg = "A hirdetés nem található."
      }
      setError(msg)
      setTimeout(() => setError(null), 2500)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className={`relative overflow-hidden rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col ${cardBg}`}>
      <div className={`absolute top-2 right-2 px-3 py-1.5 rounded-full text-xs font-bold border ${badgeColor}`}>{badgeText}</div>
      <div className="px-4 py-3 flex flex-col flex-grow">
        <h3 className={`text-lg font-bold leading-tight mb-2 line-clamp-2 pr-20 ${titleCls}`}>{listing.title}</h3>
        <div className={`text-xs font-semibold uppercase tracking-wide mb-3 ${catCls}`}>{categoryName}</div>
        <p className={`text-sm leading-relaxed line-clamp-3 mb-5 flex-grow ${descCls}`}>{listing.description}</p>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <DollarSign size={15} className="text-blue-600" />
              <span className="text-lg font-bold text-blue-900">{listing.pricePerHour}</span>
            </div>
            <div className="text-xs text-blue-700 text-center font-semibold">óra/h</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 border border-orange-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock size={15} className="text-orange-600" />
              <span className="text-lg font-bold text-orange-900">{listing.estimatedHours || "–"}</span>
            </div>
            <div className="text-xs text-orange-600 text-center font-semibold">becsült óra</div>
          </div>
        </div>

        <div className={`mt-auto border-t pt-4 ${dividerCls}`}>
          <div className="flex items-center gap-3 mb-4">
            <Avatar className={`h-9 w-9 border-2 ring-2 ${avatarBorderCls}`}>
              <AvatarImage src={avatarUrl} alt={firstName} />
              <AvatarFallback className={`font-bold text-sm ${avatarFallbackCls}`}>{initials}</AvatarFallback>
            </Avatar>
            <span className={`font-semibold text-sm ${userNameCls}`}>{listing.user?.name || firstName}</span>
          </div>

          {/* Hibaüzenet */}
          {error && (
            <div className="w-full px-3 py-2 rounded-lg bg-red-500/10 border border-red-200 text-[11px] text-red-500 font-medium text-center animate-in fade-in slide-in-from-top-1 mb-2">
              {error}
            </div>
          )}

          <Button
            className={`w-full rounded-lg font-semibold shadow-sm transition-all ${
              claimed ? "bg-green-100 text-green-700 hover:bg-green-100 cursor-default"
              : isOwn ? (isDark ? "bg-white/5 text-gray-500 cursor-not-allowed" : "bg-slate-100 text-slate-400 cursor-not-allowed")
              : "bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:shadow-md text-white"
            }`}
            onClick={handleClaim}
            disabled={isOwn || loading || claimed}
          >
            {loading ? <><Loader2 size={16} className="animate-spin mr-2" />Igénylés...</>
              : claimed ? "✓ Igényelve"
              : isOwn ? "Saját hirdetés"
              : "Igénylés"}
          </Button>
        </div>
      </div>
    </Card>
  )
}