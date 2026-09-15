import type { Metadata, Viewport } from 'next';
import { Fira_Code } from 'next/font/google';
import './globals.css';
import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import MotionProvider from '@components/layout/MotionProvider';
import { site } from '@content/site';

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
});

const title = `${site.name} — ${site.role}`;
const description = `${site.name} is a software engineer at ${site.company} who builds backend systems with Java, Spring, Docker and Kubernetes.`;

export const metadata: Metadata = {
  metadataBase: new URL('https://luckyp86h.github.io/next-portfolio'),
  title,
  description,
  openGraph: { title, description, type: 'website' },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${firaCode.variable}`}>
      <body className="flex min-h-screen flex-col bg-chic-black font-mono text-chic-fg antialiased">
        <MotionProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
