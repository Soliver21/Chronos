import { useState } from "react"
import { createListing } from "../../services/listing.service"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

interface Props {
  onCreated: () => void
}

export default function CreateListingButton({ onCreated }: Props) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    title: "",
    description: "",
    pricePerHour: 0,
    categoryId: "",
    type: "OFFER" as "OFFER" | "REQUEST",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    let v: any = value
    if (type === "number") {
      v = value === "" ? 0 : parseFloat(value)
    }
    setForm({ ...form, [name]: v })
  }

  const handleSubmit = async () => {
    const payload = {
      title: form.title,
      description: form.description,
      pricePerHour: form.pricePerHour,
      categoryId: parseInt(form.categoryId, 10),
      type: form.type,
    }
    await createListing(payload)
    setOpen(false)
    onCreated()
  }

  if (!open)
    return <Button onClick={() => setOpen(true)}>+ Új hirdetés</Button>

  return (
    <div className="flex flex-col gap-2 mb-6">
      <Input name="title" placeholder="Cím" onChange={handleChange} />
      <Textarea name="description" placeholder="Leírás" onChange={handleChange} />
      <Input name="pricePerHour" type="number" placeholder="Ár/óra" onChange={handleChange} />
      <Input name="categoryId" type="number" placeholder="Kategória ID" onChange={handleChange} />
      <Input name="type" placeholder="Típus (OFFER/REQUEST)" onChange={handleChange} />

      <Button onClick={handleSubmit}>Mentés</Button>
    </div>
  )
}
