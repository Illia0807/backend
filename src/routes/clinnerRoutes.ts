// Import Express and required services
import express from 'express';
import prisma from '../lib/prisma';
import { generateRandomClinners, getClinnersByCleaningType } from '../services/clinnerService';

const router = express.Router();


// Generate clinners by cleaning type name
router.post('/generate', async (req, res) => {
  try {
    const typeCleaningName = "Regular Cleaning"; // Можно сделать параметром из body
    const clinners = await generateRandomClinners(typeCleaningName);
    res.json(clinners);
  } catch (error) {
    console.error('Error generating clinners:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Get clinners by hardcoded cleaning type name
router.get("/", async (req:any, res:any) => {
  try {
    const typeCleaningName = "Regular Cleaning";

    // Find cleaning type by name
    const cleaningType = await prisma.cleaningType.findUnique({
      where: { name: typeCleaningName },
    });

    if (!cleaningType) {
      return res.status(404).json({ error: "Cleaning type not found" });
    }

    const clinners = await getClinnersByCleaningType(cleaningType.id);
    res.json(clinners);
  } catch (error) {
    console.error("Error fetching clinners:", error);
    res.status(500).json({ error: "Failed to fetch clinners" });
  }
});

// GET /clinners/by-type?type=Regular%20Cleaning
// Get clinners by cleaning type name from query parameter
router.get("/by-type", async (req:any, res:any) => {
  try {
    const typeCleaningName = req.query.type as string;

    if (!typeCleaningName) {
      return res.status(400).json({ error: "Cleaning type name is required in query" });
    }

    const cleaningType = await prisma.cleaningType.findUnique({
      where: { name: typeCleaningName },
    });

    if (!cleaningType) {
      return res.status(404).json({ error: "Cleaning type not found" });
    }

    const clinners = await getClinnersByCleaningType(cleaningType.id);
    res.json(clinners);
  } catch (error) {
    console.error("Error fetching clinners by type:", error);
    res.status(500).json({ error: "Failed to fetch clinners" });
  }
});

// Export router
export default router;



// GET /clinners
// router.get('/', async (req, res) => {
//   try {
//     const clinners = await prisma.clinner.findMany({
//       include: {
//         typeCleaning: {
//           include: { cleaningType: true },
//         },
//         availableDates: true,
//       },
//     });
//     res.json(clinners);
//   } catch (error) {
//     console.error('Error fetching clinners:', error);
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// });