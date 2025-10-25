import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messagesRoutes from "./routes/messages.route.js";
// ❌ Remove this line:
// import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.NODE_ENV === "production" 
    ? process.env.CLIENT_URL 
    : "http://localhost:5173",
  credentials: true
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);

// Production build serving
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
    })
}

// Start server
app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
