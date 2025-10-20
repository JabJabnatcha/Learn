// App.tsx
import { useEffect, useState } from "react";
import CoffeeList from "./components/CoffeeList";
import CoffeeForm from "./components/CoffeeForm";

export interface Coffee {
  id: number;
  name: string;
  price: number;
  image: string | null;
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

  // เพิ่มกาแฟ
  const addCoffee = async (coffee: Omit<Coffee, "id">) => {
    const res = await fetch("http://localhost:4000/coffee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(coffee),
    });
    const newCoffee = await res.json();
    setCoffees([...coffees, newCoffee]);
  };

  // แก้ไขกาแฟ
  const updateCoffee = async (coffee: Coffee) => {
    const res = await fetch(`http://localhost:4000/coffee/${coffee.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(coffee),
    });
    const updatedCoffee = await res.json();
    setCoffees(coffees.map(c => (c.id === coffee.id ? updatedCoffee : c)));
    setEditingCoffee(null);
  };

  // ลบกาแฟ
  const deleteCoffee = async (id: number) => {
    await fetch(`http://localhost:4000/coffee/${id}`, { method: "DELETE" });
    setCoffees(coffees.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Coffee Corner</h1>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <CoffeeForm
            addCoffee={addCoffee}
            editingCoffee={editingCoffee}
            updateCoffee={updateCoffee}
          />
        </div>
        <div className="md:col-span-2">
          <CoffeeList
            coffees={coffees}
            setEditingCoffee={setEditingCoffee}
            deleteCoffee={deleteCoffee}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
