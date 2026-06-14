/* eslint-disable react-hooks/refs */
'use client'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';

gsap.registerPlugin(useGSAP);

const LineAnim = ({ children, className = "" }) => {
    const containerRef = useRef(null);
    const lineRef = useRef(null);

    const { contextSafe } = useGSAP(() => {
        gsap.set(lineRef.current, {
            xPercent: -101
        })
    }, { scope: containerRef });

    const handleMouseEnter = contextSafe(() => {
        gsap.fromTo(lineRef.current,
            { xPercent: -101 },
            { xPercent: 0, duration: 0.4, ease: "power3.out", overwrite: "auto" }
        );
    });

    const handleMouseLeave = contextSafe(() => {
        gsap.to(lineRef.current, {
            xPercent: 101,
            duration: 0.4,
            ease: "power3.inOut",
            overwrite: "auto"
        });
    });

    return (
        <div
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`w-fit overflow-hidden flex flex-col ${className}`}
        >
            {children}

            <div
                ref={lineRef}
                className='w-full h-0.5 bg-current mt-1'

            ></div>
        </div>
    );
};

export default LineAnim;