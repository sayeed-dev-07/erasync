'use client'
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Phone, Mail } from 'lucide-react';
import MergeButton from '../global/MergeButton';

gsap.registerPlugin(ScrollTrigger, useGSAP, SplitText);

gsap.config({
    force3D: true
});

const Contact = () => {
    const textRef = useRef(null);
    const containerRef = useRef(null);
    const bottomDockRef = useRef(null);

    useGSAP(() => {
        document.fonts.ready.then(() => {
            // 1. Smooth Text Reveal Engine
            const splitText = new SplitText(textRef.current, {
                type: 'lines, words',
                linesClass: 'overflow-hidden pb-2',
            });

            gsap.from(splitText.words, {
                yPercent: 120,
                duration: 1.2,
                stagger: 0.04,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: textRef.current,
                    start: 'top 85%',
                }
            });

            // 2. Animated Top Border Line
            // Slides in from -translate-x-full (left) to its resting place
            gsap.from('.dock-border', {
                xPercent: -101,
                duration: 1.5,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: bottomDockRef.current,
                    start: 'top 90%',
                }
            });

            // 3. Bottom Contact Buttons Reveal
            gsap.from('.contact-btn-item', {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out',
                delay: 0.2, // Small delay so the line starts drawing just before the buttons pop up
                scrollTrigger: {
                    trigger: bottomDockRef.current,
                    start: 'top 90%',
                }
            });

            return () => splitText.revert();
        });
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            id='contact'
            className='relative w-full min-h-[80vh] bg-foreground text-background flex flex-col justify-between pt-32 pb-16 px-4 sm:px-8 md:px-12 selection:bg-secondary selection:text-white'
        >

            {/* Top Label */}
            <div className="max-w-[1600px] mx-auto w-full mb-16">
                <div className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase opacity-60">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    Contact Us
                </div>
            </div>


            <div className='max-w-[1600px] mx-auto w-full flex-1 flex flex-col justify-center mb-10 lg:mb-14'>
                <h1
                    ref={textRef}
                    className='text-[12vw] lg:text-[10vw] leading-[0.9] uppercase font-black font-outfit tracking-tighter will-change-transform'
                >
                    Let&apos;s have a conversation
                </h1>
            </div>

            {/* Bottom Contact Dock */}
            <div
                ref={bottomDockRef}

                className='relative max-w-[1600px] mx-auto w-full pt-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12'
            >
                {/* 
                    Custom Animated Top Line 
                    The outer div masks the overflow, the inner div handles the actual sliding motion 
                */}
                <div className="absolute top-0 left-0 w-full h-[1px] overflow-hidden">
                    <div className="dock-border w-full h-full bg-background/20"></div>
                </div>

                {/* Left Side: Call and Email */}
                <div className="flex flex-col sm:flex-row gap-10 sm:gap-16">

                    {/* Call Us Block */}
                    <div className="contact-btn-item flex items-center gap-5 group">
                        <div className="w-14 h-14 shrink-0 rounded-2xl border border-background/20 flex items-center justify-center group-hover:bg-background group-hover:text-foreground transition-colors duration-500 shadow-sm">
                            <Phone className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-background/50 font-bold uppercase tracking-widest mb-1.5">
                                Call Us
                            </span>
                            <a href="tel:+12149006362" className="text-lg sm:text-xl font-medium tracking-wide hover:text-secondary transition-colors duration-300">
                                +1 (214) 900-6362
                            </a>
                        </div>
                    </div>

                    {/* Email Us Block */}
                    <div className="contact-btn-item flex items-center gap-5 group">
                        <div className="w-14 h-14 shrink-0 rounded-2xl border border-background/20 flex items-center justify-center group-hover:bg-background group-hover:text-foreground transition-colors duration-500 shadow-sm">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-background/50 font-bold uppercase tracking-widest mb-1.5">
                                Email Us
                            </span>
                            <a href="mailto:contact@erasync.us" className="text-lg sm:text-xl font-medium tracking-wide hover:text-secondary transition-colors duration-300">
                                contact@erasync.us
                            </a>
                        </div>
                    </div>

                </div>

                {/* Right Side: Primary CTA */}
                <div className="contact-btn-item w-full sm:w-auto">
                    <MergeButton link={'https://cal.com/erasync.us/project-discussion?user=erasync.us&month=2026-07'} text={'Book a Meeting'} />
                </div>

            </div>

        </section>
    );
};

export default Contact;