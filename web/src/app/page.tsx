import React from 'react';
import { Header } from '../components/Header';
import { ReceptionSection } from '../components/ReceptionSection';
import { Footer } from '../components/Footer';

export default function HomePage() {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#F4F8FA] font-sans select-none">
      {/* 1. Cabeçalho Especializado do Totem */}
      <Header />

      {/* 2. Conteúdo Central: Formulário de Check-in e Fila (Sem scroll de página) */}
      <main className="flex-1 min-h-0 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 overflow-hidden">
        <ReceptionSection />
      </main>

      {/* 3. Barra de Status Inferior do Totem */}
      <Footer />
    </div>
  );
}
