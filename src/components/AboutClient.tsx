"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SiTypescript, SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiOpenai, SiPostgresql } from 'react-icons/si';

export default function AboutPage() {
  const [githubData, setGithubData] = useState<{isPrimary: boolean; opacity: number}[]>([]);
  
  useEffect(() => {
    // Generate random data only on client side to avoid hydration mismatch
    const data = Array.from({ length: 84 }).map(() => {
      const isPrimary = Math.random() > 0.4;
      const opacity = isPrimary ? [20, 40, 60, 80, 90][Math.floor(Math.random() * 5)] : 0;
      return { isPrimary, opacity };
    });
    setGithubData(data);
  }, []);
  
  return (
    <div className="pt-32 pb-20 px-6 max-w-screen-xl mx-auto relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 hidden md:block"></div>
      <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] -z-10 hidden md:block"></div>

      {/* Section 1: The Architect behind the Code */}
      <section className="mb-32 pt-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-10 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="space-y-4 w-full flex flex-col items-center lg:items-start">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 justify-center lg:justify-start"
              >
                <div className="h-[1px] w-8 bg-primary"></div>
                <span className="font-mono text-primary text-xs tracking-[0.3em] uppercase">
                  Profile // 2025
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tighter text-on-surface leading-[1.1]"
              >
                The Architect <br className="hidden lg:block" />
                <span className="text-primary italic font-light">behind the Code.</span>
              </motion.h1>
            </div>

            {/* Backgroundless Bio Content */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8 pl-0 lg:pl-8 border-l-0 lg:border-l-[3px] border-primary/20 flex flex-col items-center lg:items-start"
            >
              <p className="text-xl md:text-2xl font-headline font-medium text-on-surface leading-snug tracking-tight max-w-2xl">
                I am a developer based in <span className="text-primary">Ağrı, Turkey</span>, 
                studying Computer Engineering at <span className="text-primary">Bandırma 17 Eylül University</span>.
              </p>
              
              <div className="space-y-5 text-on-surface-variant leading-relaxed text-base md:text-lg max-w-2xl font-light">
                <p>
                  I focus on engineering digital environments that merge <span className="text-on-surface font-medium">high-performance SaaS architecture</span> with <span className="text-on-surface font-medium">intuitive AI intelligence</span>. My approach is architectural: I don&apos;t just write code; I design systems.
                </p>
                <p>
                  Specializing in the modern web ecosystem, I build scalable applications that solve complex problems through clean typography, rigorous logic, and cutting-edge tech stacks.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                 <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                   <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">System_Operational</span>
                 </div>
                 <div className="hidden sm:block h-[1px] w-12 bg-outline-variant/30"></div>
                 <span className="font-mono text-[10px] text-primary uppercase tracking-widest font-bold bg-primary/10 px-3 py-1.5 rounded-sm">Technical Authority & Precision</span>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative mt-12 lg:mt-0 px-4 sm:px-12 md:px-24 lg:px-0 flex justify-center">
            {/* Elegant Circular Image Container with Hover Glow */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="aspect-square w-full max-w-[400px] overflow-hidden rounded-full relative group border-4 border-outline-variant/10 hover:border-primary/50 transition-all duration-500 shadow-[0_0_50px_rgba(var(--color-primary),0.1)] hover:shadow-[0_0_80px_rgba(var(--color-primary),0.3)]"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                alt="Portrait of Ömer Özbay" 
                className="w-full h-full object-cover grayscale contrast-110 opacity-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700" 
                src="/images/profile.jpg" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent z-10 pointer-events-none"></div>
              
              {/* Clean Overlay Info inside the circular image */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-[2px]">
                <h3 className="font-headline font-bold text-2xl text-white">Ömer Özbay</h3>
                <p className="font-mono text-[10px] text-primary uppercase tracking-widest mt-1 font-bold">Full-Stack Engineer</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Technical Stack */}
      <section className="mb-32">
        <div className="mb-12">
          <span className="font-mono text-secondary text-sm tracking-widest uppercase mb-4 block">02 / Ecosystem</span>
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-on-surface">Technical Stack</h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 md:gap-8 justify-items-center">
          <div className="flex flex-col items-center gap-3 group cursor-default">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-outline-variant/10 bg-surface-container-low/30 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/40 group-hover:-translate-y-2 transition-all duration-500 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/20 scale-0 group-hover:scale-100 rounded-full transition-transform duration-500 origin-bottom"></div>
              <SiTypescript className="text-2xl md:text-3xl text-on-surface-variant group-hover:text-primary relative z-10 transition-colors duration-300" />
            </div>
            <span className="text-[9px] md:text-[10px] font-mono text-on-surface-variant group-hover:text-primary transition-colors uppercase tracking-widest text-center">TypeScript</span>
          </div>
          
          <div className="flex flex-col items-center gap-3 group cursor-default">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-outline-variant/10 bg-surface-container-low/30 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/40 group-hover:-translate-y-2 transition-all duration-500 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/20 scale-0 group-hover:scale-100 rounded-full transition-transform duration-500 origin-bottom"></div>
              <div className="flex items-center gap-1 relative z-10">
                <SiReact className="text-xl md:text-2xl text-on-surface-variant group-hover:text-primary transition-colors duration-300" />
                <SiNextdotjs className="text-xl md:text-2xl text-on-surface-variant group-hover:text-on-surface transition-colors duration-300" />
              </div>
            </div>
            <span className="text-[9px] md:text-[10px] font-mono text-on-surface-variant group-hover:text-primary transition-colors uppercase tracking-widest text-center">Next.js</span>
          </div>

          <div className="flex flex-col items-center gap-3 group cursor-default">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-outline-variant/10 bg-surface-container-low/30 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/40 group-hover:-translate-y-2 transition-all duration-500 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/20 scale-0 group-hover:scale-100 rounded-full transition-transform duration-500 origin-bottom"></div>
              <SiTailwindcss className="text-2xl md:text-3xl text-on-surface-variant group-hover:text-primary relative z-10 transition-colors duration-300" />
            </div>
            <span className="text-[9px] md:text-[10px] font-mono text-on-surface-variant group-hover:text-primary transition-colors uppercase tracking-widest text-center">Tailwind</span>
          </div>

          <div className="flex flex-col items-center gap-3 group cursor-default">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-outline-variant/10 bg-surface-container-low/30 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/40 group-hover:-translate-y-2 transition-all duration-500 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/20 scale-0 group-hover:scale-100 rounded-full transition-transform duration-500 origin-bottom"></div>
              <SiNodedotjs className="text-2xl md:text-3xl text-on-surface-variant group-hover:text-primary relative z-10 transition-colors duration-300" />
            </div>
            <span className="text-[9px] md:text-[10px] font-mono text-on-surface-variant group-hover:text-primary transition-colors uppercase tracking-widest text-center">Node.js</span>
          </div>

          <div className="flex flex-col items-center gap-3 group cursor-default">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-outline-variant/10 bg-surface-container-low/30 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/40 group-hover:-translate-y-2 transition-all duration-500 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/20 scale-0 group-hover:scale-100 rounded-full transition-transform duration-500 origin-bottom"></div>
              <SiOpenai className="text-2xl md:text-3xl text-on-surface-variant group-hover:text-primary relative z-10 transition-colors duration-300" />
            </div>
            <span className="text-[9px] md:text-[10px] font-mono text-on-surface-variant group-hover:text-primary transition-colors uppercase tracking-widest text-center">AI/LLMs</span>
          </div>

          <div className="flex flex-col items-center gap-3 group cursor-default">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-outline-variant/10 bg-surface-container-low/30 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/40 group-hover:-translate-y-2 transition-all duration-500 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/20 scale-0 group-hover:scale-100 rounded-full transition-transform duration-500 origin-bottom"></div>
              <SiPostgresql className="text-2xl md:text-3xl text-on-surface-variant group-hover:text-primary relative z-10 transition-colors duration-300" />
            </div>
            <span className="text-[9px] md:text-[10px] font-mono text-on-surface-variant group-hover:text-primary transition-colors uppercase tracking-widest text-center">PostgreSQL</span>
          </div>
        </div>
      </section>

      {/* Section 3: Timeline of Experience */}
      <section className="mb-32">
        <div className="mb-12 px-4 md:px-0 text-center md:text-left">
          <span className="font-mono text-primary text-sm tracking-widest uppercase mb-4 block">03 / Journey</span>
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-on-surface">Timeline</h2>
        </div>
        <div className="relative px-4 md:px-0">
          {/* Timeline Vertical Line (Visible on mobile on the left, centered on desktop) */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/5 via-primary/30 to-primary/5 md:-translate-x-1/2"></div>

          {/* Timeline Entry 1: Most Recent - University */}
          <div className="relative mb-16 md:mb-24 md:flex justify-between items-center group pl-12 md:pl-0">
            <div className="md:w-[45%] mb-4 md:mb-0">
              <div className="bg-transparent p-0 relative group/card">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="font-mono text-[10px] text-primary uppercase tracking-wider bg-primary/5 px-2 py-1 rounded border border-primary/20">Education // 0x01</span>
                  <span className="font-mono text-[10px] text-on-surface-variant opacity-60">2023 — PRES</span>
                </div>
                <h3 className="font-headline text-2xl md:text-3xl font-bold mb-3 text-on-surface group-hover/card:text-primary transition-colors">Bandırma 17 Eylül University</h3>
                <p className="text-on-surface-variant text-sm md:text-base leading-relaxed md:max-w-md">
                  Computer Engineering student. Building real-world SaaS projects and AI-integrated applications alongside studies.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                  <span className="font-mono text-[9px] text-on-surface-variant uppercase tracking-widest">Active Status</span>
                </div>
              </div>
            </div>
            
            {/* Center Dot */}
            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-2 md:top-1/2 md:-translate-y-1/2 w-4 h-4 bg-background border-2 border-primary/40 rounded-full z-10 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-primary rounded-full scale-50 group-hover:scale-100 transition-transform duration-500 shadow-[0_0_10px_rgba(var(--color-primary),0.8)]"></div>
            </div>

            <div className="md:w-[45%] hidden md:block">
              <div className="font-mono text-[11px] text-on-surface-variant uppercase tracking-[0.4em] opacity-30 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-700">
                Academic_Foundation
              </div>
            </div>
          </div>

          {/* Timeline Entry 2 */}
          <div className="relative mb-16 md:mb-24 md:flex justify-between items-center flex-row-reverse group pl-12 md:pl-0">
            <div className="md:w-[45%] mb-4 md:mb-0">
              <div className="bg-transparent p-0 relative group/card">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="font-mono text-[10px] text-secondary uppercase tracking-wider bg-secondary/5 px-2 py-1 rounded border border-secondary/20">Experience // 0x02</span>
                  <span className="font-mono text-[10px] text-on-surface-variant opacity-60">2022 — 2023</span>
                </div>
                <h3 className="font-headline text-2xl md:text-3xl font-bold mb-3 text-on-surface group-hover/card:text-secondary transition-colors">AI Integration Specialist</h3>
                <p className="text-on-surface-variant text-sm md:text-base leading-relaxed md:max-w-md">
                  Custom GPT-based solutions for content management systems. Improved output efficiency by 40% through specialized prompt engineering.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                  <span className="font-mono text-[9px] text-on-surface-variant uppercase tracking-widest">Completed Cycle</span>
                </div>
              </div>
            </div>

            {/* Center Dot */}
            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-2 md:top-1/2 md:-translate-y-1/2 w-4 h-4 bg-background border-2 border-secondary/40 rounded-full z-10 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-secondary rounded-full scale-50 group-hover:scale-100 transition-transform duration-500 shadow-[0_0_10px_rgba(var(--color-secondary),0.8)]"></div>
            </div>

            <div className="md:w-[45%] hidden md:block text-right">
              <div className="font-mono text-[11px] text-on-surface-variant uppercase tracking-[0.4em] opacity-30 group-hover:opacity-100 group-hover:-translate-x-4 transition-all duration-700">
                AI_Implementation
              </div>
            </div>
          </div>

          {/* Timeline Entry 3: Oldest */}
          <div className="relative mb-16 md:mb-24 md:flex justify-between items-center group pl-12 md:pl-0">
            <div className="md:w-[45%] mb-4 md:mb-0">
              <div className="bg-transparent p-0 relative group/card">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="font-mono text-[10px] text-primary uppercase tracking-wider bg-primary/5 px-2 py-1 rounded border border-primary/20">Foundation // 0x03</span>
                  <span className="font-mono text-[10px] text-on-surface-variant opacity-60">2020 — 2022</span>
                </div>
                <h3 className="font-headline text-2xl md:text-3xl font-bold mb-3 text-on-surface group-hover/card:text-primary transition-colors">Frontend Engineering Studies</h3>
                <p className="text-on-surface-variant text-sm md:text-base leading-relaxed md:max-w-md">
                  UI physics, responsive frameworks, JavaScript fundamentals. Developed core understanding of digital interface logic.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span className="font-mono text-[9px] text-on-surface-variant uppercase tracking-widest">Base Established</span>
                </div>
              </div>
            </div>

            {/* Center Dot */}
            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-2 md:top-1/2 md:-translate-y-1/2 w-4 h-4 bg-background border-2 border-primary/40 rounded-full z-10 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-primary rounded-full scale-50 group-hover:scale-100 transition-transform duration-500 shadow-[0_0_10px_rgba(var(--color-primary),0.8)]"></div>
            </div>

            <div className="md:w-[45%] hidden md:block">
              <div className="font-mono text-[11px] text-on-surface-variant uppercase tracking-[0.4em] opacity-30 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-700">
                Core_Logic_Design
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: GitHub Activity */}
      <section className="mb-20">
        <div className="surface-container-low rounded-2xl p-6 md:p-12 relative overflow-hidden border border-outline-variant/10">
          <div className="absolute top-0 right-0 p-8 opacity-10 hidden md:block">
            <span className="material-symbols-outlined text-9xl">terminal</span>
          </div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
              <div>
                <span className="font-mono text-primary text-sm tracking-widest uppercase mb-4 block">04 / Contributions</span>
                <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight mb-4 text-on-surface">Open Source Vitality</h2>
                <p className="text-on-surface-variant max-w-xl text-sm md:text-base">A glimpse into the daily architectural maintenance of digital systems. My GitHub activity reflects a commitment to consistency and technical excellence.</p>
              </div>
              <div className="flex flex-col items-start md:items-end w-full md:w-auto">
                <div className="text-3xl font-headline font-bold text-primary">1,248+</div>
                <div className="font-mono text-[10px] text-on-surface-variant uppercase">Total Contributions this year</div>
              </div>
            </div>

            {/* Stylized GitHub Graph */}
            <div className="grid grid-cols-10 sm:grid-cols-14 md:grid-cols-21 lg:grid-cols-28 gap-1 md:gap-2">
              {githubData.length > 0 ? (
                githubData.map((item, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-[2px] ${item.isPrimary ? 'bg-primary' : 'bg-surface-variant'}`}
                    style={item.isPrimary ? { opacity: item.opacity / 100 } : {}}
                  ></div>
                ))
              ) : (
                // Placeholder while loading (server-side)
                Array.from({ length: 84 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-[2px] bg-surface-variant"
                  ></div>
                ))
              )}
            </div>

            <div className="mt-8 flex justify-center md:justify-start">
              <Link href="https://github.com/sandrotonal" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:text-on-primary transition-colors py-3 px-6 border border-primary/30 hover:bg-primary rounded-lg group">
                <span className="material-symbols-outlined text-sm">rocket_launch</span>
                EXPLORE REPOSITORIES
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
