'use client';

import React from 'react';
import { useCheckinForm } from './context';

export interface CheckinFormInputProps {
  label?: string;
  placeholder?: string;
  className?: string;
}

export const CheckinFormInput: React.FC<CheckinFormInputProps> = ({
  label = 'Número do CPF',
  placeholder = '000.000.000-00',
  className = '',
}) => {
  const { cpf, setCpf, loading, handleCpfChange } = useCheckinForm();

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-1">
        <label
          htmlFor="cpf-input"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
        >
          {label}
        </label>
        {cpf && (
          <button
            type="button"
            onClick={() => setCpf('')}
            className="text-xs font-semibold text-[#007889] hover:underline cursor-pointer"
          >
            Limpar
          </button>
        )}
      </div>
      <input
        id="cpf-input"
        type="text"
        value={cpf}
        onChange={handleCpfChange}
        placeholder={placeholder}
        maxLength={14}
        disabled={loading}
        autoFocus
        autoComplete="off"
        className="w-full text-xl sm:text-2xl font-mono tracking-wider px-3 py-2.5 bg-slate-50 border-2 border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#007889]/20 focus:border-[#007889] transition-all text-slate-800 placeholder-slate-400 font-bold text-center"
      />
    </div>
  );
};
