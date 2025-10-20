//C:\Users\Laptop-JAB\Desktop\Learn\ReactCoffee\server\src\controllers\coffeeController.ts
import type { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";

// ดึงเมนูกาแฟทั้งหมด
export const getAllCoffees = async (req: Request, res: Response) => {
  try {
    const coffees = await prisma.coffee.findMany();
    res.json(coffees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "ไม่สามารถดึงข้อมูลกาแฟได้" });
  }
};

// เพิ่มกาแฟใหม่
export const createCoffee = async (req: Request, res: Response) => {
  try {
    const { name, price, image } = req.body;
    const newCoffee = await prisma.coffee.create({
      data: { name, price, image },
    });
    res.status(201).json(newCoffee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "เพิ่มกาแฟไม่สำเร็จ" });
  }
};

// แก้ไขกาแฟ
export const updateCoffee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, image } = req.body;
    const updatedCoffee = await prisma.coffee.update({
      where: { id: Number(id) },
      data: { name, price, image },
    });
    res.json(updatedCoffee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "แก้ไขกาแฟไม่สำเร็จ" });
  }
};

// ลบกาแฟ
export const deleteCoffee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.coffee.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "ลบกาแฟสำเร็จ" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "ลบกาแฟไม่สำเร็จ" });
  }
};
