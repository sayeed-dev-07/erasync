'use client'
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { HeroData } from '@/public/data/HeroData';


gsap.registerPlugin(useGSAP);
gsap.config({ force3D: true });

const Hero = () => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const data = HeroData;

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.inOut' } });

        tl.to(imageRef.current,
            { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1.5, delay: 0.2 }
        )
            .fromTo('.heading-top',
                { yPercent: 100, opacity: 0 },
                { yPercent: 0, opacity: 1, duration: 1.2 },
                "-=0.8"
            )
            .fromTo('.heading-bottom',
                { yPercent: -100, opacity: 0 },
                { yPercent: 0, opacity: 1, duration: 1.2 },
                "-=1.2"
            )
            .fromTo('.editorial-corner',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power2.out' },
                "-=0.5"
            );

    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative w-full h-svh min-h-[700px] bg-foreground text-background overflow-hidden flex items-center justify-center font-outfit uppercase selection:bg-background selection:text-foreground"
        >

            <div className="editorial-corner absolute top-28 sm:top-32 left-6 sm:left-12 z-20 text-xs sm:text-sm font-semibold tracking-[0.2em] opacity-0">
                {data.meta}
            </div>


            <div className="editorial-corner absolute top-36 sm:top-32 right-6 sm:right-12 z-20 w-48 sm:w-64 text-xs sm:text-sm font-medium tracking-wide leading-relaxed text-right opacity-0 ">
                <p className="text-background/80">{data.description}</p>
            </div>


            <div className="editorial-corner absolute bottom-8 sm:bottom-12 left-6 sm:left-12 z-20 flex items-center gap-4 opacity-0">
                <span className="text-xs font-bold tracking-[0.2em] rotate-180" style={{ writingMode: 'vertical-rl' }}>
                    SCROLL
                </span>
                <div className="w-px h-12 sm:h-16 bg-background/30 relative overflow-hidden">
                    <div className="w-full h-full bg-background animate-scroll-line origin-top"></div>
                </div>
            </div>


            <Link

                href="#works"

                className="editorial-corner absolute bottom-8 sm:bottom-12 right-6 sm:right-12 z-20 flex items-center justify-center w-28 h-28 sm:w-40 sm:h-40 rounded-full border border-background hover:bg-secondary hover:text-background transition-colors duration-500 opacity-0 group"

            >

                <span className="text-[10px] sm:text-xs font-bold tracking-widest text-center w-2/3 group-hover:scale-110 transition-transform duration-500">

                    {data.action}

                </span>

            </Link>


            <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center z-10 pointer-events-none">

                {/* Top Word */}
                <div className="overflow-hidden  z-10 -mb-6 sm:-mb-16 md:-mb-24 lg:-mb-32">
                    <h1 className="heading-top text-[17vw] sm:text-[15vw] leading-none font-black tracking-[-0.04em] text-secondary opacity-0">
                        {data.heading.top}
                    </h1>
                </div>

                {/* Image Mask */}
                <div
                    ref={imageRef}
                    className="relative z-20 w-[85%] sm:w-[70%] md:w-[50%]  aspect-video border border-foreground/20 pointer-events-auto"
                    style={{ clipPath: 'polygon(0% 49.5%, 100% 49.5%, 100% 50.5%, 0% 50.5%)' }}
                >
                    <Image
                        src={data.image.link}
                        fill
                        className="object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700"
                        alt={data.image.alt}
                        priority
                    />
                </div>

                {/* Bottom Word */}
                <div className="overflow-hidden  z-10 -mt-6 sm:-mt-16 md:-mt-24 lg:-mt-32">
                    <h1 className="heading-bottom text-[17vw] sm:text-[15vw] leading-none font-black tracking-[-0.04em] text-secondary opacity-0">
                        {data.heading.bottom}
                    </h1>
                </div>

            </div>

        </section>
    );
};

export default Hero;