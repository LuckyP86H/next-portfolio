import type { Metadata, Viewport } from 'next';
import { Fira_Code } from 'next/font/google';
import './globals.css';
import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Paul Xu — Software Engineer',
  description:
    "Paul Xu's portfolio — backend software engineer working with Java, Spring, Docker, and Kubernetes. A Developer Chic dashboard.",
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${firaCode.variable}`}>
      <body className="font-mono min-h-screen flex flex-col bg-chic-black text-chic-fg antialiased">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
