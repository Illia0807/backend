// Import required libraries and modules
import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import routes and services
import clinnerRoutes from "./routes/clinnerRoutes";
import { generateRandomClinners } from "./services/clinnerService";

// Load environment variables from .env file
dotenv.config();

//Initializing configuration and middleware
const app = express();

// Attach middleware
app.use(cors());// Разрешение CORS (междоменные запросы)

// Parse JSON bodies in incoming requests
app.use(express.json());

// Generate random clinners when the server starts
// You can pass a specific typeCleaningId (e.g., "Windows Cleaning")
generateRandomClinners("Windows Cleaning")
  .then(() => {
    console.log("Clinners generated successfully");
  })
  .catch((error) => {
    console.error("Error generating clinners:", error);
  });

//Status check route
app.get("/api/health", (_req: Request, res: Response) => {
  res.send("OK! Backend start here");
});

// Mount routes related to clinners
app.use("/clinners", clinnerRoutes);

// Start the server on the port defined in .env or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
