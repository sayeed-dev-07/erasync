'use client'
import { ServicesData } from '@/public/data/ServicesData';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers } from 'lucide-react';
import React from 'react';
import ServiceCard from '../normal/ServiceCard';
gsap.registerPlugin(useGSAP, ScrollTrigger)

const Services = () => {
    const data = ServicesData
    return (
        <div className='py-[5%] max-w-[1600px] mx-auto px-4 flex flex-col gap-y-12'>
            <div className=" flex flex-col lg:justify-center">

                <div className="text-secondary font-bold tracking-[0.2em] text-xs uppercase mb-6 flex items-center gap-3">
                    <Layers className="w-5 h-5" />
                    {data.label}
                </div>

                <h2
                    className="services-headline text-5xl md:text-6xl lg:text-7xl font-black font-outfit tracking-tight leading-[1.05] mb-8"
                    dangerouslySetInnerHTML={{ __html: data.headline }}
                />

                <p className="text-background/70 font-outfit text-base md:text-lg font-medium leading-relaxed max-w-md">
                    {data.description}
                </p>

            </div>

            {/* cards here  */}

            <div className="flex flex-col w-full border-b border-current/20">
                {data.services.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>

        </div>
    );
};

export default Services;