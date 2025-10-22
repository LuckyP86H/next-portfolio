'use client';

import { Inter, Fira_Code } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@components/ThemeProvider';
import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter', 
});

const firaCode = Fira_Code({ 
  subsets: ['latin'],
  variable: '--font-fira-code', 
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Paul Xu's Portfolio - Software Engineer" />
        <title>Paul Xu - Software Engineer</title>
      </head>
      <body className={`${inter.variable} ${firaCode.variable} font-sans min-h-screen flex flex-col`}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen transition-colors duration-300">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}