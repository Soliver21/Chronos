import { useEffect, useState } from "react"
import type { Listing, ListingFilter } from "../types/listing.types"
import { getListings, deleteListing } from "../services/listing.service"
import ListingCard from "../components/listings/ListingCard"
import FilterBar from "../components/listings/FilterBar"
import CreateListingButton from "../components/listings/CreateListingButton"
import Dashbar from "../components/dashboard/Dashbar"

export default function Listings() {
  const [listings, setListings] = useState<Listing[]>([])

  const loadListings = async (filters: ListingFilter = {}) => {
    const data = await getListings(filters)
    setListings(data)
  }

  useEffect(() => {
    loadListings()
  }, [])

  const handleDelete = async (id: number) => {
    await deleteListing(id)
    loadListings()
  }

  return (
    <main>
    <Dashbar />
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Hirdetések</h1>

      <CreateListingButton onCreated={() => loadListings()} />
      <FilterBar onFilter={(filters) => loadListings(filters)} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
    </main>
  )
}

