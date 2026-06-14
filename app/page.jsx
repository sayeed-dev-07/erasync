import Navbar from '@/components/normal/Navbar';
import About from '@/components/sections/About';
import Hero from '@/components/sections/Hero';
import React from 'react';

const page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <div className='min-h-screen'></div>
    </div>
  );
};

export default page;