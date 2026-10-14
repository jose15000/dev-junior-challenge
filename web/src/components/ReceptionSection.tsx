'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { CheckinForm } from './CheckinForm';
import { QueueList } from './QueueList';
import type { CheckIn } from '../types';
import { fetchQueue } from '../services/api';

export const ReceptionSection: React.FC = () => {
  const [queue, setQueue] = useState<CheckIn[]>([]);
  const [loading, setLoading] = useState(false);

  const loadQueue = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchQueue();
      setQueue(data);
    } catch (err) {
      console.error('Erro ao buscar a fila:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadQueue();
    // Atualização periódica da fila da recepção a cada 10s
    const interval = setInterval(loadQueue, 10000);
    return () => clearInterval(interval);
  }, [loadQueue]);

  const handleCheckinSuccess = (newCheckin: CheckIn) => {
    setQueue((prev) => [...prev, newCheckin]);
    loadQueue();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-full min-h-0">
      {/* Coluna 1: Totem do Paciente (5 colunas) */}
      <div className="lg:col-span-5">
        <CheckinForm onSuccess={handleCheckinSuccess} />
      </div>

      {/* Coluna 2: Fila de Atendimento (7 colunas) */}
      <div className="lg:col-span-7 h-full min-h-0">
        <QueueList
          queue={queue}
          loading={loading}
          onRefresh={loadQueue}
        />
      </div>
    </div>
  );
};
