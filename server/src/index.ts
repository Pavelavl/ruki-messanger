import express from "express";
require("dotenv").config();
import indexRoutes from "./routes/index";
const PORT = process.env.PORT || 5000;
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(indexRoutes);

app.listen(PORT);
console.log("Server on port", PORT);
