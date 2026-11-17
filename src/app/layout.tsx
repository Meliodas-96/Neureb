import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NEUREB | Atlas Neuroanatómico 3D de Alta Precisión',
  description: 'Visor 3D interactivo médico-quirúrgico del cerebro humano con vascularización cerebral, pares craneales y corteza.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="bg-clinical-bg text-slate-100 antialiased h-screen w-screen overflow-hidden">
        {children}
      </body>
    </html>
  );
}
