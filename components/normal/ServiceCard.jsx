'use client'
import React from 'react';
import Image from 'next/image';
import { ServicesData } from '@/public/data/ServicesData';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, ArrowUpRight } from 'lucide-react';
import AnimatedButton from '../global/AnimatedButton';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Reusable Editorial Card Component
const ServiceCard = ({ service }) => {
    return (

        <div className="flex flex-col lg:flex-row w-full border-t border-current/20 group">

            {/* --- LEFT SIDE: Content --- */}
            <div className="w-full lg:w-1/2 flex flex-col py-10 lg:py-16 pr-0 lg:pr-16">

                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 lg:mb-20">
                    <div className="flex items-start sm:items-start gap-6 lg:gap-10">
                        <span className="text-sm font-semibold tracking-widest mt-1.5 sm:mt-3  opacity-40 border-b-2 border-secondary pb-1">
                            {service.id}
                        </span>
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-outfit text-secondary tracking-tight">
                            {service.title}
                        </h3>
                    </div>

                    {/* Tags  */}
                    <div className="flex items-start gap-2">
                        {service.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-current/20 wrap-break-word rounded-md opacity-60 bg-current/5"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Indented Description & Button */}
                <div className="w-full lg:w-[80%] ml-auto mt-auto flex flex-col items-start lg:items-end text-left lg:text-right">
                    <p className="text-base sm:text-lg opacity-80 leading-relaxed font-medium mb-10 text-left">
                        {service.description}
                    </p>

                    <AnimatedButton href='#' text='View More' />
                </div>
            </div>

            {/* --- RIGHT SIDE --- */}

            <div className="w-full lg:w-1/2 relative h-[300px] sm:h-[400px] lg:h-auto overflow-hidden">
                <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    loading='lazy'
                    className="object-cover"
                />
            </div>
        </div>
    );
};

export default ServiceCard;