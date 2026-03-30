'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

import { Post } from '@/utils/markdown';

interface BlogPostClientProps {
  postData: Post;
}

export default function BlogPostClient({ postData }: BlogPostClientProps) {
  // Share function
  const handleShare = async () => {
    const shareData = {
      title: postData.title,
      text: postData.excerpt,
      url: window.location.href,
    };
    
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Bookmark function
  const handleBookmark = () => {
    if (typeof window !== 'undefined') {
      const savedBookmarks = JSON.parse(localStorage.getItem('bookmarked_posts') || '[]');
      const isBookmarked = savedBookmarks.includes(postData.id);
      
      if (isBookmarked) {
        const updated = savedBookmarks.filter((id: string) => id !== postData.id);
        localStorage.setItem('bookmarked_posts', JSON.stringify(updated));
        alert('Bookmark removed!');
      } else {
        savedBookmarks.push(postData.id);
        localStorage.setItem('bookmarked_posts', JSON.stringify(savedBookmarks));
        alert('Article bookmarked!');
      }
    }
  };

  useEffect(() => {
    // Basic syntax highlighting initialization could go here
  }, [postData]);

  // Function to calculate read time
  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const textLength = content.split(/\s+/).length;
    return Math.ceil(textLength / wordsPerMinute);
  };

  const readTime = getReadTime(postData.content);
  const formattedDate = new Date(postData.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).toUpperCase();

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] max-h-[716px] flex items-end justify-start overflow-hidden border-b border-outline-variant/10">
        <div className="absolute inset-0 z-0">
          <img
            src={postData.coverImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80"}
            alt={postData.title}
            className="w-full h-full object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pb-16 w-full">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="bg-surface-container-highest text-primary font-mono text-[10px] tracking-widest px-3 py-1 uppercase rounded-sm border border-primary/20">
              {postData.category || 'Architecture'}
            </span>
            {postData.tags?.slice(0, 2).map(tag => (
              <span key={tag} className="bg-surface-container-highest text-on-surface-variant font-mono text-[10px] tracking-widest px-3 py-1 uppercase rounded-sm">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-headline text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-on-surface max-w-4xl leading-[1.1] mb-6">
            {postData.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-on-surface-variant font-mono text-xs tracking-wider uppercase">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm">calendar_today</span>
              {formattedDate}
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm">schedule</span>
              {readTime} MIN READ
            </div>
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              ADVANCED LEVEL
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-20 flex flex-col lg:flex-row gap-12 lg:gap-16 relative">

        {/* Floating Navigation - Desktop */}
        <aside className="hidden lg:flex flex-col w-12 sticky top-32 h-fit">
          <div className="flex flex-col gap-8 items-center text-on-surface-variant">
            <Link href="/blog" aria-label="Go back to blog" className="hover:text-primary transition-colors group">
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <div className="w-[1px] h-12 bg-outline-variant/30"></div>
            <button onClick={handleShare} aria-label="Share this article" className="hover:text-primary transition-colors">
              <span className="material-symbols-outlined">share</span>
            </button>
            <button onClick={handleBookmark} aria-label="Bookmark this article" className="hover:text-primary transition-colors">
              <span className="material-symbols-outlined">bookmark</span>
            </button>
          </div>
        </aside>

        {/* Mobile Floating Actions - Hidden by default, shown when menu is open */}
        <div id="mobile-actions-menu" className="hidden fixed right-4 bottom-20 z-50 flex flex-col gap-2">
          <button 
            onClick={handleShare} 
            aria-label="Share this article"
            className="w-10 h-10 bg-surface-container-high border border-outline-variant/20 text-primary flex items-center justify-center rounded-full shadow-lg hover:bg-primary hover:text-on-primary-fixed transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">share</span>
          </button>
          <button 
            onClick={handleBookmark} 
            aria-label="Bookmark this article"
            className="w-10 h-10 bg-surface-container-high border border-outline-variant/20 text-primary flex items-center justify-center rounded-full shadow-lg hover:bg-primary hover:text-on-primary-fixed transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">bookmark</span>
          </button>
          <button 
            onClick={() => {
              const menu = document.getElementById('mobile-actions-menu');
              if (menu) menu.classList.add('hidden');
            }}
            aria-label="More options"
            className="w-10 h-10 bg-surface-container-high border border-outline-variant/20 text-primary flex items-center justify-center rounded-full shadow-lg hover:bg-primary hover:text-on-primary-fixed transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">more_horiz</span>
          </button>
          <button 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              const menu = document.getElementById('mobile-actions-menu');
              if (menu) menu.classList.add('hidden');
            }}
            aria-label="Scroll to top"
            className="w-10 h-10 bg-surface-container-high border border-outline-variant/20 text-primary flex items-center justify-center rounded-full shadow-lg hover:bg-primary hover:text-on-primary-fixed transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">expand_less</span>
          </button>
        </div>
        
        {/* Mobile Menu Toggle Button - Always visible */}
        <button 
          onClick={() => {
            const menu = document.getElementById('mobile-actions-menu');
            if (menu) menu.classList.toggle('hidden');
          }}
          aria-label="Open actions menu"
          className="lg:hidden fixed right-4 bottom-20 w-10 h-10 bg-surface-container-high border border-outline-variant/20 text-primary flex items-center justify-center rounded-full shadow-lg hover:bg-primary hover:text-on-primary-fixed transition-all active:scale-95 z-[60]"
        >
          <span className="material-symbols-outlined text-lg">keyboard_arrow_up</span>
        </button>

        {/* Mobile Back Button */}
        <div className="lg:hidden mb-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary font-mono text-xs uppercase tracking-widest transition-colors">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Journal
          </Link>
        </div>

        {/* Main Body */}
        <article className="flex-1 max-w-3xl w-full">
          <div
            className="prose prose-invert prose-primary max-w-none
              prose-headings:font-headline prose-headings:font-bold prose-headings:text-on-surface prose-headings:tracking-tight
              prose-p:text-on-surface-variant prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-code:text-secondary prose-code:bg-surface-container-high prose-code:px-1 prose-code:rounded
              prose-pre:bg-[#000000] prose-pre:border-l-2 prose-pre:border-primary prose-pre:rounded-lg prose-pre:shadow-2xl prose-pre:p-6
              prose-strong:text-on-surface prose-strong:font-bold
              prose-ul:text-on-surface-variant prose-ol:text-on-surface-variant"
            dangerouslySetInnerHTML={{ __html: postData.content }}
          />

          {/* Author Bio Section */}
          <section className="mt-24 pt-12 border-t border-outline-variant/20">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start text-center md:text-left">
              <div className="relative shrink-0 w-24 h-24">
                <div className="absolute -inset-1 bg-primary blur opacity-20"></div>
                <img
                  alt="Ömer Özbay"
                  className="relative w-full h-full object-cover rounded-sm grayscale"
                  src="/images/author.jpg"
                />
              </div>
              <div>
                <span className="font-mono text-[10px] text-primary tracking-widest uppercase mb-2 block">Written By</span>
                <h4 className="font-headline text-2xl font-bold text-on-surface mb-3">Ömer Özbay</h4>
                <p className="text-on-surface-variant max-w-xl text-sm leading-relaxed">
                  Full-Stack Engineer specialized in bridging high-performance backend architectures with pixel-perfect frontend experiences. Building the future with AI and modern web technologies.
                </p>
                <div className="mt-6 flex gap-4 justify-center md:justify-start">
                  <a href="https://x.com/gucluyumhe" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors font-mono text-[10px] md:text-xs uppercase tracking-tighter">Twitter / X</a>
                  <a href="https://wa.me/905314803809" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors font-mono text-[10px] md:text-xs uppercase tracking-tighter">WhatsApp</a>
                  <a href="https://t.me/islamakhachev" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors font-mono text-[10px] md:text-xs uppercase tracking-tighter">Telegram</a>
                  <a href="https://github.com/sandrotonal" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors font-mono text-[10px] md:text-xs uppercase tracking-tighter">Github</a>
                </div>
              </div>
            </div>
          </section>
        </article>

        {/* Sidebar (Right) */}
        <aside className="w-full lg:w-80 space-y-12">
          {/* Custom Code window style (applied globally via CSS or local class) */}
          <div className="bg-surface-container-low p-6 rounded-sm border border-outline-variant/10">
            <h5 className="font-headline font-bold text-sm uppercase tracking-widest text-on-surface mb-6 border-b border-outline-variant/10 pb-4">Inside this post</h5>
            <nav className="flex flex-col gap-4">
              {/* Dynamic TOC would ideally parse headers. For now, static representation */}
              <a href="#" className="text-primary text-xs font-mono uppercase tracking-tight flex items-center gap-2">
                <span className="w-1 h-1 bg-primary"></span>
                Giriş
              </a>
              <a href="#" className="text-on-surface-variant hover:text-on-surface text-xs font-mono uppercase tracking-tight flex items-center gap-2 transition-colors">
                <span className="w-1 h-1 bg-outline-variant"></span>
                Mimari Detaylar
              </a>
            </nav>
          </div>

          {/* Trending Technicals */}
          <div>
            <h5 className="font-headline font-bold text-sm uppercase tracking-widest text-on-surface mb-6">Trending Technicals</h5>
            <div className="space-y-6">
              <Link href="/blog" className="group block border-l border-transparent hover:border-primary pl-4 transition-all -ml-4">
                <span className="text-[10px] font-mono text-primary uppercase">Performance</span>
                <h6 className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors mt-1">Etkili Mobil Uygulama Geliştirme Stratejileri</h6>
              </Link>
              <Link href="/blog" className="group block border-l border-transparent hover:border-primary pl-4 transition-all -ml-4">
                <span className="text-[10px] font-mono text-primary uppercase">Backend</span>
                <h6 className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors mt-1">Serverless Functions: Scalability Without Pain</h6>
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-surface-container-lowest border border-primary/10 p-6 relative overflow-hidden rounded-sm">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary/5 rounded-full blur-2xl"></div>
            <h5 className="font-headline font-bold text-sm uppercase tracking-widest text-on-surface mb-2 relative z-10">Technical Brief</h5>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-4 relative z-10">Architecture deep-dives, delivered weekly.</p>
            <input
              type="email"
              placeholder="YOUR@EMAIL.COM"
              className="w-full bg-surface-container p-3 font-mono text-[10px] border-none border-l-2 border-primary focus:ring-0 focus:outline-none focus:bg-surface-container-highest mb-3 transition-all relative z-10 text-on-surface"
            />
            <button className="w-full bg-primary text-on-primary-fixed font-headline font-bold text-xs uppercase py-3 hover:bg-primary-container transition-colors tracking-widest relative z-10">
              Subscribe
            </button>
          </div>
        </aside>

      </div>

      {/* Related Posts (Bento Grid Style) */}
      <section className="bg-surface-container-low py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
            <div>
              <span className="font-mono text-[10px] md:text-xs text-primary uppercase tracking-[0.3em]">Continuum</span>
              <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tighter mt-2 text-on-surface">Related Architectures</h2>
            </div>
            <Link href="/blog" className="text-primary font-mono text-xs uppercase tracking-widest flex items-center gap-2 group w-fit">
              View All Posts
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Related 1 */}
            <Link href="/blog" className="bg-surface p-6 md:p-8 border-l border-outline-variant/20 hover:border-primary/40 transition-all group rounded-r-lg">
              <span className="text-[10px] font-mono text-on-surface-variant">01 / ARCHITECTURE</span>
              <h3 className="font-headline text-lg md:text-xl font-bold mt-4 mb-4 md:mb-6 leading-tight text-on-surface group-hover:text-primary transition-colors">Server-Side Components: The New Paradigm</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-2">How React Server Components are redefining the boundary between client and server logic.</p>
            </Link>

            {/* Related 2 */}
            <Link href="/blog" className="bg-surface p-6 md:p-8 border-l border-outline-variant/20 hover:border-primary/40 transition-all group rounded-r-lg">
              <span className="text-[10px] font-mono text-on-surface-variant">02 / DEVOPS</span>
              <h3 className="font-headline text-lg md:text-xl font-bold mt-4 mb-4 md:mb-6 leading-tight text-on-surface group-hover:text-primary transition-colors">CI/CD Pipelines for Mikro-Frontends</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-2">Orchestrating independent deployments across multiple distributed web applications.</p>
            </Link>

            {/* Related 3 */}
            <Link href="/blog" className="bg-surface p-6 md:p-8 border-l border-outline-variant/20 hover:border-primary/40 transition-all group rounded-r-lg">
              <span className="text-[10px] font-mono text-on-surface-variant">03 / STACK</span>
              <h3 className="font-headline text-lg md:text-xl font-bold mt-4 mb-4 md:mb-6 leading-tight text-on-surface group-hover:text-primary transition-colors">Bun vs Node: The Architectural Choice</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-2">Why your next runtime choice might be driven by package management speed.</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
