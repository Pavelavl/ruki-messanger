import express, { Application } from "express";
import indexRoutes from "./routes/index";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(indexRoutes);

app.listen(PORT, () => console.log("Server on port", PORT));