'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

const Preloader = ({ onComplete }) => {
    const containerRef = useRef(null);

    useGSAP(() => {


        const tl = gsap.timeline({
            defaults: { ease: 'power4.inOut' },
            onComplete: () => {
                if (onComplete) onComplete();
            }
        });

        tl.to('.loader-panel', {
            yPercent: -105,
            duration: 1.15,
            stagger: 0.08,
        })

            .set(containerRef.current, { display: 'none' });

    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="pointer-events-none fixed inset-0 z-99999 grid grid-cols-3"
        >
            <div className="loader-panel bg-[#0a0a0a]" />
            <div className="loader-panel bg-[#0a0a0a]" />
            <div className="loader-panel bg-[#0a0a0a]" />
        </div>
    );
};

export default Preloader;