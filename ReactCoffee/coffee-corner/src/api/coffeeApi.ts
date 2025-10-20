// src/api/coffeeApi.ts
const BASE_URL = "http://localhost:4000/api/coffees";

export const getCoffees = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const createCoffee = async (coffee: { name: string; price: number; image?: string }) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(coffee),
  });
  return res.json();
};

export const updateCoffee = async (id: number, coffee: { name: string; price: number; image?: string }) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(coffee),
  });
  return res.json();
};

export const deleteCoffee = async (id: number) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return res.json();
};
