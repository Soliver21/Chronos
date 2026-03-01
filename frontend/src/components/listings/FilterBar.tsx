import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import type { ListingFilter } from "../../types/listing.types"

interface Props {
  onFilter: (filters: ListingFilter) => void
}

export default function FilterBar({ onFilter }: Props) {
  const [filters, setFilters] = useState<ListingFilter>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    let v: any = value
    if (type === "number") {
      v = value === "" ? undefined : parseFloat(value)
    }
    setFilters({
      ...filters,
      [name]: v,
    })
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Input name="search" placeholder="Keresés..." onChange={handleChange} />
      <Input name="category" placeholder="Kategória" onChange={handleChange} />
      <Input name="type" placeholder="Típus" onChange={handleChange} />
      <Input name="minPrice" placeholder="Min ár" type="number" onChange={handleChange} />
      <Input name="maxPrice" placeholder="Max ár" type="number" onChange={handleChange} />

      <Button onClick={() => onFilter(filters)}>
        Szűrés
      </Button>
    </div>
  )
}
