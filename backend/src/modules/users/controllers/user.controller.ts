import { Request, Response } from 'express';

import { ICreateUserDTO } from '../dtos/user.dto';
import { UserService } from '../services/user.service';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const data: ICreateUserDTO = req.body;
    const user = await this.userService.createUser(data);
    res.status(201).json(user);
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this.userService.deleteUser(id);
    res.status(204).send({ message: 'User deleted successfully' });
  }
}
