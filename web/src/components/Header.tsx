'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Clock, Activity } from 'lucide-react';

export const Header: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white border-b border-slate-200 shadow-xs shrink-0 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Oficial e Identidade Visual Original do Totem */}
          <div className="flex items-center gap-4">
            <Image
              src="/oswaldo-cruz-logo.png"
              alt="Hospital Alemão Oswaldo Cruz"
              width={220}
              height={55}
              priority
              className="h-11 sm:h-12 w-auto object-contain"
            />
            <div className="hidden sm:block h-8 w-px bg-slate-200" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-[#003B4E] tracking-tight">
                  Hospital Alemão Oswaldo Cruz
                </span>
                <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-[#E6F2F4] text-[#007889]">
                  Totem
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Sistema Integrado de Recepção e Check-in de Pacientes
              </p>
            </div>
          </div>

          {/* Horário em Tempo Real e Status Operacional */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 px-3.5 py-2 rounded-full border border-slate-200">
              <Clock className="w-4 h-4 text-[#007889]" />
              <span className="font-mono font-bold">{time || '--:--:--'}</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-full border border-emerald-200">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <Activity className="w-3.5 h-3.5" />
              <span>Totem Operacional</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
