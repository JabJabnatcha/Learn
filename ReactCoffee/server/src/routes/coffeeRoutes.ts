import { Router } from "express";
import {
  getAllCoffees,
  createCoffee,
  updateCoffee,
  deleteCoffee,
} from "../controllers/coffeeController";

const router = Router();

// GET /api/coffees → ดึงเมนูกาแฟทั้งหมด
router.get("/", getAllCoffees);

// POST /api/coffees → เพิ่มกาแฟใหม่
router.post("/", createCoffee);

// PUT /api/coffees/:id → แก้ไขกาแฟ
router.put("/:id", updateCoffee);

// DELETE /api/coffees/:id → ลบกาแฟ
router.delete("/:id", deleteCoffee);

export default router;
