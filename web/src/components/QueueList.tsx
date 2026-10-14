'use client';

import React from 'react';
import { Users, RotateCw, Clock, Inbox, User } from 'lucide-react';
import type { CheckIn } from '../types';

interface QueueListProps {
  queue: CheckIn[];
  loading: boolean;
  onRefresh: () => void;
}

export const QueueList: React.FC<QueueListProps> = ({ queue, loading, onRefresh }) => {
  const formatTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '--:--';
    }
  };

  const formatCpf = (cpf: string) => {
    const numbers = cpf.replace(/\D/g, '');
    if (numbers.length !== 11) return cpf;
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9)}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 flex flex-col h-full select-none">
      {/* Topo do Card Original */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#003B4E]/10 text-[#003B4E] flex items-center justify-center shrink-0 shadow-2xs">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#003B4E]">Fila da Recepção</h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#E6F2F4] text-[#007889]">
                {queue.length} {queue.length === 1 ? 'paciente' : 'pacientes'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Check-ins registrados em ordem de chegada
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          title="Atualizar fila"
          className="p-2.5 text-slate-500 hover:text-[#007889] hover:bg-[#E6F2F4] rounded-lg transition-colors cursor-pointer disabled:opacity-50"
        >
          <RotateCw className={`w-5 h-5 ${loading ? 'animate-spin text-[#007889]' : ''}`} />
        </button>
      </div>

      {/* Lista Interna Original com Scroll */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1">
        {loading && queue.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <RotateCw className="w-8 h-8 animate-spin mb-3 text-[#007889]" />
            <span className="text-sm font-medium">Carregando lista de check-ins...</span>
          </div>
        ) : queue.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 text-center p-6">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-center mb-3 text-slate-400">
              <Inbox className="w-8 h-8" />
            </div>
            <p className="text-base font-semibold text-slate-600">Fila Vazia</p>
            <p className="text-xs text-slate-400 max-w-xs mt-1">
              Nenhum paciente realizou check-in ainda hoje. Use o formulário ao lado para iniciar.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {queue.map((item, index) => {
              const isFirst = index === 0;
              return (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                    isFirst
                      ? 'border-[#007889]/40 bg-[#E6F2F4]/40 shadow-xs'
                      : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 shadow-xs ${
                        isFirst
                          ? 'bg-[#007889] text-white'
                          : 'bg-[#003B4E] text-white'
                      }`}
                    >
                      {index + 1}º
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800 text-sm sm:text-base">
                          {item.name}
                        </span>
                        {isFirst ? (
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Próximo Chamado
                          </span>
                        ) : (
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60">
                            Aguardando
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <User className="w-3.5 h-3.5" />
                        <span className="font-mono">{formatCpf(item.cpf)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200/80 shadow-2xs">
                    <Clock className="w-3.5 h-3.5 text-[#007889]" />
                    <span>{formatTime(item.createdAt)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
