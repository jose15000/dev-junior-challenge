import type { CheckIn } from '../types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function createCheckin(cpf: string): Promise<CheckIn> {
  const cleanCpf = cpf.replace(/\D/g, '');

  const response = await fetch(`${API_BASE_URL}/checkin/start`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cpf: cleanCpf }),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMessage = Array.isArray(data.message)
      ? data.message.join(', ')
      : data.message || 'Falha ao realizar check-in';
    throw new Error(errorMessage);
  }

  return data;
}

export async function fetchQueue(): Promise<CheckIn[]> {
  const response = await fetch(`${API_BASE_URL}/checkin/listCheckins`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Falha ao carregar a fila de atendimento.');
  }

  return response.json();
}
