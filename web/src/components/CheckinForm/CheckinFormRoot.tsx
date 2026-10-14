'use client';

import React, { useState, useCallback } from 'react';
import { createCheckin } from '../../services/api';
import { formatCPF } from '../../utils/formatCPF';
import { CheckinFormContext } from './context';
import type { CheckIn } from '../../types';

export interface CheckinFormRootProps {
  onSuccess: (newCheckin: CheckIn) => void;
  children: React.ReactNode;
  className?: string;
}

export const CheckinFormRoot: React.FC<CheckinFormRootProps> = ({
  onSuccess,
  children,
  className = '',
}) => {
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<CheckIn | null>(null);

  const handleCpfChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSuccessData(null);
    setCpf(formatCPF(e.target.value));
  }, []);

  const handleKeypadPress = useCallback((key: string) => {
    setError(null);
    setSuccessData(null);
    setCpf((prevCpf) => {
      const raw = prevCpf.replace(/\D/g, '');
      if (key === 'clear') {
        return '';
      }
      if (key === 'backspace') {
        return formatCPF(raw.slice(0, -1));
      }
      if (raw.length < 11) {
        return formatCPF(raw + key);
      }
      return prevCpf;
    });
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const cleanCpf = cpf.replace(/\D/g, '');

      if (!cleanCpf) {
        setError('Por favor, informe o CPF.');
        return;
      }

      if (cleanCpf.length !== 11) {
        setError('CPF incompleto. Digite os 11 dígitos.');
        return;
      }

      setLoading(true);
      setError(null);
      setSuccessData(null);

      try {
        const result = await createCheckin(cleanCpf);
        setSuccessData(result);
        setCpf('');
        onSuccess(result);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Erro ao processar o check-in.';
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [cpf, onSuccess]
  );

  return (
    <CheckinFormContext.Provider
      value={{
        cpf,
        setCpf,
        loading,
        error,
        setError,
        successData,
        setSuccessData,
        handleKeypadPress,
        handleCpfChange,
        handleSubmit,
      }}
    >
      <div
        className={`bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6 select-none flex flex-col justify-between ${className}`}
      >
        {children}
      </div>
    </CheckinFormContext.Provider>
  );
};
