import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { config } from 'src/config';
import { ILoginDTO, IAuthResponse } from 'src/modules/auth/dtos/auth.dto';
import { prisma } from 'src/shared/database/prisma';
import { AppError } from 'src/shared/errors';

export class AuthService {
  async login(data: ILoginDTO): Promise<IAuthResponse> {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new AppError(401, 'Invalid credentials');
    }

    const passwordMatch = await compare(data.password, user.password);

    if (!passwordMatch) {
      throw new AppError(401, 'Invalid credentials');
    }

    const token = sign({ id: user.id, role: user.role }, config.jwtSecret, { expiresIn: '1d' });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
