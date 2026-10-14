export interface CheckIn {
  id: string;
  cpf: string;
  name: string;
  birth?: string;
  createdAt: string;
}

export interface ApiErrorResponse {
  message: string | string[];
  statusCode: number;
  error?: string;
}
