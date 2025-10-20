import { useEffect, useState } from "react";
import { getCoffees, deleteCoffee } from "../api/coffeeApi";
import CoffeeForm from "./CoffeeForm";

interface Coffee {
  id: number;
  name: string;
  price: number;
  image?: string;
}

export default function CoffeeList() {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [editingCoffee, setEditingCoffee] = useState<Coffee | null>(null);

  const fetchCoffees = async () => {
    const data = await getCoffees();
    setCoffees(data);
  };

  const handleDelete = async (id: number) => {
    await deleteCoffee(id);
    fetchCoffees();
  };

  const handleEdit = (coffee: Coffee) => {
    setEditingCoffee(coffee);
  };

  const handleFormSuccess = () => {
    setEditingCoffee(null);
    fetchCoffees();
  };

  useEffect(() => {
    fetchCoffees();
  }, []);

  return (
    // CoffeeList.tsx
<div className="coffee-grid">
  {coffees.map(c => (
    <div key={c.id} className="coffee-card">
      <img src={c.image} alt={c.name} />
      <h3>{c.name}</h3>
      <p>{c.price} บาท</p>
      <button>แก้ไข</button>
      <button>ลบ</button>
    </div>
  ))}
</div>

  );
}
