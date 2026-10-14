'use client';

import { createContext, useContext } from 'react';
import type { CheckIn } from '../../types';

export interface CheckinFormContextType {
  cpf: string;
  setCpf: (value: string) => void;
  loading: boolean;
  error: string | null;
  setError: (err: string | null) => void;
  successData: CheckIn | null;
  setSuccessData: (data: CheckIn | null) => void;
  handleKeypadPress: (key: string) => void;
  handleCpfChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export const CheckinFormContext = createContext<CheckinFormContextType | null>(null);

export function useCheckinForm(): CheckinFormContextType {
  const context = useContext(CheckinFormContext);
  if (!context) {
    throw new Error('Os subcomponentes de CheckinForm devem ser utilizados dentro de CheckinForm.Root');
  }
  return context;
}
