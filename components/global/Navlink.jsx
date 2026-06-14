'use client'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import React, { useRef } from 'react';

gsap.registerPlugin(useGSAP);

gsap.config({
    force3D: true
})

const Navlink = ({ name = "Link", to, black = true }) => {
    const containerRef = useRef(null);

    const { contextSafe } = useGSAP({ scope: containerRef });

    const handleMouseEnter = contextSafe(() => {
        gsap.to('.text-layer', {
            yPercent: -100,
            duration: 0.45,
            ease: 'power2.out',
            overwrite: 'auto'
        });
    });

    const handleMouseLeave = contextSafe(() => {
        gsap.to('.text-layer', {
            yPercent: 0,
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto'
        });
    });

    return (
        <Link href={to}
            ref={containerRef}
            onPointerEnter={handleMouseEnter}
            onPointerLeave={handleMouseLeave}
            // 1. Added 'block'
            // 2. Removed 'flex items-center'
            // 3. Changed 'h-7' to 'h-8'
            className={`block relative overflow-hidden h-8 text-lg ${black ? 'text-background/70 w-fit' : 'text-foreground'} capitalize font-outfit cursor-pointer select-none`}
        >
            {/* Changed leading-7 to leading-8 */}
            <span className='text-layer block h-full leading-8 transition-colors duration-200 hover:text-background'>
                {name}
            </span>

            {/* Changed leading-7 to leading-8 */}
            <span className={`text-layer absolute top-full left-0 block h-full leading-8 ${black ? 'text-secondary ' : 'left-[50%]  -translate-x-1/2 sm:left-0 sm:translate-x-0'}`} aria-hidden="true">
                {name}
            </span>
        </Link>
    );
};

export default Navlink;