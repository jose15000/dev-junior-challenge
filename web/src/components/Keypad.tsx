import React from 'react';
import { Delete } from 'lucide-react';

interface KeypadProps {
  onKeyPress: (key: string) => void;
  disabled?: boolean;
}

export const Keypad: React.FC<KeypadProps> = ({ onKeyPress, disabled = false }) => {
  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <div className="bg-slate-50 p-2 sm:p-2.5 rounded-xl border border-slate-200 select-none">
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        {digits.map((digit) => (
          <button
            key={digit}
            type="button"
            onClick={() => onKeyPress(digit)}
            disabled={disabled}
            className="h-10 sm:h-11 rounded-lg bg-white border border-slate-200 text-lg font-bold text-slate-800 hover:bg-[#E6F2F4] hover:text-[#007889] hover:border-[#007889] active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {digit}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onKeyPress('clear')}
          disabled={disabled}
          className="h-10 sm:h-11 rounded-lg bg-slate-200/80 border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-300 active:scale-95 transition-all flex items-center justify-center cursor-pointer uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Limpar
        </button>

        <button
          type="button"
          onClick={() => onKeyPress('0')}
          disabled={disabled}
          className="h-10 sm:h-11 rounded-lg bg-white border border-slate-200 text-lg font-bold text-slate-800 hover:bg-[#E6F2F4] hover:text-[#007889] hover:border-[#007889] active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-2xs disabled:opacity-50 disabled:cursor-not-allowed"
        >
          0
        </button>

        <button
          type="button"
          onClick={() => onKeyPress('backspace')}
          disabled={disabled}
          className="h-10 sm:h-11 rounded-lg bg-slate-200/80 border border-slate-300 text-slate-700 hover:bg-slate-300 active:scale-95 transition-all flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          title="Apagar dígito"
        >
          <Delete className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
