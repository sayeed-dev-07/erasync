'use client'
import React, { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ServicesData } from '@/public/data/ServicesData';
import { Layers, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
gsap.config({ force3D: true });

const Services = () => {
    const containerRef = useRef(null);
    const data = ServicesData;

    useGSAP(() => {


        const stackMedia = gsap.matchMedia();

        stackMedia.add('(min-width: 1px)', () => {
            const stackColumn = containerRef.current.querySelector('.services-stack-column');
            const cards = gsap.utils.toArray('.service-card');
            const stackOffset = (index) => {
                const maximumOffset = window.innerWidth < 640 ? 10 : 18;
                return index * Math.min(maximumOffset, window.innerHeight * 0.018);
            };

            gsap.set(cards, {
                yPercent: -50,
                y: (index) => index === 0 ? stackOffset(index) : window.innerHeight,
            });

            const stackTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: stackColumn,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }
            });

            cards.slice(1).forEach((card, index) => {
                stackTimeline.to(card, {
                    y: () => stackOffset(index + 1),
                    duration: 1,
                    ease: 'none',
                });
            });


            stackTimeline.to({}, { duration: 0.5 });
        });

        return () => stackMedia.revert();
    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="services" className="relative w-full bg-foreground text-background pt-24 pb-32 sm:pt-32 sm:pb-40 px-4 sm:px-8 md:px-12 selection:bg-secondary selection:text-white">
            <div className="w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-20">


                <div
                    className="services-stack-column w-full lg:w-1/2 flex flex-col order-2 lg:order-1 relative h-[var(--stack-column-height)]"
                    style={{
                        '--stack-column-height': `calc(100dvh + ${(data.services.length - 1) * 70}vh)`,
                    }}
                >
                    <div className="services-stack relative block sticky top-0 h-dvh">

                        {data.services.map((service, index) => (
                            <div
                                key={service.id}
                                className="service-card absolute inset-x-0 top-1/2 mx-auto bg-foreground text-background border border-background/10 p-4 sm:p-6 lg:p-8 flex flex-col max-w-[600px] shadow-[0_-12px_35px_rgba(0,0,0,0.18)] will-change-transform"
                                style={{
                                    zIndex: index + 1,
                                }}
                            >
                                {/* Top Number Indicator */}
                                <div className="absolute top-6 right-6 sm:top-8 sm:right-8 text-xs font-bold tracking-widest text-background/30 font-outfit z-20">
                                    {service.id}
                                </div>

                                {/* Image Block */}
                                <div className="group w-full h-[clamp(8rem,28dvh,21rem)] rounded-xl overflow-hidden mb-[clamp(0.75rem,2.5dvh,2rem)] relative bg-background/5 z-20 cursor-pointer">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105 "
                                    />

                                </div>

                                {/* Content */}
                                <div className="flex-1 flex flex-col z-20">
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-outfit mb-[clamp(0.5rem,1.5dvh,1rem)] text-background">
                                        {service.title}
                                    </h3>

                                    <p className="text-background/70 text-xs sm:text-sm lg:text-base leading-relaxed font-outfit font-medium mb-[clamp(0.75rem,2.5dvh,2rem)] flex-1">
                                        {service.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap items-center gap-2 mt-auto">
                                        {service.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 rounded-full border border-background/20 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-background/80"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

                {/* --- RIGHT SIDE: Sticky Header Column --- */}

                <div className="w-full lg:w-1/2 relative services-header-trigger z-10 order-1 lg:order-2">

                    <div className="sticky top-32 lg:top-0 lg:h-dvh flex flex-col lg:justify-center">

                        <div className="text-secondary font-bold tracking-[0.2em] text-xs uppercase mb-6 flex items-center gap-3">
                            <Layers className="w-5 h-5" />
                            {data.label}
                        </div>

                        <h2
                            className="services-headline text-5xl md:text-6xl lg:text-7xl font-black font-outfit tracking-tight leading-[1.05] mb-8"
                            dangerouslySetInnerHTML={{ __html: data.headline }}
                        />

                        <p className="text-background/70 font-outfit text-base md:text-lg font-medium leading-relaxed max-w-md">
                            {data.description}
                        </p>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default Services;
