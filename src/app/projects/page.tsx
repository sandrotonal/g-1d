"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectsPage() {
  const [filter, setFilter] = useState('ALL_SYSTEMS');

  // Get unique categories and flatten them, mapping them to uppercase constants for the tech theme
  const allCategories = ['ALL_SYSTEMS', ...Array.from(new Set(projects.flatMap(p => p.categories))).map(c => c.toUpperCase().replace(/\s+/g, '_'))];

  // Filter projects mapping tech theme constant back to actual category or ALL
  const filteredProjects = filter === 'ALL_SYSTEMS'
    ? projects
    : projects.filter(project => project.categories.map(c => c.toUpperCase().replace(/\s+/g, '_')).includes(filter));

  return (
    <div className="max-w-screen-2xl mx-auto mb-32">
      <header className="mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-2">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-primary text-sm tracking-[0.3em] uppercase"
            >
              Engineering Archive // 2025
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-headline font-bold tracking-tighter text-on-surface"
            >
              My Engineering Log / <span className="text-primary">Projects</span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3"
          >
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 border ${
                  filter === category
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary bg-transparent'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </header>

      {/* Grid pattern container to match HTML design */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[60vh]">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
             // Assign asymmetric bento grid spans based on index to emulate HTML design
             // Pattern: 8, 4, 5, 7, repeat.
             let colSpanClass = 'md:col-span-12';
             const patternIndex = index % 4;
             if (patternIndex === 0) colSpanClass = 'md:col-span-8';
             if (patternIndex === 1) colSpanClass = 'md:col-span-4';
             if (patternIndex === 2) colSpanClass = 'md:col-span-5';
             if (patternIndex === 3) colSpanClass = 'md:col-span-7';

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`${colSpanClass} group`}
              >
                 <Link href={`/projects/${project.id}`} className="block h-full">
                    {/* Different card layouts based on span */}
                    {patternIndex === 0 ? (
                      <div className="glass-card p-8 h-full flex flex-col justify-between">
                         <div>
                            <div className="flex justify-between items-start mb-6">
                              <h2 className="text-3xl font-headline font-bold tracking-tight text-on-surface">{project.title}</h2>
                              <div className="flex gap-4">
                                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">open_in_new</span>
                                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">terminal</span>
                              </div>
                            </div>
                            <p className="text-on-surface-variant text-lg leading-relaxed mb-6 max-w-2xl line-clamp-3">
                                {project.description}
                            </p>
                            <div className="mb-8 p-4 bg-surface-container-lowest border-l-2 border-primary">
                              <h4 className="font-mono text-xs text-primary uppercase tracking-widest mb-2">Technical Focus</h4>
                              <p className="text-sm font-body text-on-surface-variant">Built using modern architecture emphasizing type safety and performance optimization.</p>
                            </div>
                         </div>
                         <div className="flex flex-wrap gap-2 mt-auto">
                           {project.technologies.map(tech => (
                             <span key={tech} className="tech-chip px-3 py-1 text-[10px] font-mono text-on-surface-variant uppercase">{tech}</span>
                           ))}
                         </div>
                      </div>
                    ) : patternIndex === 1 ? (
                        <div className="glass-card p-8 h-full flex flex-col">
                           <div className="aspect-video mb-6 overflow-hidden bg-surface-container-low border border-outline-variant/20 relative">
                                <Image src={project.image} alt={`${project.title} project screenshot`} fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"/>
                           </div>
                           <h2 className="text-2xl font-headline font-bold tracking-tight mb-4 text-on-surface">{project.title}</h2>
                           <p className="text-on-surface-variant text-sm mb-6 flex-grow line-clamp-2">{project.description}</p>
                           <div className="flex flex-wrap gap-2 mb-6">
                             {project.technologies.slice(0, 3).map(tech => (
                               <span key={tech} className="tech-chip px-3 py-1 text-[10px] font-mono text-on-surface-variant uppercase">{tech}</span>
                             ))}
                           </div>
                           <div className="flex justify-between items-center mt-auto">
                             <span className="font-mono text-[10px] text-primary">BUILD_STABLE</span>
                             <div className="flex gap-3">
                               <span className="material-symbols-outlined text-sm text-on-surface-variant group-hover:text-primary">link</span>
                               <span className="material-symbols-outlined text-sm text-on-surface-variant group-hover:text-primary">code</span>
                             </div>
                           </div>
                        </div>
                    ) : patternIndex === 2 ? (
                         <div className="glass-card p-8 h-full border-primary/30 relative overflow-hidden">
                           <div className="absolute -right-4 -top-4 opacity-10">
                              <span className="material-symbols-outlined text-[120px] text-primary group-hover:rotate-12 transition-transform duration-700">architecture</span>
                           </div>
                           <h2 className="text-2xl font-headline font-bold tracking-tight mb-4 text-on-surface">{project.title}</h2>
                           <p className="text-on-surface-variant text-sm mb-6 line-clamp-2">{project.description}</p>
                           <div className="space-y-4 mb-8">
                             <div className="flex justify-between items-center border-b border-outline-variant/10 pb-2">
                               <span className="font-mono text-[10px] text-on-surface-variant uppercase">LOAD_SPEED</span>
                               <span className="font-mono text-[10px] text-primary">OPT</span>
                             </div>
                             <div className="flex justify-between items-center border-b border-outline-variant/10 pb-2">
                               <span className="font-mono text-[10px] text-on-surface-variant uppercase">STATUS</span>
                               <span className="font-mono text-[10px] text-primary">100%</span>
                             </div>
                           </div>
                           <div className="flex flex-wrap gap-2 mt-auto">
                              {project.technologies.slice(0, 3).map(tech => (
                               <span key={tech} className="tech-chip px-3 py-1 text-[10px] font-mono text-on-surface-variant uppercase">{tech}</span>
                             ))}
                           </div>
                         </div>
                    ) : (
                         <div className="glass-card p-8 h-full bg-surface-container-low/40">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                               <div className="flex flex-col">
                                 <h2 className="text-2xl font-headline font-bold tracking-tight mb-4 text-on-surface">{project.title}</h2>
                                 <p className="text-on-surface-variant text-sm mb-6 line-clamp-3">{project.description}</p>
                                 <ul className="space-y-3 mb-6">
                                   <li className="flex items-center gap-3 text-xs text-on-surface-variant">
                                      <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                      Custom UI Implementation
                                   </li>
                                   <li className="flex items-center gap-3 text-xs text-on-surface-variant">
                                      <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                                      Responsive Architecture
                                   </li>
                                 </ul>
                                 <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.technologies.slice(0, 2).map(tech => (
                                     <span key={tech} className="tech-chip px-3 py-1 text-[10px] font-mono text-on-surface-variant uppercase">{tech}</span>
                                   ))}
                                 </div>
                               </div>
                               <div className="relative rounded-lg overflow-hidden border border-outline-variant/30 hidden md:block">
                                  <Image src={project.image} alt={`${project.title} project preview`} fill sizes="(max-width: 768px) 100vw, 500px" className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"/>
                                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                               </div>
                             </div>
                         </div>
                    )}
                 </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 text-on-surface-variant font-mono text-sm"
        >
          {`// NO_SYSTEMS_FOUND`}
        </motion.div>
      )}

      {/* System Message Call to Action */}
      <section className="mt-24 py-16 px-8 bg-surface-container-lowest border border-outline-variant/10 rounded-xl flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-xl">
          <h3 className="text-3xl font-headline font-bold mb-4 text-on-surface">System Status: Building Future</h3>
          <p className="text-on-surface-variant font-mono text-sm leading-relaxed">
            Computer Engineering student at Bandırma 17 Eylül University (2023-Present). Building SaaS projects and AI-integrated applications. If you have a challenge that needs precise execution, let&apos;s talk.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/about" className="bg-surface-bright text-on-surface px-8 py-3 font-mono text-xs hover:bg-primary hover:text-on-primary transition-all rounded-sm uppercase tracking-wider font-bold inline-block">VIEW_RESUME.PDF</Link>
          <Link href="/contact" className="border border-primary text-primary px-8 py-3 font-mono text-xs hover:bg-primary/5 transition-all rounded-sm uppercase tracking-wider font-bold inline-block">TERMINAL_MODE</Link>
        </div>
      </section>
    </div>
  );
}
