/* eslint-disable react-hooks/refs */
'use client'
import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const MagneticButton = ({ href, text, className = "" }) => {
    const buttonRef = useRef(null);
    const textRef = useRef(null);
    const bgRef = useRef(null);
    
    // contextSafe ensures our mouse events are properly cleaned up by GSAP
    const { contextSafe } = useGSAP({ scope: buttonRef });

    const handleMouseMove = contextSafe((e) => {
        // Calculate the physical dimensions and position of the button
        const { clientX, clientY } = e;
        const { height, width, left, top } = buttonRef.current.getBoundingClientRect();
        
        // Calculate how far the mouse is from the absolute center of the button
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        // Move the button towards the mouse (0.3 is the magnetic pull strength)
        gsap.to(buttonRef.current, { 
            x: x * 0.3, 
            y: y * 0.3, 
            duration: 1, 
            ease: "power3.out", 
            overwrite: "auto" 
        });
        
        // Move the text slightly MORE than the button to create a 3D parallax effect
        gsap.to(textRef.current, { 
            x: x * 0.2, 
            y: y * 0.2, 
            duration: 1, 
            ease: "power3.out", 
            overwrite: "auto" 
        });
    });

    const handleMouseLeave = contextSafe(() => {
        // Snap everything back to center with a nice elastic bounce
        gsap.to(buttonRef.current, { 
            x: 0, 
            y: 0, 
            duration: 1, 
            ease: "elastic.out(1, 0.3)", 
            overwrite: "auto" 
        });
        
        gsap.to(textRef.current, { 
            x: 0, 
            y: 0, 
            duration: 1, 
            ease: "elastic.out(1, 0.3)", 
            overwrite: "auto" 
        });
    });

    return (
        <Link 
            href={href}
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            // The main wrapper. Note we pass the className prop here so you can position it from the Hero component.
            className={`group relative flex items-center justify-center rounded-full cursor-pointer overflow-hidden ${className}`}
        >
            {/* The default solid border that scales out on hover */}
            <div className="absolute inset-0 rounded-full border border-background transition-transform duration-500 ease-out group-hover:scale-110 group-hover:opacity-0 pointer-events-none"></div>
            
            {/* The colored background that scales up from a tiny dot in the center */}
            <div 
                ref={bgRef}
                className="absolute inset-0 rounded-full bg-secondary scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.83,0,0.17,1)] pointer-events-none"
            ></div>

            {/* The Text */}
            <span 
                ref={textRef} 
                className="relative z-10 text-[10px] sm:text-xs font-bold tracking-widest text-center w-2/3 text-background transition-colors duration-300 pointer-events-none"
            >
                {text}
            </span>
        </Link>
    );
};

export default MagneticButton;