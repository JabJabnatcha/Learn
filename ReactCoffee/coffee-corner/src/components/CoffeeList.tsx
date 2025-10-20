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
    <div>
      <h2>เมนูกาแฟ</h2>

      {/* ฟอร์มเพิ่ม/แก้ไข */}
      <CoffeeForm coffee={editingCoffee || undefined} onSuccess={handleFormSuccess} />

      <ul>
        {coffees.map((c) => (
          <li key={c.id}>
            {c.name} - {c.price} บาท
            <button onClick={() => handleEdit(c)}>แก้ไข</button>
            <button onClick={() => handleDelete(c.id)}>ลบ</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
