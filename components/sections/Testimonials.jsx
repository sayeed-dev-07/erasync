'use client'
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { TestimonialsData } from '@/public/data/TestimonialsData';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(useGSAP);

gsap.config({
    force3D: true
})

const Testimonials = () => {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const cardRefs = useRef([]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const data = TestimonialsData;
    const totalItems = data.testimonials.length;

    useGSAP(() => {
        if (!cardRefs.current[currentIndex] || !trackRef.current) return;


        const targetOffset = cardRefs.current[currentIndex].offsetLeft;

        gsap.to(trackRef.current, {
            x: -targetOffset,
            duration: 0.8,
            ease: "power4.out",
            overwrite: "auto"
        });


        const progress = (currentIndex + 1) / totalItems;
        gsap.to('.progress-fill', {
            scaleX: progress,
            duration: 0.8,
            ease: "power3.out",
            transformOrigin: "left center",
            overwrite: "auto"
        });

    }, { scope: containerRef, dependencies: [currentIndex] });


    const handleNext = () => {
        if (currentIndex < totalItems - 1) setCurrentIndex(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    };

    return (
        <section ref={containerRef} id="testimonials" className="relative w-full bg-background text-foreground py-24 sm:py-32 overflow-hidden selection:bg-secondary selection:text-white">
            <div className="w-full max-w-[1600px] mx-auto flex flex-col  gap-y-[5%]  relative px-4 sm:px-8 md:px-12">

                {/* --- LEFT SIDE --- */}
                <div className="w-full    z-20">
                    <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-secondary mb-6">
                        <span className="w-2 h-2 rounded-sm bg-secondary outline outline-offset-2 outline-secondary/30"></span>
                        {data.label}
                    </div>

                    <h2
                        className="text-4xl sm:text-5xl md:text-6xl font-black font-outfit tracking-tight leading-[1.1] mb-6"
                        dangerouslySetInnerHTML={{ __html: data.headline }}
                    />
                </div>

                {/* --- RIGHT SIDE --- */}
                <div className="w-full  flex flex-col">


                    <div className="relative w-full h-[450px] sm:h-[550px]">
                        <div ref={trackRef} className="flex gap-6 sm:gap-8 w-max absolute left-0 h-full items-center">

                            {data.testimonials.map((testimonial, index) => (

                                <div
                                    key={testimonial.id}
                                    ref={el => cardRefs.current[index] = el}

                                    className="relative w-[300px] h-[400px] sm:w-[380px] sm:h-[500px] shrink-0 overflow-hidden border border-foreground/10 bg-foreground/5 shadow-xl group"
                                >
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />


                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>


                                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col justify-end text-white z-10">
                                        <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-secondary mb-4 opacity-50" />

                                        <p className="text-sm sm:text-base leading-relaxed font-medium mb-6 line-clamp-4">
                                            &quot;{testimonial.quote}&quot;
                                        </p>

                                        <div className="border-t border-white/20 pt-4 flex flex-col">
                                            <span className="font-bold text-lg font-outfit">
                                                {testimonial.name}
                                            </span>
                                            <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
                                                {testimonial.role}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- BOTTOM CONTROLS --- */}
                    <div className="flex items-center justify-between w-full mt-8 sm:mt-12 pt-8">

                        {/* Progress Line */}
                        <div className="flex-1 mr-8 sm:mr-16 h-px bg-foreground/10 relative overflow-hidden">
                            <div className="progress-fill absolute top-0 left-0 w-full h-full bg-secondary origin-left scale-x-0"></div>
                        </div>

                        {/* Navigation Arrows */}
                        <div className="flex items-center gap-4 shrink-0">
                            <button
                                onClick={handlePrev}
                                disabled={currentIndex === 0}
                                aria-label="Previous testimonial"
                                className="w-12 h-12 cursor-pointer rounded-full border border-foreground/20 flex items-center justify-center transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background active:scale-90 disabled:opacity-30 disabled:pointer-events-none"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={currentIndex === totalItems - 1}
                                aria-label="Next testimonial"
                                className="w-12 h-12 rounded-full border border-foreground/20 cursor-pointer flex items-center justify-center transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background active:scale-90 disabled:opacity-30 disabled:pointer-events-none"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default Testimonials;