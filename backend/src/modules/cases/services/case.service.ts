import { AppError } from '../../../shared/errors';
import { logger } from '../../../shared/logger';
import { ICreateCaseDTO, IUpdateCaseDTO, ICaseResponseDTO } from '../dtos/case.dto';
import { IPaginationParams, IPaginationResponse } from '../dtos/pagination.dto';
import { CaseRepository } from '../repositories/case.repository';

export class CaseService {
  private caseRepository: CaseRepository;

  constructor() {
    this.caseRepository = new CaseRepository();
  }

  async findAllCases(
    paginationParams: IPaginationParams,
  ): Promise<IPaginationResponse<ICaseResponseDTO>> {
    try {
      return this.caseRepository.findAll(paginationParams);
    } catch (error) {
      logger.error(`Error finding all cases: ${error}`);
      throw new AppError(500, 'Error finding cases');
    }
  }

  async createCase(data: ICreateCaseDTO): Promise<ICaseResponseDTO> {
    try {
      return this.caseRepository.create(data);
    } catch (error) {
      logger.error(`Error creating case: ${error}`);
      throw new AppError(500, 'Error creating case');
    }
  }

  async updateCase(id: string, data: IUpdateCaseDTO): Promise<ICaseResponseDTO> {
    try {
      return this.caseRepository.update(id, data);
    } catch (error) {
      logger.error(`Error updating case with ID ${id}: ${error}`);
      throw new AppError(500, 'Error updating case');
    }
  }

  async deleteCase(id: string): Promise<void> {
    try {
      await this.caseRepository.delete(id);
    } catch (error) {
      logger.error(`Error deleting case with ID ${id}: ${error}`);
      throw new AppError(500, 'Error deleting case');
    }
  }
}
