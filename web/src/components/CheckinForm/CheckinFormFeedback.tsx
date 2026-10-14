'use client';

import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useCheckinForm } from './context';

export interface CheckinFormFeedbackProps {
  className?: string;
}

export const CheckinFormFeedback: React.FC<CheckinFormFeedbackProps> = ({ className = '' }) => {
  const { error, successData } = useCheckinForm();

  if (!error && !successData) {
    return null;
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Feedback de Erro */}
      {error && (
        <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-start gap-2.5 animate-in fade-in duration-150">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
          <div className="text-xs">
            <span className="font-semibold block">Não foi possível prosseguir</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Feedback de Sucesso */}
      {successData && (
        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-2.5 animate-in fade-in duration-150">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
          <div className="text-xs">
            <span className="font-semibold block text-sm text-emerald-900">
              Check-in Realizado com Sucesso!
            </span>
            <p className="mt-0.5 text-emerald-800">
              Paciente: <strong>{successData.name}</strong>
            </p>
            <p className="text-xs text-emerald-600">
              Você foi incluído na fila de espera. Aguarde no painel.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
