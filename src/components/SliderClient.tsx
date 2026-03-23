'use client'
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

export type SlideData = {
    id: string;
    title: string;
    subtitle?: string;
    description: string;
    categoryTag: string;
    buttonText: string;
    url: string;
    img: string;
    bg: string;
};

const SliderClient = ({ slides }: { slides: SlideData[] }) => {
    const [current, setCurrent] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const nextSlide = useCallback(() => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }, [slides.length]);

    // Auto-play effect
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide]);

    // Pause auto-play on hover
    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => setIsAutoPlaying(true);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === ' ') {
                e.preventDefault();
                setIsAutoPlaying(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide]);

    if (!slides.length) return null;

    return (
        <div
            className="h-[calc(100vh-80px)] overflow-hidden relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="w-max h-full flex transition-all ease-in-out duration-1000"
                style={{ transform: `translateX(-${current * 100}vw)` }}
            >
                {slides.map((slide) => (
                    <div
                        className={`bg-gradient-to-r ${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row`}
                        key={slide.id}
                    >
                        {/* TEXT CONTAINER */}
                        <div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center px-8">
                            {slide.categoryTag && (
                                <span className="text-sm font-semibold tracking-wider uppercase text-white/80 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm">
                                    {slide.categoryTag}
                                </span>
                            )}
                            <h2 className="text-xl lg:text-3xl 2xl:text-5xl text-white/90">
                                {slide.description}
                            </h2>
                            <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold text-white whitespace-pre-line">
                                {slide.title}
                            </h1>
                            {slide.subtitle && (
                                <p className="text-2xl lg:text-3xl font-bold text-yellow-300">
                                    {slide.subtitle}
                                </p>
                            )}
                            <Link href={slide.url || "/"}>
                                <button className="rounded-md bg-black text-white py-3 px-8 font-semibold hover:bg-gray-900 transition-all duration-300 hover:scale-105">
                                    {slide.buttonText || "SHOP NOW"}
                                </button>
                            </Link>
                        </div>
                        {/* IMAGE CONTAINER */}
                        <div className="h-1/2 xl:w-1/2 xl:h-full relative">
                            <Image
                                src={slide.img}
                                alt={slide.title}
                                fill
                                sizes="100%"
                                className="object-cover"
                                priority={slides.indexOf(slide) === 0}
                            />
                        </div>
                    </div>
                ))}
            </div>
            {/* Slide indicators */}
            <div className="absolute m-auto left-1/2 -translate-x-1/2 bottom-8 flex gap-4 z-10">
                {slides.map((slide, index) => (
                    <div
                        className={`w-3 h-3 rounded-full ring-1 ring-white cursor-pointer flex items-center justify-center transition-all duration-300 ${current === index ? "scale-150" : "opacity-60"
                            }`}
                        key={slide.id}
                        onClick={() => setCurrent(index)}
                    >
                        {current === index && (
                            <div className="w-[6px] h-[6px] bg-white rounded-full" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SliderClient;
