import React, { useState } from 'react';
import { UserCheck, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { createCheckin } from '../services/api';
import { Keypad } from './Keypad';
import type { CheckIn } from '../types';

interface CheckinFormProps {
  onSuccess: (newCheckin: CheckIn) => void;
}

export const CheckinForm: React.FC<CheckinFormProps> = ({ onSuccess }) => {
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<CheckIn | null>(null);

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 11);
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSuccessData(null);
    setCpf(formatCPF(e.target.value));
  };

  const handleKeypadPress = (key: string) => {
    setError(null);
    setSuccessData(null);
    const raw = cpf.replace(/\D/g, '');
    if (key === 'clear') {
      setCpf('');
    } else if (key === 'backspace') {
      setCpf(formatCPF(raw.slice(0, -1)));
    } else if (raw.length < 11) {
      setCpf(formatCPF(raw + key));
    }
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
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
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6 select-none flex flex-col justify-between">
      {/* Topo do Card */}
      <div className="flex items-center gap-3 mb-3 shrink-0">
        <div className="w-10 h-10 rounded-xl bg-[#E6F2F4] text-[#007889] flex items-center justify-center shrink-0 shadow-2xs">
          <UserCheck className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#003B4E]">Totem de Check-in</h2>
          <p className="text-xs text-slate-500">
            Digite seu CPF para confirmar presença na recepção
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Campo de CPF */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="cpf-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Número do CPF
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
            placeholder="000.000.000-00"
            maxLength={14}
            disabled={loading}
            autoFocus
            autoComplete="off"
            className="w-full text-xl sm:text-2xl font-mono tracking-wider px-3 py-2.5 bg-slate-50 border-2 border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#007889]/20 focus:border-[#007889] transition-all text-slate-800 placeholder-slate-400 font-bold text-center"
          />
        </div>

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

        {/* Componente de Teclado Numérico Separado */}
        <Keypad onKeyPress={handleKeypadPress} disabled={loading} />

        {/* Botão de Ação Principal */}
        <button
          type="submit"
          disabled={loading || !cpf}
          className="w-full h-12 sm:h-13 flex items-center justify-center gap-2 rounded-xl font-bold text-base text-white bg-[#007889] hover:bg-[#00606e] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 transition-all shadow-sm cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Consultando cadastro...</span>
            </>
          ) : (
            <>
              <UserCheck className="w-5 h-5" />
              <span>Confirmar Presença / Check-in</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
