'use client'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import React, { useRef } from 'react';
import { useLenis } from 'lenis/react';

gsap.registerPlugin(useGSAP);
gsap.config({ force3D: true });

const Navlink = ({ name = "Link", to, black = true }) => {
    const containerRef = useRef(null);
    const { contextSafe } = useGSAP({ scope: containerRef });
    const lenis = useLenis();

    const handleScroll = (e) => {
        if (to.startsWith('#')) {
            e.preventDefault();
            const target = to === '#' ? '#hero' : to;

            if (lenis) {
                lenis.scrollTo(target);
            } else {
                const element = document.querySelector(target);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    };


    const handleMouseEnter = contextSafe((e) => {

        if (e.pointerType !== 'mouse') return;

        gsap.to('.text-layer', {
            yPercent: -100,
            duration: 0.45,
            ease: 'power2.out',
            overwrite: 'auto'
        });
    });


    const handleMouseLeave = contextSafe((e) => {

        if (e.pointerType !== 'mouse') return;

        gsap.to('.text-layer', {
            yPercent: 0,
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto'
        });
    });

    return (
        <Link
            href={to}
            ref={containerRef}
            onClick={handleScroll}
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
            className={`block relative overflow-hidden h-8 text-lg ${black ? 'text-background/70 w-fit' : 'text-foreground'} capitalize font-outfit cursor-pointer`}
        >
            <span className='text-layer block h-full leading-8 '>
                {name}
            </span>

            <span className={`text-layer absolute top-full left-0 block h-full leading-8 ${black ? 'text-secondary ' : 'left-[50%]  -translate-x-1/2 sm:left-0 sm:translate-x-0'}`} aria-hidden="true">
                {name}
            </span>
        </Link>
    );
};

export default Navlink;