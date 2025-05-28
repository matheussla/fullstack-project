import { User, UserRole } from '@prisma/client';
import { ICreateUserDTO, IUserResponseDTO } from 'src/modules/users/dtos/user.dto';
import { prisma } from 'src/shared/database/prisma';
import { AppError } from 'src/shared/errors';
import { logger } from 'src/shared/logger';

export class UserRepository {
  private async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async create(data: ICreateUserDTO): Promise<IUserResponseDTO> {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role as UserRole,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);

    if (!user) {
      logger.warn(`User with ID ${id} not found`);
      throw new AppError(404, 'User not found');
    }

    await prisma.user.delete({
      where: { id },
    });
  }
}
