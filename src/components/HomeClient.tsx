"use client";

import Image from "next/image";
import Link from "next/link";
import { PostMetadata as BlogPost } from "@/utils/markdown";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";

interface HomeClientProps {
  recentPosts: BlogPost[];
}

// Letter animation variants - Tanda style
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.2,
    },
  },
};

const letterVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.8,
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

// Animated text component
const AnimatedText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const letters = text.split('');
  
  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ delayChildren: delay }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className="inline-block"
          style={{ 
            whiteSpace: letter === ' ' ? 'pre' : 'normal',
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function HomeClient({ recentPosts }: HomeClientProps) {
  const displayedPosts = recentPosts.slice(0, 3);
  const displayedProjects = projects.slice(0, 3);

  return (
    <>
      {/* Abstract Background Glows */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none hidden md:block"></div>
      <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] -z-10 pointer-events-none hidden md:block"></div>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center pt-20 overflow-hidden grid-pattern -mx-8 px-8 mb-32">
        <div className="max-w-screen-2xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 px-3 py-1 bg-surface-container-highest border border-outline-variant/20 rounded-DEFAULT"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-mono text-xs text-on-surface-variant tracking-wider uppercase">Status: Operational</span>
            </motion.div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-headline font-bold leading-[0.95] md:leading-[0.9] tracking-tight text-on-surface">
              <AnimatedText text="Developing the" delay={0.3} />
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                <AnimatedText text="Future with AI" delay={0.6} />
              </span>
              <AnimatedText text=" & SaaS" delay={0.9} />
            </h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-lg sm:text-xl text-on-surface-variant max-w-xl font-light leading-relaxed"
            >
              I am a 20-year-old Full-Stack Engineer focused on building high-performance digital architectures that merge complex logic with human-centric design.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link href="/projects" className="px-8 py-4 bg-primary text-on-primary font-bold rounded-DEFAULT hover:shadow-[0_0_30px_rgba(129,236,255,0.4)] transition-all flex items-center gap-2">
                View My Work
                <span className="material-symbols-outlined" data-icon="arrow_outward">arrow_outward</span>
              </Link>
              <Link href="/about" className="px-8 py-4 border border-outline-variant/30 hover:bg-surface-bright transition-colors font-bold rounded-DEFAULT flex items-center gap-2 text-primary">
                My Tech Stack
                <span className="material-symbols-outlined" data-icon="terminal">terminal</span>
              </Link>
            </motion.div>
          </div>

          {/* Abstract Terminal Graphic */}
          <div className="hidden lg:block relative group">
            <div className="absolute inset-0 bg-primary/20 blur-[60px] group-hover:bg-primary/30 transition-all duration-700"></div>
            <div className="relative bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden shadow-2xl aspect-square flex flex-col">
              <div className="h-10 bg-surface-container-low border-b border-outline-variant/20 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-error-dim/40"></div>
                <div className="w-3 h-3 rounded-full bg-secondary/40"></div>
                <div className="w-3 h-3 rounded-full bg-primary/40"></div>
                <span className="ml-4 font-mono text-[10px] text-on-surface-variant/60">~/ozbay/portfolio/hero_render.sh</span>
              </div>
              <div className="p-8 flex-1 font-mono text-sm space-y-4">
                <div className="flex gap-4">
                  <span className="text-primary opacity-50">01</span>
                  <span className="text-secondary">const</span>
                  <span className="text-on-surface">Engineer</span>
                  <span className="text-primary">=</span>
                  <span className="text-on-surface-variant">{`{`}</span>
                </div>
                <div className="flex gap-4 ml-6">
                  <span className="text-primary opacity-50">02</span>
                  <span className="text-on-surface">name:</span>
                  <span className="text-secondary">&quot;Ömer Özbay&quot;</span>,
                </div>
                <div className="flex gap-4 ml-6">
                  <span className="text-primary opacity-50">03</span>
                  <span className="text-on-surface">age:</span>
                  <span className="text-primary">20</span>,
                </div>
                <div className="flex gap-4 ml-6">
                  <span className="text-primary opacity-50">04</span>
                  <span className="text-on-surface">focus:</span>
                  <span className="text-secondary">[&quot;AI&quot;, &quot;SaaS&quot;, &quot;UX&quot;]</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-primary opacity-50">05</span>
                  <span className="text-on-surface-variant">{`}`}</span>
                </div>
                <div className="pt-12 text-on-surface-variant opacity-30 text-xs italic">
                  {`// Compiling future-proof solutions...`}
                </div>
                <div className="mt-auto flex items-center gap-2 text-primary">
                  <span>$</span>
                  <span className="w-2 h-5 bg-primary animate-pulse"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 border border-outline-variant/15 rounded-2xl bg-surface-container-low">
          <div className="border-l-2 border-primary/20 hover:border-primary transition-colors group pl-6">
            <div className="text-5xl font-headline font-bold mb-2 text-on-surface group-hover:text-primary transition-colors">50+</div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-on-surface-variant">GitHub Repositories</div>
          </div>
          <div className="border-l-2 border-primary/20 hover:border-primary transition-colors group pl-6">
            <div className="text-5xl font-headline font-bold mb-2 text-on-surface group-hover:text-primary transition-colors">2 Yrs</div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-on-surface-variant">Professional Experience</div>
          </div>
          <div className="border-l-2 border-primary/20 hover:border-primary transition-colors group pl-6">
            <div className="text-5xl font-headline font-bold mb-2 text-on-surface group-hover:text-primary transition-colors">AI+</div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-on-surface-variant">Systems Integrator</div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="mb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono text-xs text-primary tracking-widest uppercase mb-4 block">Selected Works</span>
            <h2 className="text-5xl font-headline font-bold tracking-tighter">Architectural Solutions</h2>
          </div>
          <Link href="/projects" className="text-primary font-mono text-sm hover:underline flex items-center gap-2">
            View Archive <span className="material-symbols-outlined" data-icon="open_in_full">open_in_full</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {displayedProjects.map((project, index) => (
            <Link href={project.githubUrl !== '#' ? project.githubUrl : '/projects'} key={project.id} className="group relative flex flex-col bg-surface-container-low border border-outline-variant/10 rounded-xl overflow-hidden hover:border-primary/40 transition-all duration-500 hover:-translate-y-2">
               <div className="aspect-video bg-surface-container-high relative overflow-hidden">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    unoptimized
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"></div>
              </div>
              <div className="p-8 space-y-6 flex flex-col flex-1">
                <div className="space-y-2">
                  <h3 className="text-2xl font-headline font-bold text-on-surface group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-surface-container-highest rounded-md text-[10px] font-mono text-on-surface-variant uppercase">{tech}</span>
                  ))}
                </div>
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <div className="flex gap-4">
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">code</span>
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">visibility</span>
                  </div>
                  <span className="text-[10px] font-mono text-primary opacity-0 group-hover:opacity-100 transition-opacity">0x0{index+1}_BUILD</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Blog Feed */}
      <section className="mb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono text-xs text-secondary tracking-widest uppercase mb-4 block">Insights</span>
            <h2 className="text-5xl font-headline font-bold tracking-tighter">Technical Archive</h2>
          </div>
           <Link href="/blog" className="text-secondary font-mono text-sm hover:underline flex items-center gap-2">
            View All Posts <span className="material-symbols-outlined" data-icon="open_in_full">open_in_full</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {displayedPosts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id} className="group flex flex-col sm:flex-row gap-8 items-start">
               {post.coverImage && (
                <div className="w-full sm:w-48 h-48 bg-surface-container-highest overflow-hidden rounded-lg flex-shrink-0 border border-outline-variant/10 relative">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    unoptimized
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              )}
              <div className="space-y-4">
                <div className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <h3 className="text-2xl font-headline font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-on-surface-variant text-sm line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="inline-flex items-center gap-2 text-primary text-xs font-mono group-hover:translate-x-2 transition-transform">
                  READ_MORE <span className="material-symbols-outlined text-sm">trending_flat</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
