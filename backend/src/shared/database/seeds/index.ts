import { PrismaClient } from '@prisma/client';

import { seedCases } from './case.seed';
import { seedUsers } from './user.seed';
import { logger } from '../../../shared/logger';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  try {
    logger.info('Starting database seeding...');

    await prisma.user.deleteMany();
    await prisma.case.deleteMany();

    await seedUsers(prisma);
    await seedCases(prisma);

    logger.info('Database seeding completed successfully');
  } catch (error) {
    logger.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  logger.error('Fatal error during seeding:', error);
  process.exit(1);
});
