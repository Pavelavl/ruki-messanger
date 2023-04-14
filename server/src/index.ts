import express from "express";
import { createRoutes } from "./core/routes";
import dotenv from "dotenv";
import { createServer } from "http";
import { createSocket } from "./core/socket";

dotenv.config();
const app = express();
const http = createServer(app);
const io = createSocket(http);
const PORT = process.env.PORT || 5000;

createRoutes(app, io);

http.listen(PORT, () => console.log("Server on port", PORT));
