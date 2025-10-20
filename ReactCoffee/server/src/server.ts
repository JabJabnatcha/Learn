import express from "express";
import cors from "cors";
import coffeeRoutes from "./routes/coffeeRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/coffees", coffeeRoutes);

app.listen(4000, () => console.log("Server running on port 4000"));
