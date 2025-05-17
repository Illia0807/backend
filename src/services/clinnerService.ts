// Import Clinner model from Prisma
import { Clinner } from "@prisma/client";

// Import faker library for generating fake data
import { faker } from "@faker-js/faker";

// Import Prisma DB client instance
import prisma from "../config/db";

// Import the CleaningType type
import { CleaningType } from "../utils/types";

// Generate random clinners
export const generateRandomClinners = async (cleaningTypeName: CleaningType) => {
   // Find cleaning type by name
  let cleaningType = await prisma.cleaningType.findUnique({
    where: { name: cleaningTypeName },
  });

  // If not found, create a new cleaning type
  if (!cleaningType) {
    cleaningType = await prisma.cleaningType.create({
      data: { name: cleaningTypeName },
    });
    console.log(`Created new cleaning type with name "${cleaningType.name}"`);
  }

  const clinners = [];

   // Generate 40 clinners
  for (let i = 0; i < 40; i++) {
    const name = `${faker.person.firstName()} ${faker.person.lastName()}`;
    const img = faker.image.avatar();
    const rate = faker.number.int({ min: 1, max: 5 }).toString();
    const description = faker.lorem.sentence();
    const price = faker.number.int({ min: 100, max: 1000 }).toString();

    // Create clinner in the database
    const createdClinner = await prisma.clinner.create({
      data: {
        name,
        img,
        rate,
        description,
        price,
      },
    });

    // Link clinner to the cleaning type
    await prisma.clinnerCleaningType.create({
      data: {
        clinnerId: createdClinner.id,
        cleaningTypeId: cleaningType.id,
      },
    });

    // Generate 3 available dates
    const availableDates: string[] = [];
    for (let j = 0; j < 3; j++) {
      const date = faker.date.soon({ days: 10 }).toISOString().split("T")[0];
      availableDates.push(date);

      await prisma.availableDate.create({
        data: {
          clinnerId: createdClinner.id,
          date,
        },
      });
    }

    // Add created clinner to the array
    clinners.push({
      id: createdClinner.id,
      name,
      img,
      rate,
      description,
      price,
      typeCleaning: [cleaningType.name],
      dateAviable: availableDates,
    });
  }

  return clinners;
};

// Get clinners by cleaning type ID
export const getClinnersByCleaningType = async (cleaningTypeId: CleaningType) => {

  // Find clinners that have the specified cleaning type
  const clinners = await prisma.clinner.findMany({
    where: {
      typeCleaning: {
        some: {
          cleaningTypeId,
        },
      },
    },
    include: {
      typeCleaning: {
        include: {
          cleaningType: true,
        },
      },
      availableDates: true,
    },
  });
  
   // Format the result for easier usage
  return clinners.map((clinner: any) => ({
    id: clinner.id,
    name: clinner.name,
    img: clinner.img,
    rate: clinner.rate,
    description: clinner.description,
    price: clinner.price,
    typeCleaning: clinner.typeCleaning.map((rel:any) => rel.cleaningType.name),
    dateAviable: clinner.availableDates.map((date:any) => date.date),
  }));
};
