'use client';

import React, { useState } from 'react';
import Preloader from './IntroAnim';
import Hero from '../sections/Hero';
import Services from '../sections/Services';
import Works from '../sections/Work';
import Navbar from '../normal/Navbar';
import About from '../sections/About';
import Testimonials from '../sections/Testimonials';


export default function Home() {
    const [introFinished, setIntroFinished] = useState(false);

    return (
        <main className="relative min-h-screen bg-[#efede7]">
            
            <Preloader onComplete={() => setIntroFinished(true)} />
            <Navbar />
            <Hero startTimeline={introFinished} />
            <About />
            <Works />
            <Services />
            <Testimonials />
        </main>
    );
}