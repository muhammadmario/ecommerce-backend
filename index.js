import express from "express";
import db from "./config/Database.js";
import UserRoutes from "./routes/UserRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { verifyToken } from "./middleware/VerifyToken.js";

dotenv.config();
const app = express();

try {
  // await db.sync({ force: true });
  await db.authenticate();
  console.log("database connect...");
} catch (error) {
  console.log(error);
}

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(UserRoutes);
// app.use(verifyToken);
app.use(ProductRoutes);

app.listen(5000, () => console.log("server running in port 5000"));
