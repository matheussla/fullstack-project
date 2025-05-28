import { Request, Response } from 'express';
import { ILoginDTO } from 'src/modules/auth/dtos/auth.dto';
import { AuthService } from 'src/modules/auth/services/auth.service';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(req: Request, res: Response): Promise<void> {
    const data: ILoginDTO = req.body;
    const response = await this.authService.login(data);
    res.status(200).json(response);
  }
}
