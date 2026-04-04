import { Star } from "lucide-react";

// Csillag értékelő – kattintásra beállítja az értéket
const StarPicker = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={20}
        onClick={() => onChange(star)}
        className={`cursor-pointer transition-colors ${
          star <= value ? "text-yellow-400 fill-yellow-400" : "text-gray-500"
        } hover:text-yellow-300 hover:fill-yellow-300`}
      />
    ))}
  </div>
);

export default StarPicker;
