import { useState } from "react"
import { type Listing } from "../../types/listing.types"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Clock, DollarSign, Loader2 } from "lucide-react"
import { createTransaction } from "../../services/transaction.service"
import { useAuth } from "../../context/AuthContext"

interface Props {
  listing: Listing
  onDelete?: (id: number) => void
  onClaimed?: () => void
}

export default function ListingCard({ listing, onClaimed }: Props) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [claimed, setClaimed] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const categoryName = typeof listing.category === 'object'
    ? (listing.category as any).name
    : listing.category || "Egyéb"

  const typeName = typeof listing.type === 'object'
    ? (listing.type as any).name
    : listing.type || "REQUEST"

  const firstName = listing.user?.name?.split(" ")[0] || "Felhasználó"
  const avatarUrl = listing.user?.avatar || undefined
  const initials = firstName.slice(0, 2).toUpperCase()

  const isRequest = typeName === "REQUEST"
  const badgeColor = isRequest
    ? "bg-blue-100 text-blue-700 border-blue-200"
    : "bg-green-100 text-green-700 border-green-200"
  const badgeText = isRequest ? "KERESETT" : "AJÁNLAT"

  const isOwn = user?.id === listing.userId

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
      const raw = err.response?.data?.message || ""
      let msg = "Hiba történt az igénylésnél."
      if (raw.includes("Insufficient credits")) {
        const required = raw.match(/Required: (\d+)/)?.[1]
        const available = raw.match(/Available: (\d+)/)?.[1]
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
    <Card className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">

      <div className={`absolute top-2 right-2 px-3 py-2 rounded-full text-xs font-bold border ${badgeColor}`}>
        {badgeText}
      </div>

      <div className="px-3 py-2 flex flex-col flex-grow">

        <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2.5 line-clamp-2 pr-20">
          {listing.title}
        </h3>

        <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-4">
          {categoryName}
        </div>

        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-6 flex-grow">
          {listing.description}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <DollarSign size={16} className="text-blue-600" />
              <span className="text-lg font-bold text-blue-900">{listing.pricePerHour}</span>
            </div>
            <div className="text-xs text-blue-700 text-center font-semibold">$/hr</div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 border border-orange-200">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock size={16} className="text-orange-600" />
              <span className="text-lg font-bold text-orange-900">{listing.estimatedHours || "–"}</span>
            </div>
            <div className="text-xs text-orange-600 text-center font-semibold">hours</div>
          </div>
        </div>

        <div className="mt-auto border-t border-slate-100 pt-4">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-10 w-10 border-2 border-slate-200 ring-2 ring-slate-100">
              <AvatarImage src={avatarUrl} alt={firstName} />
              <AvatarFallback className="bg-slate-200 text-slate-700 font-bold text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="font-semibold text-gray-800 text-sm">{listing.user?.name || firstName}</span>
          </div>

          {error ? (
            <div className="w-full px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-[11px] text-red-500 font-medium text-center animate-in fade-in slide-in-from-top-1">
              {error}
            </div>
          ) : (
          <Button
            className={`w-full rounded-lg font-semibold shadow-sm transition-all ${
              claimed
                ? "bg-green-100 text-green-700 hover:bg-green-100 cursor-default"
                : isOwn
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md"
            }`}
            onClick={handleClaim}
            disabled={isOwn || loading || claimed}
          >
            {loading
              ? <><Loader2 size={16} className="animate-spin mr-2" />Igénylés...</>
              : claimed
              ? "✓ Igényelve"
              : isOwn
              ? "Saját hirdetés"
              : "Igénylés"}
          </Button>
          )}
        </div>
      </div>
    </Card>
  )
}