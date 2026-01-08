// App.tsx
import { useEffect, useState } from "react";
import CoffeeList from "./components/CoffeeList";
import CoffeeForm from "./components/CoffeeForm";
import "./index.css";

// interface Coffee นี้ถูกต้องแล้ว: ใช้ image?: string | null | undefined;
export interface Coffee {
  id: number;
  name: string;
  price: number;
  image?: string | null | undefined;
}

function App() {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [editingCoffee, setEditingCoffee] = useState<Coffee | null>(null);

  // ดึงข้อมูลกาแฟ
  const fetchCoffees = async () => {
    const res = await fetch("http://localhost:4000/coffee");
    const data = await res.json();
    setCoffees(data);
  };

  useEffect(() => {
    fetchCoffees();
  }, []);

  // *ไม่ต้องมี addCoffee/updateCoffee/deleteCoffee ที่นี่อีกแล้ว
  // *เพราะ Logic เหล่านี้จะถูกย้ายไปอยู่ใน Component ลูก หรือถูกเรียกผ่าน onSuccess

  const handleCoffeeFormSuccess = () => {
    setEditingCoffee(null); // เคลียร์ฟอร์ม
    fetchCoffees();        // ดึงข้อมูลใหม่
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Coffee Corner</h1>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          {/* 🚨 แก้ไขส่วน CoffeeForm: ให้ส่ง coffee (ค่าปัจจุบันที่กำลังแก้ไข) และ onSuccess */}
          <CoffeeForm
            coffee={editingCoffee}
            onSuccess={handleCoffeeFormSuccess}
          />
        </div>
        <div className="md:col-span-2">
          {/* 🚨 แก้ไขส่วน CoffeeList: ให้ส่งแค่ coffees และ setEditingCoffee */}
          <CoffeeList
            coffees={coffees}
            setEditingCoffee={setEditingCoffee}
            onSuccess={handleCoffeeFormSuccess} // ส่ง onSuccess เพื่อให้มันเรียกเมื่อลบสำเร็จ (ถ้าใช้)
          />
        </div>
      </div>
    </div>
  );
}

export default App;