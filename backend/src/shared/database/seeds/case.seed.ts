import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

import { logger } from '../../../shared/logger';

export async function seedCases(prisma: PrismaClient): Promise<void> {
  try {
    logger.info('🌱 Starting case seeding...');

    const cases = Array.from({ length: 100 }, () => ({
      name: faker.company.catchPhrase(),
      description: faker.lorem.paragraphs(2),
      comments: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () =>
        faker.lorem.sentence(),
      ),
    }));

    for (const caseData of cases) {
      await prisma.case.create({
        data: caseData,
      });
    }

    logger.info('✅ Case seeding completed successfully!');
  } catch (error) {
    logger.error('❌ Error seeding cases:', error);
    throw error;
  }
}

export default seedCases;
