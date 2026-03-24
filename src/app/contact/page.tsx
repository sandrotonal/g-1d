"use client";

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_PUBLIC_KEY = 'rsVkjFCEV_9_DBFK5';
const EMAILJS_SERVICE_ID = 'gucluyumhe';
const EMAILJS_TEMPLATE_ID = 'template_tkh9f6w';

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formRef.current) return;
    
    // Honeypot check - if this field is filled, it's a bot
    const honeyPotField = (formRef.current.elements.namedItem('website') as HTMLInputElement)?.value;
    if (honeyPotField) {
      console.log('Bot detected - honeypot field filled');
      return; // Silently fail for bots
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      
      setSubmitStatus('success');
      formRef.current.reset();
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Email send failed:', error);
      setSubmitStatus('error');
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-outline-variant/20 pb-12">
          <div className="space-y-2">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-primary text-sm tracking-[0.3em] uppercase"
            >
              Initiate Connection // 2025
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-headline font-bold tracking-tighter text-on-surface"
            >
              LET&apos;S BUILD <span className="text-primary">SOMETHING</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-on-surface-variant text-lg max-w-lg leading-relaxed pt-4"
            >
              Architecting high-performance digital environments with precision and technical authority. Reach out to initiate a collaboration.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <div className="space-y-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight flex items-center gap-4">
              <span className="w-12 h-[1px] bg-primary"></span>
              TRANSMIT MESSAGE
            </h2>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8" aria-label="Contact form">
              {/* Honeypot field - hidden from users */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input 
                  name="website"
                  id="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2 group">
                  <label htmlFor="name" className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary transition-colors">Identification</label>
                  <input 
                    id="name"
                    name="name"
                    className="w-full bg-surface-container-lowest border-none py-4 px-4 font-mono text-sm placeholder:text-outline-variant transition-all focus:ring-0 focus:border-l-2 focus:border-primary outline-none" 
                    placeholder="YOUR NAME" 
                    type="text" 
                    required 
                    aria-required="true"
                    autoComplete="name"
                  />
                </div>
                <div className="space-y-2 group">
                  <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary transition-colors">Protocol Address</label>
                  <input 
                    id="email"
                    name="email"
                    className="w-full bg-surface-container-lowest border-none py-4 px-4 font-mono text-sm placeholder:text-outline-variant transition-all focus:ring-0 focus:border-l-2 focus:border-primary outline-none" 
                    placeholder="EMAIL@DOMAIN.COM" 
                    type="email" 
                    required 
                    aria-required="true"
                    autoComplete="email"
                  />
                </div>
              </div>
              <div className="space-y-2 group">
                <label htmlFor="message" className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary transition-colors">Transmission Payload</label>
                <textarea 
                  id="message"
                  name="message"
                  className="w-full bg-surface-container-lowest border-none py-4 px-4 font-mono text-sm placeholder:text-outline-variant transition-all focus:ring-0 focus:border-l-2 focus:border-primary outline-none resize-none" 
                  placeholder="DESCRIBE THE ARCHITECTURAL CHALLENGE..." 
                  rows={6} 
                  required
                  aria-required="true"
                ></textarea>
              </div>
              
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-primary/10 border border-primary/30 rounded-md">
                  <p className="text-primary font-mono text-sm">✓ Message transmitted successfully! I&apos;ll respond shortly.</p>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-error/10 border border-error/30 rounded-md">
                  <p className="text-error font-mono text-sm">✗ Transmission failed. Please try again or contact directly.</p>
                </div>
              )}
              
              <button 
                className="group relative inline-flex items-center gap-4 bg-primary text-on-primary-fixed px-10 py-5 font-headline font-bold text-lg hover:shadow-[0_0_30px_rgba(129,236,255,0.4)] transition-all active:scale-95 w-full sm:w-auto justify-center disabled:opacity-50 disabled:cursor-not-allowed" 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    TRANSMITTING...
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  </>
                ) : (
                  <>
                    INITIATE CONNECTION
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">send</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Info & Links */}
        <div className="lg:col-span-5 space-y-16">
          {/* Social Connections */}
          <div className="space-y-8">
            <h3 className="font-headline text-xl font-bold tracking-tight">DIRECT_NODES</h3>
            <div className="grid grid-cols-1 gap-4">
              {/* GitHub */}
              <a className="glass-panel border border-outline-variant/10 p-6 flex items-center justify-between group hover:border-primary/40 transition-all duration-500" href="https://github.com/sandrotonal" target="_blank" rel="noopener noreferrer">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 flex items-center justify-center bg-surface-container-highest group-hover:bg-primary/10 transition-colors">
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">code</span>
                  </div>
                  <div>
                    <p className="font-headline font-bold text-lg text-on-surface">GitHub</p>
                    <p className="font-mono text-[10px] text-on-surface-variant">/repositories/source-code</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-primary group-hover:translate-x-1 transition-all">north_east</span>
              </a>
              {/* LinkedIn */}
              <a className="glass-panel border border-outline-variant/10 p-6 flex items-center justify-between group hover:border-primary/40 transition-all duration-500" href="https://linkedin.com/in/omerozbay" target="_blank" rel="noopener noreferrer">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 flex items-center justify-center bg-surface-container-highest group-hover:bg-primary/10 transition-colors">
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">work</span>
                  </div>
                  <div>
                    <p className="font-headline font-bold text-lg text-on-surface">LinkedIn</p>
                    <p className="font-mono text-[10px] text-on-surface-variant">/professional/network</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-primary group-hover:translate-x-1 transition-all">north_east</span>
              </a>
              {/* Twitter/X */}
              <a className="glass-panel border border-outline-variant/10 p-6 flex items-center justify-between group hover:border-primary/40 transition-all duration-500" href="https://x.com/gucluyumhe" target="_blank" rel="noopener noreferrer">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 flex items-center justify-center bg-surface-container-highest group-hover:bg-primary/10 transition-colors">
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">alternate_email</span>
                  </div>
                  <div>
                    <p className="font-headline font-bold text-lg text-on-surface">X / Twitter</p>
                    <p className="font-mono text-[10px] text-on-surface-variant">/broadcasts/signals</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-primary group-hover:translate-x-1 transition-all">north_east</span>
              </a>
            </div>
          </div>

          {/* Stylized Map / Location */}
          <div className="space-y-6">
            <h3 className="font-headline text-xl font-bold tracking-tight">GEOGRAPHIC_ANCHOR</h3>
            <a 
              href="https://www.google.com/maps/place/Do%C4%9Fubeyaz%C4%B1t,+A%C4%9Fr%C4%B1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block relative aspect-video w-full overflow-hidden rounded-lg grayscale opacity-60 hover:opacity-100 transition-opacity duration-700 bg-surface-container-low border border-outline-variant/20 group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Ağrı Doğubeyazıt cityscape" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-on-surface">Based in Ağrı Doğubeyazıt, TR [UTC+3]</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Secondary CTA Section */}
      <section className="mt-40 text-center">
        <div className="py-24 border-y border-outline-variant/10 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 blur-[120px]"></div>
          <div className="relative z-10">
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-6">READY TO DEPLOY?</h2>
            <p className="text-on-surface-variant max-w-lg mx-auto mb-8">
              Whether it&apos;s a greenfield project or refactoring legacy systems, I bring architectural precision to every line of code.
            </p>
            <Link href="/projects" className="inline-flex items-center gap-3 text-primary font-mono text-sm uppercase tracking-widest hover:underline">
              Explore My Work <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
