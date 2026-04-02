import { useState } from "react"
import { type Listing } from "../../types/listing.types"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Clock, DollarSign, Loader2, X } from "lucide-react"
import { createTransaction } from "../../services/transaction.service"
import { useAuth } from "../../context/AuthContext"
import { useTheme } from "../../context/ThemeContext"
import { useToast } from "../../context/ToastContext"

interface Props {
  listing: Listing
  onDelete?: (id: number) => void
  onClaimed?: () => void
}

export default function ListingCard({ listing, onClaimed }: Props) {
  const { user } = useAuth()
  const { theme } = useTheme()
  const { showToast } = useToast()
  const isDark = theme === "dark"
  const [loading, setLoading] = useState(false)
  const [claimed, setClaimed] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const categoryName = typeof listing.category === 'object'
    ? (listing.category as any).name
    : listing.category || "Egyéb"

  const typeName = typeof listing.type === 'object'
    ? (listing.type as any).name
    : listing.type || "REQUEST"

  const firstName = listing.user?.name?.split(" ")[0] || "Felhasználó"
  const AVATAR_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001"
  const avatarUrl = listing.user?.avatar
    ? `${AVATAR_BASE}${listing.user.avatar}`
    : undefined
  const categoryImageUrl = (listing.category as any)?.imageUrl
    ? `${AVATAR_BASE}${(listing.category as any).imageUrl}`
    : undefined
  const imageUrl = listing.imageUrl
    ? `${AVATAR_BASE}${listing.imageUrl}`
    : categoryImageUrl
  const initials = firstName.slice(0, 2).toUpperCase()

  const isRequest = typeName === "REQUEST"
  const badgeColor = isRequest
    ? "bg-blue-100 text-blue-700 border-blue-200"
    : "bg-green-100 text-green-700 border-green-200"
  const badgeText = isRequest ? "KERESETT" : "AJÁNLAT"

  const isOwn = user?.id === listing.userId

  const handleClaim = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isOwn || loading || claimed) return
    setLoading(true)
    try {
      await createTransaction({
        listingId: listing.id,
        agreedHours: Math.min(Math.max(listing.estimatedHours ?? 1, 1), 6),
      })
      setClaimed(true)
      onClaimed?.()
      showToast(`"${listing.title}" sikeresen igényelve!`, "success")
    } catch (err: any) {
      const raw = err.response?.data?.message || ""
      let msg = "Hiba történt az igénylésnél."
      if (raw.includes("Insufficient credits")) {
        const required = raw.match(/Required: (\d+)/)?.[1]
        const available = raw.match(/Available: (\d+)/)?.[1]
        if (required && available) {
          msg = `Nincs elegendő egyenleged az igényléshez. Szükséges: ${required} kredit, jelenlegi egyenleged: ${available} kredit.`
        } else {
          msg = "Nincs elegendő egyenleged az igénylés teljesítéséhez."
        }
      } else if (raw.includes("own listing")) {
        msg = "Saját hirdetést nem igényelhetsz."
      } else if (raw.includes("not found")) {
        msg = "A hirdetés nem található."
      }
      showToast(msg, "error")
    } finally {
      setLoading(false)
    }
  }

  const cardBg = isDark
    ? "bg-[#0f0f14] border-white/10 hover:border-indigo-500/40"
    : "bg-white border-slate-200 hover:shadow-xl"

  const modalBg = isDark ? "bg-[#0f0f14] border-white/10" : "bg-white border-slate-200"
  const titleCls = isDark ? "text-white" : "text-gray-900"
  const categoryCls = isDark ? "text-gray-500" : "text-gray-500"
  const descCls = isDark ? "text-gray-400" : "text-gray-600"
  const dividerCls = isDark ? "border-white/10" : "border-slate-100"

  const priceBox = isDark
    ? "bg-blue-900/20 border-blue-700/30"
    : "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
  const priceVal = isDark ? "text-blue-300" : "text-blue-900"
  const priceLabel = isDark ? "text-blue-400" : "text-blue-700"
  const priceIcon = isDark ? "text-blue-400" : "text-blue-600"

  const hoursBox = isDark
    ? "bg-orange-900/20 border-orange-700/30"
    : "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200"
  const hoursVal = isDark ? "text-orange-300" : "text-orange-900"
  const hoursLabel = isDark ? "text-orange-400" : "text-orange-600"
  const hoursIcon = isDark ? "text-orange-400" : "text-orange-600"

  const avatarBorder = isDark ? "border-white/10 ring-white/5" : "border-slate-200 ring-slate-100"
  const avatarFallback = isDark ? "bg-white/10 text-gray-300" : "bg-slate-200 text-slate-700"
  const userNameCls = isDark ? "text-gray-300" : "text-gray-800"

  const claimedBtn = isDark
    ? "bg-green-900/30 text-green-400 hover:bg-green-900/30 cursor-default"
    : "bg-green-100 text-green-700 hover:bg-green-100 cursor-default"
  const ownBtn = isDark
    ? "bg-white/5 text-gray-500 cursor-not-allowed"
    : "bg-slate-100 text-slate-400 cursor-not-allowed"

  const placeholderGradient = isRequest
    ? isDark
      ? "bg-gradient-to-br from-blue-900/60 to-indigo-900/60"
      : "bg-gradient-to-br from-blue-100 to-indigo-200"
    : isDark
      ? "bg-gradient-to-br from-emerald-900/60 to-teal-900/60"
      : "bg-gradient-to-br from-emerald-100 to-teal-200"

  const imageSectionSmall = (
    <div className={`relative w-full h-32 overflow-hidden flex-shrink-0 border-b ${isDark ? "border-white/10" : "border-slate-200"}`}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={listing.title}
          className="w-full h-full object-cover opacity-75"
          onError={(e) => {
            const target = e.currentTarget
            target.parentElement!.querySelector(".img-placeholder")!.setAttribute("style", "display:flex")
            target.style.display = "none"
          }}
        />
      ) : null}
      <div
        className={`img-placeholder w-full h-full flex-col items-center justify-center gap-1 ${placeholderGradient}`}
        style={{ display: imageUrl ? "none" : "flex" }}
      >
        <span className="text-3xl opacity-60">{isRequest ? "🔍" : "🤝"}</span>
        <span className={`text-xs font-semibold uppercase tracking-wider opacity-50 ${isDark ? "text-white" : "text-gray-700"}`}>
          {categoryName}
        </span>
      </div>
      <div className={`absolute top-2 right-2 px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-sm ${badgeColor}`}>
        {badgeText}
      </div>
    </div>
  )

  const imageSectionLarge = (
    <div className={`relative w-full h-48 overflow-hidden flex-shrink-0 rounded-t-2xl border-b ${isDark ? "border-white/10" : "border-slate-200"}`}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={listing.title}
          className="w-full h-full object-cover opacity-75"
          onError={(e) => {
            const target = e.currentTarget
            target.parentElement!.querySelector(".img-placeholder")!.setAttribute("style", "display:flex")
            target.style.display = "none"
          }}
        />
      ) : null}
      <div
        className={`img-placeholder w-full h-full flex-col items-center justify-center gap-1 ${placeholderGradient}`}
        style={{ display: imageUrl ? "none" : "flex" }}
      >
        <span className="text-4xl opacity-60">{isRequest ? "🔍" : "🤝"}</span>
        <span className={`text-xs font-semibold uppercase tracking-wider opacity-50 ${isDark ? "text-white" : "text-gray-700"}`}>
          {categoryName}
        </span>
      </div>
      <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-sm ${badgeColor}`}>
        {badgeText}
      </div>
    </div>
  )

  const actionButton = (e?: React.MouseEvent) => (
    <Button
      className={`w-full rounded-lg font-semibold shadow-sm transition-all duration-300 ${claimed ? claimedBtn : isOwn ? ownBtn : "bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:shadow-md text-white"}`}
      onClick={handleClaim}
      disabled={isOwn || loading || claimed}
    >
      {loading
        ? <><Loader2 size={16} className="animate-spin mr-2" />Igénylés...</>
        : claimed ? "✓ Igényelve" : isOwn ? "Saját hirdetés" : "Igénylés"}
    </Button>
  )

  return (
    <>
      {/* Kártya */}
      <Card
        onClick={() => setExpanded(true)}
        className={`cursor-pointer relative overflow-hidden rounded-2xl border shadow-sm hover:-translate-y-1 transition-all duration-300 h-full flex flex-col !py-0 gap-0 ${cardBg}`}
      >
        {imageSectionSmall}

        <div className="px-3 py-3 flex flex-col flex-grow">
          <h3 className={`text-base font-bold leading-tight mb-1 line-clamp-2 transition-colors duration-300 ${titleCls}`}>
            {listing.title}
          </h3>
          <div className={`text-xs font-semibold uppercase tracking-wide mb-2 transition-colors duration-300 ${categoryCls}`}>
            {categoryName}
          </div>
          <p className={`text-sm leading-relaxed line-clamp-2 mb-3 flex-grow transition-colors duration-300 ${descCls}`}>
            {listing.description}
          </p>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className={`rounded-lg p-3 border transition-colors duration-300 ${priceBox}`}>
              <div className="flex items-center justify-center gap-1 mb-1">
                <DollarSign size={16} className={`transition-colors duration-300 ${priceIcon}`} />
                <span className={`text-lg font-bold transition-colors duration-300 ${priceVal}`}>{listing.pricePerHour}</span>
              </div>
              <div className={`text-xs text-center font-semibold transition-colors duration-300 ${priceLabel}`}>kr/óra</div>
            </div>
            <div className={`rounded-lg p-3 border transition-colors duration-300 ${hoursBox}`}>
              <div className="flex items-center justify-center gap-1 mb-1">
                <Clock size={16} className={`transition-colors duration-300 ${hoursIcon}`} />
                <span className={`text-lg font-bold transition-colors duration-300 ${hoursVal}`}>{listing.estimatedHours || "–"}</span>
              </div>
              <div className={`text-xs text-center font-semibold transition-colors duration-300 ${hoursLabel}`}>óra</div>
            </div>
          </div>

          <div className={`mt-auto border-t pt-3 transition-colors duration-300 ${dividerCls}`}>
            <div className="flex items-center gap-3 mb-3">
              <Avatar className={`h-10 w-10 border-2 ring-2 transition-colors duration-300 ${avatarBorder}`}>
                <AvatarImage src={avatarUrl} alt={firstName} />
                <AvatarFallback className={`font-bold text-sm transition-colors duration-300 ${avatarFallback}`}>
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className={`font-semibold text-sm transition-colors duration-300 ${userNameCls}`}>{listing.user?.name || firstName}</span>
            </div>
            {actionButton()}
          </div>
        </div>
      </Card>

      {/* Modal */}
      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setExpanded(false)}
        >
          <div
            className={`relative w-full max-w-md rounded-2xl border shadow-2xl overflow-hidden ${modalBg}`}
            onClick={(e) => e.stopPropagation()}
          >
            {imageSectionLarge}

            <button
              onClick={() => setExpanded(false)}
              className={`absolute top-3 left-3 p-1.5 rounded-full backdrop-blur-sm transition-colors ${isDark ? "bg-black/50 hover:bg-black/70 text-white" : "bg-white/70 hover:bg-white text-gray-700"}`}
            >
              <X size={18} />
            </button>

            <div className="px-5 py-4 flex flex-col gap-4">
              <div>
                <h2 className={`text-xl font-bold leading-tight mb-1 ${titleCls}`}>
                  {listing.title}
                </h2>
                <div className={`text-xs font-semibold uppercase tracking-wide ${categoryCls}`}>
                  {categoryName}
                </div>
              </div>

              <p className={`text-sm leading-relaxed ${descCls}`}>
                {listing.description}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className={`rounded-lg p-3 border ${priceBox}`}>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <DollarSign size={16} className={priceIcon} />
                    <span className={`text-lg font-bold ${priceVal}`}>{listing.pricePerHour}</span>
                  </div>
                  <div className={`text-xs text-center font-semibold ${priceLabel}`}>kr/óra</div>
                </div>
                <div className={`rounded-lg p-3 border ${hoursBox}`}>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Clock size={16} className={hoursIcon} />
                    <span className={`text-lg font-bold ${hoursVal}`}>{listing.estimatedHours || "–"}</span>
                  </div>
                  <div className={`text-xs text-center font-semibold ${hoursLabel}`}>óra</div>
                </div>
              </div>

              <div className={`border-t pt-4 ${dividerCls}`}>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className={`h-10 w-10 border-2 ring-2 ${avatarBorder}`}>
                    <AvatarImage src={avatarUrl} alt={firstName} />
                    <AvatarFallback className={`font-bold text-sm ${avatarFallback}`}>
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className={`font-semibold text-sm ${userNameCls}`}>{listing.user?.name || firstName}</span>
                </div>
                {actionButton()}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}