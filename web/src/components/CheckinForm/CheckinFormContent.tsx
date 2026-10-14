'use client';

import React from 'react';
import { useCheckinForm } from './context';

export interface CheckinFormContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CheckinFormContent: React.FC<CheckinFormContentProps> = ({
  children,
  className = 'space-y-3',
}) => {
  const { handleSubmit } = useCheckinForm();

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
    </form>
  );
};
