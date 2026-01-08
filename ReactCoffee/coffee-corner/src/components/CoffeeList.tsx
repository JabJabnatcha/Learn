// CoffeeList.tsx
import type{ Dispatch, SetStateAction } from "react";
import { deleteCoffee } from "../api/coffeeApi"; // 🚨 ลบ getCoffees ออกไป เพราะ App เป็นคน fetch
import type { Coffee } from "../App"; // 🚨 ถูกต้องแล้ว: ใช้ import type

// 🚨 กำหนด Interface ให้ตรงกับ Props ที่ App.tsx ส่งมาให้
interface CoffeeListProps {
  coffees: Coffee[];
  setEditingCoffee: Dispatch<SetStateAction<Coffee | null>>;
  onSuccess: () => void; // ฟังก์ชันนี้ใช้เพื่อรีเฟรชข้อมูลหลังจากลบสำเร็จ
}

// 🚨 รับ Props ที่ส่งมาแทนการใช้ State/Logic ของตัวเอง
export default function CoffeeList({ 
  coffees, 
  setEditingCoffee, 
  onSuccess 
}: CoffeeListProps) {

  // 🚨 ลบ State/Logic ที่ซ้ำซ้อนออกทั้งหมด (เช่น useState, fetchCoffees, handleFormSuccess)

  const handleDelete = async (id: number) => {
    await deleteCoffee(id);
    onSuccess(); // 🚨 เรียก onSuccess เพื่อบอก App.tsx ให้รีเฟรช
  };

  const handleEdit = (coffee: Coffee) => {
    setEditingCoffee(coffee); // 🚨 ใช้ Prop ที่ส่งมา
  };

  return (
    <div className="coffee-grid">
      {coffees.map(c => (
        <div key={c.id} className="coffee-card">
          <img src={c.image || ''} alt={c.name} /> 
          <h3>{c.name}</h3>
          <p>{c.price} บาท</p>
          {/* 🚨 เชื่อมต่อฟังก์ชันเข้ากับปุ่ม */}
          <button onClick={() => handleEdit(c)}>แก้ไข</button>
          <button onClick={() => handleDelete(c.id)}>ลบ</button>
        </div>
      ))}
    </div>
  );
}