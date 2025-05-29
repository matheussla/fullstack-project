import { Request, Response } from 'express';

import { ICreateCaseDTO, IUpdateCaseDTO } from '../dtos/case.dto';
import { CaseService } from '../services/case.service';

export class CaseController {
  private caseService: CaseService;

  constructor() {
    this.caseService = new CaseService();
  }

  async findAllCases(req: Request, res: Response): Promise<void> {
    const cases = await this.caseService.findAllCases();
    res.status(200).json(cases);
  }

  async createCase(req: Request, res: Response): Promise<void> {
    const data: ICreateCaseDTO = req.body;
    const newCase = await this.caseService.createCase(data);
    res.status(201).json(newCase);
  }

  async updateCase(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const data: IUpdateCaseDTO = req.body;
    const updatedCase = await this.caseService.updateCase(id, data);
    res.status(200).json(updatedCase);
  }

  async deleteCase(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this.caseService.deleteCase(id);
    res.status(204).send();
  }
}
