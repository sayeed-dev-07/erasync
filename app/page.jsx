import Navbar from '@/components/normal/Navbar';
import About from '@/components/sections/About';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Testimonials from '@/components/sections/Testimonials';
import Works from '@/components/sections/Work';
import React from 'react';

const page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Works />
      <Services />
      <Testimonials />
    </div>
  );
};

export default page;