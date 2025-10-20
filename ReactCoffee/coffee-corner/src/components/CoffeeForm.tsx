import { useState, useEffect } from "react";
import { createCoffee, updateCoffee } from "../api/coffeeApi";

interface CoffeeFormProps {
  coffee?: { id: number; name: string; price: number; image?: string };
  onSuccess: () => void;
}

export default function CoffeeForm({ coffee, onSuccess }: CoffeeFormProps) {
  const [name, setName] = useState(coffee?.name || "");
  const [price, setPrice] = useState(coffee?.price || 0);
  const [image, setImage] = useState(coffee?.image || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (coffee) {
      // ถ้าแก้ไข
      await updateCoffee(coffee.id, { name, price, image });
    } else {
      // ถ้าเพิ่มใหม่
      await createCoffee({ name, price, image });
    }
    onSuccess(); // รีเฟรช list
    setName("");
    setPrice(0);
    setImage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="ชื่อกาแฟ"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="ราคา"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        required
      />
      <input
        type="text"
        placeholder="URL รูปภาพ"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button type="submit">{coffee ? "แก้ไข" : "เพิ่ม"}</button>
    </form>
  );
}
