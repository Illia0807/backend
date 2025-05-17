import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Подключение к БД успешно!');
    
    // Пример запроса (зависит от вашей схемы)
    const clinners = await prisma.clinner.findMany();
    console.log('Clinners:', clinners);
  } catch (error) {
    console.error('❌ Ошибка подключения к БД:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();