import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Connected to MariaDB via Prisma!');
    const users = await prisma.users.findMany();
    console.log(' Users found:', users.length);
  } catch (err) {
    console.error(' Database connection failed:', err);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
