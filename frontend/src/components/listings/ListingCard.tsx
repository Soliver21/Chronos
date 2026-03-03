import { type Listing } from "../../types/listing.types"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Clock, DollarSign } from "lucide-react"

interface Props {
  listing: Listing
  onDelete?: (id: number) => void
}

export default function ListingCard({ listing }: Props) {
  const categoryName = typeof listing.category === 'object'
    ? (listing.category as any).name
    : listing.category || "Egyéb"

  const typeName = typeof listing.type === 'object'
    ? (listing.type as any).name
    : listing.type || "REQUEST"

  const firstName = listing.user?.name?.split(" ")[0] || "Felhasználó"
  const avatarUrl = listing.user?.avatar || undefined
  const initials = firstName.slice(0, 2).toUpperCase()

  // Badge styling based on type
  const isRequest = typeName === "REQUEST"
  const badgeColor = isRequest 
    ? "bg-blue-100 text-blue-700 border-blue-200" 
    : "bg-green-100 text-green-700 border-green-200"
  const badgeText = isRequest ? "REQUEST" : "OFFER"

  return (
    <Card className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">

      {/* KERESETT/AJÁNLAT badge - top right */}
      <div className={`absolute top-2 right-4 px-3 py-2 rounded-full text-xs font-bold border ${badgeColor}`}>
        {badgeText}
      </div>

      <div className="px-3 py-2 flex flex-col flex-grow">

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2.5 line-clamp-2 pr-16">
          {listing.title}
        </h3>

        {/* Category */}
        <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-4">
          {categoryName}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-6 flex-grow">
          {listing.description}
        </p>

        {/* Price & Est. Hours */}
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

        {/* User info + button */}
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

          <div className="space-y-2">
            <Button 
              className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm hover:shadow-md transition-all"
              onClick={() => {/* handle view details */}}
            >
              Részletek
            </Button>

            
          </div>
        </div>

      </div>
    </Card>
  )
}