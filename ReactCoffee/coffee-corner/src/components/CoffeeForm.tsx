// CoffeeForm.tsx
import { useState } from "react";
import { createCoffee, updateCoffee } from "../api/coffeeApi";
import type { Coffee } from "../App"; // 🚨 ถูกต้องแล้ว: ใช้ import type

interface CoffeeFormProps {
  // 🚨 แก้ไข: ให้ใช้ Type Coffee ที่ import มา
  coffee: Coffee | null | undefined; 
  onSuccess: () => void;
}

export default function CoffeeForm({ coffee, onSuccess }: CoffeeFormProps) {
  // 🚨 แก้ไข: ใช้ ?? "" แทน || "" เพื่อจัดการกับ null/undefined ได้ดีขึ้น
  const [name, setName] = useState(coffee?.name ?? "");
  const [price, setPrice] = useState(coffee?.price ?? 0);
  const [image, setImage] = useState(coffee?.image ?? "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (coffee) {
      // ถ้าแก้ไข
      // 🚨 ส่งข้อมูลที่ไม่มี id กลับไปให้ updateCoffee
      await updateCoffee(coffee.id, { name, price, image }); 
    } else {
      // ถ้าเพิ่มใหม่
      await createCoffee({ name, price, image });
    }
    onSuccess(); // รีเฟรช list (และเคลียร์ฟอร์มใน App.tsx)
    setName("");
    setPrice(0);
    setImage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... โค้ด Form ที่เหลือ ... */}
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