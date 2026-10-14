'use client';

import React from 'react';
import { Keypad } from '../Keypad';
import { useCheckinForm } from './context';

export interface CheckinFormKeypadProps {
  className?: string;
}

export const CheckinFormKeypad: React.FC<CheckinFormKeypadProps> = ({ className = '' }) => {
  const { handleKeypadPress, loading } = useCheckinForm();

  return (
    <div className={className}>
      <Keypad onKeyPress={handleKeypadPress} disabled={loading} />
    </div>
  );
};
