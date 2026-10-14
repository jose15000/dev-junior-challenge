'use client';

import React from 'react';
import { UserCheck, Loader2 } from 'lucide-react';
import { useCheckinForm } from './context';

export interface CheckinFormSubmitProps {
  children?: React.ReactNode;
  loadingText?: string;
  className?: string;
}

export const CheckinFormSubmit: React.FC<CheckinFormSubmitProps> = ({
  children = 'Confirmar Presença / Check-in',
  loadingText = 'Consultando cadastro...',
  className = '',
}) => {
  const { loading, cpf } = useCheckinForm();

  return (
    <button
      type="submit"
      disabled={loading || !cpf}
      className={`w-full h-12 sm:h-13 flex items-center justify-center gap-2 rounded-xl font-bold text-base text-white bg-[#007889] hover:bg-[#00606e] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 transition-all shadow-sm cursor-pointer ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          <UserCheck className="w-5 h-5" />
          <span>{children}</span>
        </>
      )}
    </button>
  );
};
