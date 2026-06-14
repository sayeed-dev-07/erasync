'use client'
import { NavbarData } from '@/public/data/NavbarData';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import Navlink from '../global/Navlink';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(useGSAP, ScrollTrigger);

const Navbar = () => {
    const data = NavbarData;
    const [isOpen, setIsOpen] = useState(false);
    const isOpenRef = useRef(isOpen);
    useEffect(() => {
        isOpenRef.current = isOpen;
    }, [isOpen]);

    const containerRef = useRef(null);
    const menuRef = useRef(null);
    const menuLinksRef = useRef([]);

    const lineTop = useRef(null);
    const lineMiddle = useRef(null);
    const lineBottom = useRef(null);

    const toggleMenu = () => setIsOpen(prev => !prev);

    useGSAP(() => {
        // --- 1. Hamburger Button Micro-Animations ---
        if (isOpen) {
            gsap.to(lineTop.current, { y: 7, rotate: 45, duration: 0.3, ease: 'power2.out' });
            gsap.to(lineMiddle.current, { opacity: 0, x: -10, duration: 0.2, ease: 'power2.out' });
            gsap.to(lineBottom.current, { y: -7, rotate: -45, duration: 0.3, ease: 'power2.out' });

            // --- 2. Mobile Menu Animation ---
            gsap.fromTo(menuRef.current,
                { xPercent: -100, skewX: 10, transformOrigin: "top left" },
                { xPercent: 0, skewX: 0, duration: 0.5, ease: 'power3.out', visibility: 'visible' }
            );

            if (menuLinksRef.current.length > 0) {
                gsap.fromTo(menuLinksRef.current,
                    { opacity: 0, x: -20 },
                    { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.2 }
                );
            }
        } else {
            gsap.to(lineTop.current, { y: 0, rotate: 0, duration: 0.3, ease: 'power2.out' });
            gsap.to(lineMiddle.current, { opacity: 1, x: 0, duration: 0.2, ease: 'power2.out' });
            gsap.to(lineBottom.current, { y: 0, rotate: 0, duration: 0.3, ease: 'power2.out' });

            gsap.to(menuRef.current, {
                xPercent: -100,
                skewX: -8,
                duration: 0.4,
                ease: 'power3.inIn',
                onComplete: () => {
                    gsap.set(menuRef.current, { visibility: 'hidden' });
                }
            });
        }
    }, { dependencies: [isOpen], scope: containerRef });

    // --- 3. Smart Hide/Show on Scroll ---
    useGSAP(() => {
        const showAnim = gsap.from(containerRef.current, {
            yPercent: -100,
            paused: true,
            duration: 0.4,
            ease: "power3.out"
        }).progress(1);

        ScrollTrigger.create({
            start: "top top",
            end: "max",
            onUpdate: (self) => {

                if (isOpenRef.current) return;

                if (self.direction === -1) {
                    showAnim.play();
                } else if (self.direction === 1 && self.scroll() > 100) {
                    showAnim.reverse();
                }
            }
        });
    });

    return (

        <div ref={containerRef} className="fixed top-0 left-0 w-full z-50 transition-colors bg-foreground duration-300 ">

            {/* Main Navbar Bar */}
            <div className='flex items-center justify-between  text-background py-4 bg-foreground px-4 sm:px-6 relative z-50'>
                <Link href={'/'} className='block w-28 sm:w-36 md:w-40 aspect-3/1 relative select-none'>
                    <Image
                        src={data.logo.link}
                        fill
                        className='object-cover'
                        loading='eager'
                        sizes='(max-width: 640px) 112px, (max-width: 768px) 144px, 160px'
                        alt={data.logo.alt || "Company Logo"}
                    />
                </Link>

                <div className='hidden lg:flex items-center justify-center gap-x-6'>
                    {data.navlinks.map((item, index) => (
                        <Navlink key={index} to={item.link} name={item.text} />
                    ))}
                </div>

                <div className="flex items-center gap-x-4">
                    <div className='hidden sm:flex px-4 py-2 border border-background rounded-full font-semibold bg-background transition-transform duration-200 active:scale-95'>
                        <Navlink black={false} name={data.button.text} to={data.button.link} />
                    </div>

                    <button
                        onClick={toggleMenu}
                        className="lg:hidden flex flex-col justify-between w-6 h-4 cursor-pointer focus:outline-none select-none relative z-50"
                        aria-label="Toggle Navigation Menu"
                    >
                        <span ref={lineTop} className="w-full h-0.5 bg-background block rounded transform origin-center"></span>
                        <span ref={lineMiddle} className="w-full h-0.5 bg-background block rounded"></span>
                        <span ref={lineBottom} className="w-full h-0.5 bg-background block rounded transform origin-center"></span>
                    </button>
                </div>
            </div>


            <div
                ref={menuRef}
                className="invisible fixed top-0 left-0 w-4/5 max-w-sm h-svh bg-foreground border-r border-background/20 shadow-2xl z-40 px-6 pt-24 pb-8 flex flex-col justify-between"
                style={{ willChange: 'transform' }}
            >
                <div className="flex flex-col gap-y-3 py-[5%]">
                    {data.navlinks.map((item, index) => (
                        <div key={index} ref={el => (menuLinksRef.current[index] = el)} onClick={() => setIsOpen(false)}>
                            <Navlink to={item.link} name={item.text} />
                        </div>
                    ))}
                </div>
                <div ref={el => (menuLinksRef.current[data.navlinks.length] = el)} className="sm:hidden w-full text-center py-3 border border-background px-3 rounded-full font-semibold bg-background">
                    <Navlink black={false} name={data.button.text} to={data.button.link} />
                </div>
            </div>

            {isOpen && (
                <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/40 z-30 lg:hidden backdrop-blur-xs transition-opacity duration-300" />
            )}
        </div>
    );
};

export default Navbar;