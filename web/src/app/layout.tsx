import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hospital Alemão Oswaldo Cruz | Totem de Check-in',
  description: 'Sistema integrado de recepção e check-in de pacientes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="min-h-full flex flex-col bg-slate-50 antialiased selection:bg-[#007889]/20 selection:text-[#007889]">
        {children}
      </body>
    </html>
  );
}
