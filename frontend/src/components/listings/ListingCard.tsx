import {type Listing } from "../../types/listing.types"
import { Card } from "../ui/card"
import { Button } from "../ui/button"


interface Props {
  listing: Listing
  onDelete?: (id: number) => void
}

export default function ListingCard({ listing, onDelete }: Props) {
  return (
    <Card className="p-4 flex flex-col gap-2">
      <h2 className="text-xl font-bold">{listing.title}</h2>
      <p className="text-gray-600">{listing.description}</p>
      <p className="font-semibold">{listing.pricePerHour} Ft/óra</p>
      <div className="text-sm text-gray-500">
  {typeof listing.category === 'object' ? (listing.category as any).name : listing.category} • {typeof listing.type === 'object' ? (listing.type as any).name : listing.type}
</div>

      {onDelete && (
        <Button
          variant="destructive"
          onClick={() => onDelete(listing.id)}
        >
          Törlés
        </Button>
      )}
    </Card>
  )
}
