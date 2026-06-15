/* eslint-disable react-hooks/refs */
'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { HeroData } from '@/public/data/HeroData';
import { FaFacebook } from 'react-icons/fa';
import { GrGoogle } from 'react-icons/gr';
import { BsInstagram, BsTwitterX } from 'react-icons/bs';
import Image from 'next/image';

gsap.registerPlugin(useGSAP, SplitText);
gsap.config({ force3D: true });

const platforms = [
    { name: 'Facebook', type: 'facebook' },
    { name: 'Google', type: 'google' },
    { name: 'ChatGPT', type: 'chatgpt' },
    { name: 'Instagram', type: 'instagram' },
    { name: 'X', type: 'x' },
];

const BrandMark = ({ type }) => {
    if (type === 'facebook') return <FaFacebook />;
    if (type === 'google') return <GrGoogle />;
    if (type === 'instagram') return <BsInstagram />;
    if (type === 'x') return <BsTwitterX />;
    return <Image src={'/img/ai.svg'} alt='aiImg' height={24} width={24} />;
};

const Hero = ({ startTimeline }) => {
    const containerRef = useRef(null);
    const data = HeroData;

    const btnRef = useRef(null);
    const btnBgRef = useRef(null);
    const btnIconRef = useRef(null);

    const { contextSafe } = useGSAP({ scope: containerRef });

    const handleBtnEnter = contextSafe(() => {
        gsap.to(btnRef.current, { scale: 1.05, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        gsap.to(btnBgRef.current, { yPercent: 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        gsap.to(btnIconRef.current, { rotate: 45, duration: 0.5, ease: "power3.out", overwrite: "auto" });
    });

    const handleBtnLeave = contextSafe(() => {
        gsap.to(btnRef.current, { scale: 1, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        gsap.to(btnBgRef.current, { yPercent: 100, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        gsap.to(btnIconRef.current, { rotate: 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
    });


    useGSAP(() => {
        const splitTop = new SplitText('.hero-word-top', { type: 'chars' });
        const splitBottom = new SplitText('.hero-word-bottom', { type: 'chars' });
        const characters = [...splitTop.chars, ...splitBottom.chars];

        gsap.set(characters, {
            yPercent: 115,
            rotateX: -75,
            opacity: 0,
            transformOrigin: '50% 100%',
        });
        gsap.set('.hero-reveal', { y: 28, opacity: 0 });
        gsap.set('.hero-rule', { scaleX: 0 });
        gsap.set('.platform-card', {
            y: 45,
            rotateX: -35,
            scale: 0.88,
            opacity: 0,
            transformOrigin: '50% 100%',
        });
        gsap.set(btnBgRef.current, { yPercent: 100 });


        if (startTimeline) {
            const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });

            intro
                .to('.hero-rule', {
                    scaleX: 1,
                    duration: 1.1,
                    stagger: 0.12,
                    ease: 'expo.inOut',
                }, '<')
                .to(splitTop.chars, {
                    yPercent: 0,
                    rotateX: 0,
                    opacity: 1,
                    duration: 1.05,
                    stagger: 0.035,
                }, '-=0.82')
                .to(splitBottom.chars, {
                    yPercent: 0,
                    rotateX: 0,
                    opacity: 1,
                    duration: 1.05,
                    stagger: { each: 0.035, from: 'end' },
                }, '-=0.78')
                .to('.hero-reveal', {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    stagger: 0.08,
                }, '-=0.65')
                .to('.platform-card', {
                    y: 0,
                    rotateX: 0,
                    scale: 1,
                    opacity: 1,
                    duration: 0.85,
                    stagger: 0.1,
                    ease: 'back.out(1.7)',
                }, '-=0.65');
        }

    }, { scope: containerRef, dependencies: [startTimeline] }); // Listens to parent state shifts

    return (
        <section
            ref={containerRef}

            className="relative isolate flex min-h-[760px] w-full items-stretch overflow-hidden bg-[#efede7] pt-24 text-[#0a0a0a] selection:bg-secondary selection:text-white sm:min-h-[780px] lg:h-svh lg:min-h-[760px]"
        >
            <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col px-4 pb-6 sm:pb-8">

                {/* --- TOP META HEADER --- */}
                <div className="hero-reveal flex items-start justify-between gap-5 border-b border-[#0a0a0a]/20 pb-4 opacity-0">
                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] sm:text-xs">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-50" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-secondary" />
                        </span>
                        {data.meta}
                    </div>
                    <p className="max-w-52 text-right text-[9px] font-semibold uppercase leading-relaxed tracking-[0.18em] text-[#0a0a0a]/55 sm:max-w-none sm:text-[10px]">
                        Strategy / Design / Development
                    </p>
                </div>

                {/* --- MAIN CONTENT --- */}
                <div className="relative flex flex-1 flex-col justify-center py-8 sm:py-10">

                    <div className="hero-reveal mb-5 flex items-center gap-3 opacity-0 sm:mb-2">
                        <span className="hero-rule h-px w-10 origin-left bg-[#0a0a0a]" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] sm:text-xs">
                            Independent digital studio
                        </span>
                    </div>

                    <h1
                        className="relative z-10 font-outfit text-[19vw] font-black uppercase leading-[0.73] tracking-[-0.075em] sm:text-[14vw] lg:text-[11.2vw]"
                        aria-label={`${data.heading.top} ${data.heading.bottom}`}
                    >
                        <span className="block overflow-hidden pb-[0.12em]">
                            <span className="hero-word-top block">{data.heading.top}</span>
                        </span>
                        <span className="block overflow-hidden pb-[0.12em] text-right text-secondary">
                            <span className="hero-word-bottom block pr-[0.05em]">{data.heading.bottom}</span>
                        </span>
                    </h1>

                    <div className="relative z-20 mt-5 flex flex-col items-start justify-between gap-6 sm:mt-2 sm:flex-row sm:items-end">
                        <p className="hero-reveal max-w-sm text-xs font-medium uppercase leading-[1.7] tracking-[0.08em] text-[#0a0a0a]/65 opacity-0 sm:text-sm">
                            {data.description}
                        </p>

                        <Link
                            href="#works"
                            ref={btnRef}
                            onMouseEnter={handleBtnEnter}
                            onMouseLeave={handleBtnLeave}
                            className="hero-reveal relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#0a0a0a] text-white opacity-0 shadow-[0_20px_50px_rgba(10,10,10,0.22)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary sm:h-32 sm:w-32 will-change-transform"
                        >
                            <span ref={btnBgRef} className="absolute inset-0 rounded-full bg-secondary" />
                            <span className="relative z-10 max-w-16 text-center text-[9px] font-bold uppercase leading-relaxed tracking-[0.2em] sm:text-[10px]">
                                {data.action}
                            </span>
                            <ArrowUpRight ref={btnIconRef} className="relative z-10 ml-1 h-4 w-4" />
                        </Link>
                    </div>
                </div>

                {/* --- BOTTOM PLATFORMS --- */}
                <div className="hero-reveal border-t border-[#0a0a0a]/20 pt-4 opacity-0 sm:pt-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-sm">
                            <span className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.24em] text-secondary sm:text-[10px]">
                                Your digital ecosystem
                            </span>
                            <p className="font-outfit text-sm font-semibold leading-snug sm:text-base">
                                We manage your brand across every major channel.
                            </p>
                        </div>

                        <div className="grid w-full grid-cols-5 gap-1.5 sm:gap-2 lg:max-w-2xl">
                            {platforms.map((platform) => (
                                <div
                                    key={platform.name}
                                    className="platform-card group flex min-w-0 flex-col items-center justify-center gap-1.5 rounded-xl border border-[#0a0a0a]/10 bg-white px-1 py-2.5 opacity-0 shadow-[0_10px_30px_rgba(10,10,10,0.05)] transition-colors duration-300 hover:border-secondary/40 sm:gap-2 sm:rounded-2xl sm:px-3 sm:py-3 will-change-transform"
                                >
                                    <span className="platform-mark text-[#0a0a0a] text-2xl">
                                        <BrandMark type={platform.type} />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;