'use client'
import React, { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { AboutData } from '@/public/data/AboutData';

import { Sparkles, Briefcase } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
gsap.config({ force3D: true });

const About = () => {
    const containerRef = useRef(null);
    const data = AboutData;

    useGSAP(() => {
        const headlines = gsap.utils.toArray('.scrub-headline');
        headlines.forEach((headline) => {
            const split = new SplitText(headline, { type: "words" });

            gsap.set(split.words, { opacity: 0.2 });
            gsap.to(split.words, {
                opacity: 1,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: headline,
                    start: 'top 80%',
                    end: 'bottom 40%',
                    scrub: 1,
                }
            });
        });

        const paragraphs = gsap.utils.toArray('.split-paragraph');
        paragraphs.forEach((p) => {
            const split = new SplitText(p, { type: "lines", mask: "lines" });

            gsap.from(split.lines, {
                y: 30,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: p,
                    start: 'top 85%',
                }
            });
        });

        gsap.utils.toArray('.fade-up-logo').forEach((el) => {
            gsap.fromTo(el,
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 90%',
                    }
                }
            );
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="about" className="relative w-full bg-background text-foreground pt-24 pb-32 sm:pt-32 sm:pb-40 px-4 sm:px-8 md:px-12 selection:bg-secondary selection:text-white">
            <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-y-32 md:gap-y-48">


                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 relative">

                    <div className="md:col-span-3 lg:col-span-2 hidden md:block">
                        <div className="sticky top-32 flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-secondary">
                            <Sparkles className="w-5 h-5" />
                            {data.sections[0].label}
                        </div>
                    </div>

                    <div className="md:hidden flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-secondary mb-4">
                        <Sparkles className="w-4 h-4" />
                        {data.sections[0].label}
                    </div>

                    <div className="md:col-span-9 lg:col-span-10">
                        <h2 className="sr-only">{data.sections[0].headline}</h2>

                        <div className="scrub-headline text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-medium leading-[1.2] tracking-tight mb-12 sm:mb-16 font-outfit" aria-hidden="true">
                            {data.sections[0].headline}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                            <p className="split-paragraph text-foreground/70 leading-relaxed font-medium text-sm sm:text-base m-0">
                                {data.sections[0].paragraphs[0]}
                            </p>
                            <p className="split-paragraph text-foreground/70 leading-relaxed font-medium text-sm sm:text-base m-0">
                                {data.sections[0].paragraphs[1]}
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- CLIENTS SECTION --- */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 relative">

                    <div className="md:col-span-3 lg:col-span-2 hidden md:block">
                        <div className="sticky top-32 flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-secondary">

                            <Briefcase className="w-5 h-5" />
                            {data.sections[1].label}
                        </div>
                    </div>

                    <div className="md:hidden flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-secondary mb-4">
                        <Briefcase className="w-4 h-4" />
                        {data.sections[1].label}
                    </div>

                    <div className="md:col-span-9 lg:col-span-10">
                        <h2 className="sr-only">{data.sections[1].headline}</h2>

                        <div className="scrub-headline text-2xl sm:text-3xl md:text-4xl font-medium leading-[1.3] tracking-tight mb-12 sm:mb-16 font-outfit" aria-hidden="true">
                            {data.sections[1].headline}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
                            <p className="split-paragraph text-foreground/70 leading-relaxed font-medium text-sm sm:text-base m-0">
                                {data.sections[1].paragraphs[0]}
                            </p>
                            <p className="split-paragraph text-foreground/70 leading-relaxed font-medium text-sm sm:text-base m-0">
                                {data.sections[1].paragraphs[1]}
                            </p>
                        </div>

                        {/* Client Logos Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                            {data.sections[1].logos.map((logo, index) => (
                                <div key={index} className="fade-up-logo  relative w-full h-24 sm:h-32 flex items-center justify-center border border-foreground/10   bg-white  overflow-hidden">
                                    <Image
                                        src={logo.src}
                                        alt={logo.alt}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default About;