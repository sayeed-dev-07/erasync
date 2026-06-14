'use client'
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WorksData } from '@/public/data/WorksData';
import { Briefcase, ArrowUpRight } from 'lucide-react';
import MergeButton from '../global/MergeButton';
import LineAnim from '../global/LineAnim';

gsap.registerPlugin(useGSAP, ScrollTrigger);
gsap.config({ force3D: true });

const Works = () => {
    const containerRef = useRef(null);
    const data = WorksData;

    useGSAP(() => {
        const rightPanels = gsap.utils.toArray('.right-project-panel');
        const leftTitles = gsap.utils.toArray('.left-dynamic-title');

        // Initial setup for titles
        gsap.set(leftTitles, { opacity: 0, y: 20 });
        gsap.set(leftTitles[0], { opacity: 1, y: 0 });

        rightPanels.forEach((panel, index) => {
            // 1. Sticky Title Swap Animation
            ScrollTrigger.create({
                trigger: panel,
                start: "top 80%",
                end: "bottom 20%",
                onToggle: (self) => {
                    if (self.isActive) {
                        gsap.to(leftTitles, {
                            opacity: 0,
                            y: -20,
                            duration: 0.3,
                            ease: "power2.in",
                            overwrite: "auto"
                        });

                        gsap.fromTo(leftTitles[index],
                            { opacity: 0, y: 20 },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.4,
                                delay: 0.15,
                                ease: "power2.out",
                                overwrite: "auto"
                            }
                        );
                    }
                }
            });


            const imageContainer = panel.querySelector('.image-reveal-container');
            const overlay = panel.querySelector('.reveal-overlay');

            if (overlay && imageContainer) {
                gsap.fromTo(overlay,
                    {
                        yPercent: 0,
                        skewY: 0
                    },
                    {
                        yPercent: -120,
                        skewY: -6,
                        duration: 1.2,
                        ease: "power4.inOut",
                        scrollTrigger: {
                            trigger: imageContainer,
                            start: "top 85%",

                        }
                    }
                );
            }
        });
    }, { scope: containerRef });

    return (

        <section ref={containerRef} id="works" className="relative w-full bg-foreground text-background pt-24 pb-32 sm:pt-32 sm:pb-40 px-4 sm:px-8 md:px-12 selection:bg-secondary selection:text-foreground">
            <div className="w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 relative ">

                {/* --- LEFT SIDE: Sticky  Column --- */}
                <div className="hidden lg:block w-1.5/3 relative">
                    <div className="sticky top-32 flex flex-col h-[calc(100vh-12rem)]  justify-between pb-12">

                        <div>
                            <div className="text-secondary font-bold tracking-[0.2em] text-xs uppercase mb-6 flex items-center gap-2">
                                <span className="w-8 h-px bg-secondary"></span>
                                {data.label}
                            </div>
                            <h2
                                className="text-4xl xl:text-5xl font-black font-outfit lg:max-w-150  xl:max-w-200 w-full tracking-tight leading-[1.1] mb-6"
                                dangerouslySetInnerHTML={{ __html: data.headline }}
                            />

                            <p className="text-background/60 text-sm font-medium leading-relaxed max-w-xs">
                                {data.subheadline}
                            </p>
                        </div>

                        <div className="relative h-24 mt-auto">

                            <p className="text-[10px] font-bold tracking-widest text-background/40 uppercase mb-2">
                                Currently Viewing
                            </p>
                            {data.projects.map((project, index) => (
                                <div key={index} className="left-dynamic-title absolute top-6 left-0 w-full pointer-events-none">

                                    <h3 className="text-3xl font-black font-outfit text-background">
                                        {project.title}
                                    </h3>
                                    <span className="text-xs font-semibold text-secondary uppercase tracking-widest mt-1 block">
                                        {project.tagline}
                                    </span>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                {/* --- RIGHT SIDE: Scrolling Project  --- */}
                <div className="w-full  lg:w-2/3 flex flex-col ">

                    <div className="block lg:hidden mb-16">
                        <div className="text-secondary font-bold tracking-[0.2em] text-xs uppercase mb-4 flex items-center gap-2">
                            <span className="w-6 h-px bg-secondary"></span>
                            {data.label}
                        </div>
                        <h2
                            className="text-4xl font-black font-outfit tracking-tight leading-[1.1]"
                            dangerouslySetInnerHTML={{ __html: data.headline }}
                        />
                    </div>

                    {data.projects.map((project, index) => (
                        <div
                            key={`project-panel-${index}`}
                            className={`right-project-panel flex flex-col ${index !== data.projects.length - 1 ? 'mb-32 lg:mb-[30vh]' : 'mb-0'}`}
                        >
                            <div className="block lg:hidden mb-6">
                                <h3 className="text-3xl font-black font-outfit">{project.title}</h3>
                                <span className="text-xs font-semibold text-secondary uppercase tracking-widest mt-1 block">
                                    {project.tagline}
                                </span>
                            </div>


                            <Link href={project.link} target='_blank' className="image-reveal-container group relative w-full aspect-4/3 sm:aspect-video  overflow-hidden bg-background/5 mb-8 sm:mb-12 block">


                                <div className="reveal-overlay absolute inset-0 bg-secondary z-30 pointer-events-none"></div>

                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority={index === 0}
                                />

                                <div className="absolute z-20 inset-0 bg-foreground/0 lg:group-hover:bg-foreground/20 transition-colors duration-500 flex items-start justify-end p-4 sm:p-6 lg:p-0 lg:items-center lg:justify-center pointer-events-none ">
                                    <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-secondary text-background flex items-center justify-center shadow-xl lg:shadow-none opacity-100 scale-100 lg:opacity-0 lg:scale-50 lg:group-hover:opacity-100 lg:group-hover:scale-100 transition-all duration-500 ease-out">
                                        <ArrowUpRight className="w-5 h-5 lg:w-6 lg:h-6 text-foreground" />
                                    </div>
                                </div>
                            </Link>

                            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
                                <div className="w-full sm:w-2/3">

                                    <p className="text-background/80 text-base sm:text-lg leading-relaxed font-medium">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="w-full sm:w-1/3 flex flex-col gap-4">

                                    <h4 className="text-[10px] font-bold text-background/40 uppercase tracking-widest border-b border-background/10 pb-2">
                                        Deliverables
                                    </h4>
                                    <ul className="flex flex-col gap-2">

                                        {project.deliverables.map((del, i) => {
                                            return <LineAnim key={i}>
                                                <li className="text-xs font-semibold text-background uppercase tracking-wider">
                                                    {del}
                                                </li>
                                            </LineAnim>
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

            </div>

            {/* --- FOOTER BUTTON --- */}
            <div className="w-full max-w-7xl mx-auto mt-24 lg:mt-32 flex justify-center">
                <MergeButton link={data.footerButton.link} text={data.footerButton.text} />
            </div>
        </section>
    );
};

export default Works;