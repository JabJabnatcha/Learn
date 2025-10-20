// components/CoffeeCard.tsx
import type{ Coffee } from "../App";

interface CoffeeCardProps {
  coffee: Coffee;
  setEditingCoffee: (coffee: Coffee) => void;
  deleteCoffee: (id: number) => void;
}

export default function CoffeeCard({ coffee, setEditingCoffee, deleteCoffee }: CoffeeCardProps) {
  return (
    <div className="bg-white p-4 rounded shadow flex flex-col">
      <img src={coffee.image || "https://via.placeholder.com/150"} alt={coffee.name} className="mb-2 rounded" />
      <h3 className="font-bold">{coffee.name}</h3>
      <p className="text-gray-600 mb-2">${coffee.price}</p>
      <div className="mt-auto flex gap-2">
        <button onClick={() => setEditingCoffee(coffee)} className="flex-1 bg-blue-500 text-white p-1 rounded hover:bg-blue-600">Edit</button>
        <button onClick={() => deleteCoffee(coffee.id)} className="flex-1 bg-red-500 text-white p-1 rounded hover:bg-red-600">Delete</button>
      </div>
    </div>
  );
}
