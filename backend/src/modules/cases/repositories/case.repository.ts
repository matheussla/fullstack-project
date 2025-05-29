import { Case } from '@prisma/client';

import { prisma } from '../../../shared/database/prisma';
import { AppError } from '../../../shared/errors';
import { logger } from '../../../shared/logger';
import { ICreateCaseDTO, IUpdateCaseDTO, ICaseResponseDTO } from '../dtos/case.dto';
import { IPaginationParams, IPaginationResponse } from '../dtos/pagination.dto';

export class CaseRepository {
  private async findById(id: string): Promise<Case | null> {
    return prisma.case.findUnique({
      where: { id },
    });
  }

  async findAll(
    paginationParams: IPaginationParams,
  ): Promise<IPaginationResponse<ICaseResponseDTO>> {
    const { page, limit } = paginationParams;
    const skip = (page - 1) * limit;

    const [total, data] = await Promise.all([
      prisma.case.count(),
      prisma.case.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          description: true,
          comments: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      }),
    ]);

    return {
      data,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      limit,
    };
  }

  async create(data: ICreateCaseDTO): Promise<ICaseResponseDTO> {
    return prisma.case.create({
      data: {
        name: data.name,
        description: data.description,
        comments: data.comments,
      },
      select: {
        id: true,
        name: true,
        description: true,
        comments: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(id: string, data: IUpdateCaseDTO): Promise<ICaseResponseDTO> {
    const caseExists = await this.findById(id);

    if (!caseExists) {
      logger.warn(`Case with ID ${id} not found`);
      throw new AppError(404, 'Case not found');
    }

    return prisma.case.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        description: true,
        comments: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    const caseExists = await this.findById(id);

    if (!caseExists) {
      logger.warn(`Case with ID ${id} not found`);
      throw new AppError(404, 'Case not found');
    }

    await prisma.case.delete({
      where: { id },
    });
  }
}
