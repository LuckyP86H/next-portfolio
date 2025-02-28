'use client';

import About from '@/components/sections/About';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useState } from 'react';

export default function AboutPage() {
  const [currentAboutSection, setCurrentAboutSection] = useState(0);
  
  // Only show footer when we're at the experience section (section 2)
  const showFooter = currentAboutSection === 2;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <About onSectionChange={setCurrentAboutSection} />
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
}