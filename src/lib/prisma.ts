import { PrismaClient } from '@prisma/client';

// Create a single instance of the Prisma client
const prisma = new PrismaClient();

export default prisma;