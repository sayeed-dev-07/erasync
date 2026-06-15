/* eslint-disable react-hooks/refs */
'use client';

import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react'; // Ensure lucide-react is installed
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// Register the premium GSAP logic for better mobile compatibility
gsap.registerPlugin(useGSAP);
gsap.config({ force3D: true });

const AnimatedButton = ({ text = "View More", href = "#" }) => {
    const containerRef = useRef(null);
    const bgRef = useRef(null);
    const textRef = useRef(null);
    const iconRef = useRef(null);

    // contextSafe ensures our handlers can safely call GSAP logic
    const { contextSafe } = useGSAP({ scope: containerRef });

    // Initial state setup: Ensure everything starts in its correct hidden position
    useGSAP(() => {
        // Set the black background layer to start completely to the left
        gsap.set(bgRef.current, { xPercent: -101 });
        // Ensure the container starts centered/normal scale
        gsap.set(containerRef.current, { scale: 1 });
        // Arrow starts normal rotation
        gsap.set(iconRef.current, { rotate: 0, scale: 1 });
        // Main text starts normal foreground color
        gsap.set(textRef.current, { color: 'currentcolor' });
    }, { scope: containerRef });

    // --- Hover/Enter Handler ---
    const handleMouseEnter = contextSafe(() => {
        // Overwrite ensures any playing animations (like from previous leave) are seamlessly canceled

        // 1. Scale the entire button up slightly
        gsap.to(containerRef.current, {
            scale: 1.05,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto"
        });

        // 2. Slide the black background layer to 0 (fills the button)
        gsap.to(bgRef.current, {
            xPercent: 0,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto"
        });

        // 3. Change text color to foreground (which contrasts against the new black background)
        // Ensure var(--background) is correctly defined in your CSS/Tailwind config
        gsap.to(textRef.current, {
            color: 'var(--foreground)', // Adjust variable name if necessary
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto"
        });

        // 4. Rotate and scale the icon
        gsap.to(iconRef.current, {
            rotate: 45,
            scale: 1.1,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto"
        });
    });

    // --- Mouse Leave/Out Handler (Smoothly reverses all effects) ---
    const handleMouseLeave = contextSafe(() => {
        gsap.to(containerRef.current, {
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto"
        });

        // Slide the background fill back LEFT out of view
        gsap.to(bgRef.current, {
            xPercent: -101,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto"
        });

        gsap.to(textRef.current, {
            color: 'currentcolor',
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto"
        });

        gsap.to(iconRef.current, {
            rotate: 0,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto"
        });
    });

    return (
        <a
            href={href}
            ref={containerRef}

            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative  flex items-center gap-3 px-6 py-3 rounded-full border border-current/30 text-xs font-bold uppercase tracking-widest overflow-hidden cursor-pointer selection:bg-background selection:text-foreground will-change-transform focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
        >
            {/* 1. The Background Fill Layer (Animated with GSAP) */}
            <span
                ref={bgRef}
                className="absolute inset-0 z-0 rounded-full bg-[#0a0a0a]"
            />

            {/* 2. Text Content Layer */}
            <span ref={textRef} className="relative flex items-center justify-center gap-2 z-10 font-medium">
                {text}

                <ArrowUpRight
                    ref={iconRef}
                    className="relative z-10 h-4 w-4"
                />
            </span>

            {/* 3. Icon Layer */}

        </a>
    );
};

export default AnimatedButton;