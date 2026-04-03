import { useEffect, useState } from "react"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"
import type { Listing, ListingFilter } from "../types/listing.types"
import { getListings } from "../services/listing.service"
import { getMyTransactions } from "../services/transaction.service"
import ListingCard from "../components/listings/ListingCard"
import FilterBar from "../components/listings/FilterBar"
import CreateListingButton from "../components/listings/CreateListingButton"
import Dashbar from "../components/dashboard/Dashbar"

export default function Listings() {
  const { user } = useAuth()
  const [allListings, setAllListings] = useState<Listing[]>([])
  const [listings, setListings] = useState<Listing[]>([])
  const [claimedListingIds, setClaimedListingIds] = useState<Set<number>>(new Set())
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const pageBg = isDark ? "bg-[#0a0a0a]" : "bg-white"
  const headingCls = isDark ? "text-white" : "text-gray-900"
  const emptyText = isDark ? "text-gray-400" : "text-gray-500"

  const loadListings = async () => {
    // A backend már kiszűri a PENDING hirdetéseket
    const data = await getListings()
    setAllListings(data)
    setListings(data)
  }

  const loadClaimedIds = async () => {
    try {
      const txs = await getMyTransactions()
      // Azok a hirdetések amiket én igényeltem (PENDING) – disabled gombhoz
      const claimed = new Set(
        txs
          .filter(tx => tx.status === "PENDING" && tx.client?.id === user?.id)
          .map(tx => tx.listing?.id)
          .filter((id): id is number => id !== undefined && id !== null)
      )
      setClaimedListingIds(claimed)
    } catch {
      // nem blokkolja az oldalt
    }
  }

  const applyFilters = (filters: ListingFilter) => {
    let filtered = [...allListings]
    if (filters.search) {
      const q = filters.search.toLowerCase()
      filtered = filtered.filter(l =>
        l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q)
      )
    }
    if (filters.type) filtered = filtered.filter(l => l.type === filters.type)
    if (filters.category) {
      const cat = String(filters.category).toLowerCase()
      filtered = filtered.filter(l =>
        typeof l.category === "object"
          ? l.category.name.toLowerCase().includes(cat)
          : String(l.category).toLowerCase().includes(cat)
      )
    }
    if (filters.minPrice !== undefined) filtered = filtered.filter(l => l.pricePerHour >= filters.minPrice!)
    if (filters.maxPrice !== undefined) filtered = filtered.filter(l => l.pricePerHour <= filters.maxPrice!)
    setListings(filtered)
  }

  useEffect(() => {
    loadListings()
    loadClaimedIds()
  }, [])

  return (
    <main className={`min-h-screen transition-colors duration-300 ${pageBg}`}>
      <Dashbar />
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className={`text-2xl sm:text-3xl font-bold ${headingCls}`}>Hirdetések</h1>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="md:hidden">
              <FilterBar onFilter={applyFilters} mobileOnly />
            </div>
            <CreateListingButton onCreated={() => loadListings()} />
          </div>
        </div>
        <div className="flex gap-6 items-start">
          <aside className="hidden md:block w-64 lg:w-72 flex-shrink-0 sticky top-20">
            <FilterBar onFilter={applyFilters} />
          </aside>
          <div className="flex-1 min-w-0">
            {listings.length === 0 ? (
              <div className={`text-center py-20 ${emptyText}`}>
                <div className="text-4xl mb-3">📭</div>
                <p className="font-medium">Nem találhatók hirdetések.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {listings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    initialClaimed={claimedListingIds.has(listing.id)}
                    onClaimed={(id) => {
                      setClaimedListingIds(prev => new Set(prev).add(id))
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
