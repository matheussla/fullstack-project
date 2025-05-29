export interface ICreateCaseDTO {
  name: string;
  description: string;
  comments: string[];
}

export interface IUpdateCaseDTO {
  name?: string;
  description?: string;
  comments?: string[];
}

export interface ICaseResponseDTO {
  id: string;
  name: string;
  description: string;
  comments: string[];
  createdAt: Date;
  updatedAt: Date;
}
