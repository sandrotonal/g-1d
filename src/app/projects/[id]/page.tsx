"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import { useState, useEffect, useCallback } from 'react';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = parseInt(params.id as string);
  const project = projects.find(p => p.id === projectId);
  
  const [activeTab, setActiveTab] = useState<'overview' | 'gallery' | 'videos'>('overview');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    setCurrentSlide(0);
    setIsAutoPlaying(true);
  }, [activeTab]);

  // Auto-advance slides
  useEffect(() => {
    if (!project?.gallery || !isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => prev === (project?.gallery?.length || 1) - 1 ? 0 : prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [project?.gallery, isAutoPlaying, activeTab]);

  const nextSlide = useCallback(() => {
    if (!project?.gallery) return;
    setCurrentSlide((prev) => prev === project.gallery.length - 1 ? 0 : prev + 1);
  }, [project?.gallery]);

  const prevSlide = useCallback(() => {
    if (!project?.gallery) return;
    setCurrentSlide((prev) => prev === 0 ? project.gallery.length - 1 : prev - 1);
  }, [project?.gallery]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-headline font-bold text-on-surface mb-4">Project Not Found</h1>
          <Link href="/projects" className="text-primary hover:underline">← Back to Projects</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Back Link */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
        <Link href="/projects" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-mono text-xs md:text-sm">
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          BACK_TO_PROJECTS
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 md:mb-12">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span key={tech} className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-mono uppercase tracking-wider border border-primary/20 rounded-sm">
              {tech}
            </span>
          ))}
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tight text-on-surface mb-4">
          {project.title}
        </h1>
        <p className="text-base md:text-lg text-on-surface-variant max-w-3xl">
          {project.longDescription || project.description}
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-3 mb-10">
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" 
             className="inline-flex items-center gap-2 bg-primary text-on-primary-fixed px-6 py-3 font-mono text-xs uppercase tracking-wider hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all">
            <span className="material-symbols-outlined">open_in_new</span>
            VIEW DEMO
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2 border border-primary text-primary px-6 py-3 font-mono text-xs uppercase tracking-wider hover:bg-primary/10 transition-all">
            <span className="material-symbols-outlined">code</span>
            SOURCE CODE
          </a>
        )}
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-outline-variant/20 mb-8">
        {['overview', 'gallery', 'videos'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as 'overview' | 'gallery' | 'videos')}
            className={`px-4 py-3 font-mono text-xs uppercase tracking-wider transition-all ${
              activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {tab} {tab === 'gallery' && project.gallery && `(${project.gallery.length})`}
            {tab === 'videos' && project.videos && `(${project.videos.length})`}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB - Two Column Layout */}
      {activeTab === 'overview' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Main Showcase - Full Width Slider */}
          <div className="space-y-4">
            {/* Main Image Slider - Extended Height */}
            <div className="relative w-full rounded-xl overflow-hidden border-2 border-outline-variant/30 bg-surface-container-low shadow-2xl group hover:border-primary/50 transition-all">
              <div className="relative w-full min-h-[600px] sm:min-h-[700px] md:min-h-[800px] lg:min-h-[900px]">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentSlide} 
                    initial={{ opacity: 0, scale: 1.05 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <Image 
                      src={project.gallery?.[currentSlide] || project.image} 
                      alt={`${project.title} screenshot ${currentSlide + 1}`} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 800px"
                      className="object-cover" 
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/20" />
                
                {/* Top Info */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <span className="font-mono text-[10px] text-white bg-black/60 backdrop-blur px-3 py-1.5 rounded-full border border-white/10">
                    {project.title.toUpperCase()}
                  </span>
                  <span className="font-mono text-xs text-white bg-black/60 backdrop-blur px-3 py-1.5 rounded-full border border-white/10">
                    {currentSlide + 1} / {project.gallery?.length || 1}
                  </span>
                </div>

                {/* Bottom Controls */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex justify-between items-end">
                    <button 
                      onClick={() => openLightbox(currentSlide)} 
                      className="w-10 h-10 bg-black/60 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors border border-white/20"
                    >
                      <span className="material-symbols-outlined">zoom_in</span>
                    </button>
                    
                    {/* Slide Indicators */}
                    <div className="flex gap-1.5">
                      {project.gallery?.map((_, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => setCurrentSlide(idx)} 
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            currentSlide === idx ? 'w-8 bg-primary' : 'w-1.5 bg-white/50 hover:bg-white/80'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button 
                  onClick={prevSlide} 
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 backdrop-blur rounded-full text-white hover:bg-primary transition-colors flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button 
                  onClick={nextSlide} 
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 backdrop-blur rounded-full text-white hover:bg-primary transition-colors flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Thumbnail Strip with Auto-play Toggle */}
            {project.gallery && (
              <div className="flex items-center gap-4">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide flex-1">
                  {project.gallery.map((img, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setCurrentSlide(idx)} 
                      className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                        currentSlide === idx 
                          ? 'border-primary shadow-[0_0_10px_rgba(0,229,255,0.4)]' 
                          : 'border-outline-variant/30 hover:border-primary/50'
                      }`}
                    >
                      <Image 
                        src={img} 
                        alt={`${project.title} thumbnail ${idx + 1}`} 
                        fill
                        sizes="64px"
                        className="object-cover" 
                      />
                      {currentSlide === idx && (
                        <div className="absolute inset-0 bg-primary/20" />
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Auto-play Toggle */}
                <button 
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all flex-shrink-0 ${
                    isAutoPlaying 
                      ? 'bg-primary/20 border-primary text-primary' 
                      : 'bg-surface-container-low border-outline-variant/30 text-on-surface-variant'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">
                    {isAutoPlaying ? 'pause' : 'play_arrow'}
                  </span>
                  <span className="font-mono text-[10px] uppercase hidden sm:inline">
                    {isAutoPlaying ? 'Pause' : 'Play'}
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Right: Project Details */}
          <div className="space-y-8">
            {/* About Section */}
            <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6">
              <h3 className="font-headline text-xl font-bold text-on-surface mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">info</span>
                About This Project
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Key Features */}
            {project.features && (
              <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6">
                <h3 className="font-headline text-xl font-bold text-on-surface mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">star</span>
                  Key Features
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {project.features.slice(0, 4).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-surface-container-low rounded-lg">
                      <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                      <span className="text-sm text-on-surface-variant">{feature}</span>
                    </div>
                  ))}
                </div>
                {project.features.length > 4 && (
                  <button onClick={() => setActiveTab('gallery')} className="mt-4 text-primary text-xs font-mono uppercase hover:underline">
                    View all {project.features.length} features →
                  </button>
                )}
              </div>
            )}

            {/* Tech Stack */}
            <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6">
              <h3 className="font-headline text-xl font-bold text-on-surface mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">code</span>
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1.5 bg-surface-container-high text-on-surface-variant text-xs font-mono rounded-lg border border-outline-variant/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-4 text-center">
                <span className="material-symbols-outlined text-primary text-2xl mb-2">image</span>
                <div className="font-headline text-2xl font-bold text-on-surface">{project.gallery?.length || 0}</div>
                <div className="font-mono text-[10px] text-on-surface-variant uppercase">Screenshots</div>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-4 text-center">
                <span className="material-symbols-outlined text-primary text-2xl mb-2">videocam</span>
                <div className="font-headline text-2xl font-bold text-on-surface">{project.videos?.length || 0}</div>
                <div className="font-mono text-[10px] text-on-surface-variant uppercase">Videos</div>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-4 text-center">
                <span className="material-symbols-outlined text-primary text-2xl mb-2">checklist</span>
                <div className="font-headline text-2xl font-bold text-on-surface">{project.features?.length || 0}</div>
                <div className="font-mono text-[10px] text-on-surface-variant uppercase">Features</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* GALLERY TAB - Full Screen Vertical Slider */}
      {activeTab === 'gallery' && project.gallery && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Main Full Width Vertical Slider */}
          <div className="relative w-full max-w-md mx-auto rounded-xl overflow-hidden border-2 border-outline-variant/30 bg-surface-container-low shadow-2xl group hover:border-primary/50 transition-all">
            <div className="relative w-full aspect-[9/16] min-h-[600px] sm:min-h-[700px] md:min-h-[800px]">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentSlide} 
                  initial={{ opacity: 0, scale: 1.1 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={project.gallery[currentSlide]} 
                    alt={`${project.title} gallery image ${currentSlide + 1}`} 
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover" 
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/30 pointer-events-none" />
              
              {/* Top Info */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                <span className="font-mono text-xs text-white bg-black/60 backdrop-blur px-4 py-2 rounded-full border border-white/10">
                  GALLERY VIEW
                </span>
                <span className="font-mono text-sm text-white bg-black/60 backdrop-blur px-4 py-2 rounded-full border border-white/10">
                  {String(currentSlide + 1).padStart(2, '0')} / {String(project.gallery.length).padStart(2, '0')}
                </span>
              </div>

              {/* Navigation Arrows */}
              <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 backdrop-blur rounded-full text-white hover:bg-primary transition-colors flex items-center justify-center border border-white/20"
              >
                <span className="material-symbols-outlined text-2xl">chevron_left</span>
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 backdrop-blur rounded-full text-white hover:bg-primary transition-colors flex items-center justify-center border border-white/20"
              >
                <span className="material-symbols-outlined text-2xl">chevron_right</span>
              </button>

              {/* Bottom Progress */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex justify-center gap-2">
                  {project.gallery.map((_, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setCurrentSlide(idx)} 
                      className={`h-1 rounded-full transition-all duration-300 ${
                        currentSlide === idx ? 'w-10 bg-primary' : 'w-2 bg-white/40 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Thumbnail Navigation */}
          <div className="flex gap-2 overflow-x-auto pb-2 justify-center">
            {project.gallery.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentSlide(idx)} 
                className={`relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all hover:scale-110 ${
                  currentSlide === idx 
                    ? 'border-primary shadow-[0_0_15px_rgba(0,229,255,0.5)] scale-105' 
                    : 'border-outline-variant/30 hover:border-primary/50'
                }`}
              >
                <Image src={img} alt={`${project.title} nav ${idx}`} fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* VIDEOS TAB */}
      {activeTab === 'videos' && project.videos && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.videos.map((video, idx) => (
            <div key={idx} className="relative rounded-xl overflow-hidden border-2 border-outline-variant/30 bg-surface-container-low">
              <div className="relative aspect-[9/16]">
                <video src={video} controls className="absolute inset-0 w-full h-full object-cover" poster={project.image} />
              </div>
              <div className="absolute top-3 left-3">
                <span className="font-mono text-xs text-white bg-black/50 px-3 py-1 rounded-full">VIDEO {idx + 1}</span>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Lightbox */}
      {lightboxOpen && project.gallery && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 bg-background/98 flex items-center justify-center p-4" onClick={() => setLightboxOpen(false)}>
          <button className="absolute top-4 right-4 w-12 h-12 bg-black/50 rounded-full text-white hover:bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
          <div className="relative max-w-4xl w-full aspect-[9/16] max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={project.gallery[lightboxIndex]} alt={`${project.title} lightbox view`} fill sizes="100vw" className="object-contain" />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-sm text-white bg-black/50 px-4 py-2 rounded-full">
            {lightboxIndex + 1} / {project.gallery.length}
          </div>
        </motion.div>
      )}
    </div>
  );
}
