'use client';

import React from 'react';
import { UserCheck } from 'lucide-react';

export interface CheckinFormHeaderProps {
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const CheckinFormHeader: React.FC<CheckinFormHeaderProps> = ({
  icon,
  title = 'Totem de Check-in',
  subtitle = 'Digite seu CPF para confirmar presença na recepção',
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-3.5 mb-3 shrink-0 ${className}`}>
      <div className="w-10 h-10 rounded-xl bg-[#E6F2F4] text-[#007889] flex items-center justify-center shrink-0 shadow-2xs">
        {icon || <UserCheck className="w-5 h-5" />}
      </div>
      <div>
        <h2 className="text-xl font-bold text-[#003B4E]">{title}</h2>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
};
