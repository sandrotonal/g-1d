"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete?: () => void;
}

// Letter animation variants
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const letterVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    rotateX: -90,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      delay: 1.2,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: { 
    scaleX: 1,
    transition: {
      delay: 1.5,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      onComplete?.();
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const firstName = "Ömer";
  const lastName = "Özbay";

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-[#0a0a0b] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
              }}
            />
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* First Name */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex overflow-hidden"
            >
              {firstName.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-headline font-bold text-white tracking-tighter inline-block"
                  style={{ 
                    textShadow: '0 0 80px rgba(0, 229, 255, 0.3)',
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>

            {/* Last Name */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex overflow-hidden -mt-2 sm:-mt-4"
            >
              {lastName.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-headline font-bold text-white tracking-tighter inline-block"
                  style={{ 
                    textShadow: '0 0 80px rgba(0, 229, 255, 0.3)',
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>

            {/* Decorative Line */}
            <motion.div
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              className="w-24 h-[2px] bg-primary mt-8 origin-left"
            />

            {/* Subtitle */}
            <motion.div
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 text-center"
            >
              <p className="font-mono text-[10px] sm:text-xs text-white/40 tracking-[0.4em] uppercase">
                Full-Stack Engineer
              </p>
            </motion.div>
          </div>

          {/* Corner Elements */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3"
          >
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
            <span className="font-mono text-[10px] text-white/30 tracking-widest">
              LOADING
            </span>
          </motion.div>

          {/* Year Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute top-8 right-8"
          >
            <span className="font-mono text-[10px] text-white/20 tracking-widest">
              ©2024
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
