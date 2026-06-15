/* eslint-disable react-hooks/refs */
'use client'
import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';

const MergeButton = ({ text, link }) => {
    const containerRef = useRef(null);
    const pillRef = useRef(null);
    const circleRef = useRef(null);
    const iconRef = useRef(null);

    const { contextSafe } = useGSAP({ scope: containerRef });

    const handleMouseEnter = contextSafe(() => {
        gsap.to(containerRef.current, {
            gap: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.6)", // This elastic ease creates the jelly "wobble"
            overwrite: "auto"
        });


        gsap.to(pillRef.current, {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto"
        });


        gsap.to(circleRef.current, {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto"
        });


        gsap.to(iconRef.current, {
            x: 4,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto"
        });
    });

    const handleMouseLeave = contextSafe(() => {

        gsap.to(containerRef.current, {
            gap: "0.5rem",
            duration: 0.5,
            ease: "elastic.out(1, 0.6)",
            overwrite: "auto"
        });


        gsap.to(pillRef.current, {
            borderTopRightRadius: "9999px",
            borderBottomRightRadius: "9999px",
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
        });

        gsap.to(circleRef.current, {
            borderTopLeftRadius: "9999px",
            borderBottomLeftRadius: "9999px",
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
        });

        gsap.to(iconRef.current, {
            x: 0,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto"
        });
    });

    return (
        <Link
            href={link}
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            target='_blank'
            className="flex items-center gap-2 w-max cursor-pointer group"
        >
            {/* --- MAIN TEXT PILL --- */}
            <div
                ref={pillRef}
                className="bg-secondary text-white h-14 px-8 flex items-center justify-center transition-transform duration-300 active:scale-95"
                style={{
                    borderTopLeftRadius: '9999px', borderBottomLeftRadius: '9999px',
                    borderTopRightRadius: '9999px', borderBottomRightRadius: '9999px'
                }}
            >
                <span className="font-bold tracking-widest text-xs uppercase pt-0.5 pointer-events-none">
                    {text}
                </span>
            </div>

            {/* --- ARROW CIRCLE --- */}
            <div
                ref={circleRef}
                className="bg-secondary text-white w-14 h-14 shrink-0 flex items-center justify-center relative transition-transform duration-300 active:scale-95"
                style={{
                    borderTopLeftRadius: '9999px', borderBottomLeftRadius: '9999px',
                    borderTopRightRadius: '9999px', borderBottomRightRadius: '9999px'
                }}
            >
                <ArrowRight ref={iconRef} className="w-5 h-5 pointer-events-none" />
            </div>
        </Link>
    );
};

export default MergeButton;