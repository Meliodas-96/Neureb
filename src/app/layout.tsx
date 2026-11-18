import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#030712',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  title: {
    default: 'NEUREB | Atlas Neuroanatómico 3D de Alta Precisión',
    template: '%s | NEUREB 3D',
  },
  description:
    'Visor 3D interactivo médico-quirúrgico del cerebro humano con vascularización arterial (ACM, ACA, Basilar), venas corticales, pares craneales y parénquima con modo Rayos X y aislamiento quirúrgico.',
  keywords: [
    'neuroanatomía 3D',
    'cerebro 3D',
    'vascularización cerebral',
    'arteria cerebral media',
    'polígono de Willis',
    'pares craneales',
    'neurocirugía',
    'Next.js 3D',
    'React Three Fiber',
    'Three.js',
    'anatomía médica',
  ],
  authors: [{ name: 'NEUREB Medical Engineering' }],
  creator: 'NEUREB',
  publisher: 'NEUREB Neurosciences',
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'NEUREB | Atlas Neuroanatómico 3D de Alta Precisión',
    description:
      'Exploración anatómica 3D con sombreado PBR realista, modo rayos X interactivo, aislamiento quirúrgico y fichas patológicas.',
    url: 'http://localhost:3000',
    siteName: 'NEUREB 3D Neuroanatomy',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NEUREB 3D Neuroanatomy Explorer',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEUREB | Atlas Neuroanatómico 3D',
    description:
      'Exploración 3D de alta fidelidad del cerebro humano y su red neurovascular.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
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
