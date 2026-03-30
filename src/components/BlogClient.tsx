"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PostMetadata as BlogPost } from '@/utils/markdown';
import { motion } from 'framer-motion';

interface BlogClientProps {
  initialPosts: BlogPost[];
}

export default function BlogClient({ initialPosts }: BlogClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const featuredPost = initialPosts[0];
  
  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return initialPosts.filter(post => {
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [initialPosts, searchTerm, selectedCategory]);
  
  const regularPosts = filteredPosts.slice(1);
  
  // Get unique categories
  const categories = Array.from(new Set(initialPosts.map(post => post.category).filter((cat): cat is string => Boolean(cat))));

  return (
    <div className="max-w-screen-2xl mx-auto">
      {/* Hero Header */}
      <header className="mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-2">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-primary text-sm tracking-[0.3em] uppercase"
            >
              Technical Journal // 2026
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-headline font-bold tracking-tighter text-on-surface"
            >
              Deep Dives & <span className="text-primary">Technical Insights</span>
            </motion.h1>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
        {/* Articles Feed */}
        <section className="lg:col-span-8 flex flex-col gap-24">
          {/* Featured Article */}
          {featuredPost && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="group relative"
            >
              <Link href={`/blog/${featuredPost.id}`} className="flex flex-col gap-8">
                <div className="relative aspect-[21/9] overflow-hidden rounded-sm bg-surface-container-low border border-outline-variant/15">
                  {featuredPost.coverImage && (
                    <Image
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      fill
                      unoptimized
                      className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6">
                    <span className="bg-primary/20 backdrop-blur-md text-primary px-3 py-1 text-xs font-mono border border-primary/30 uppercase tracking-widest rounded-sm">Featured</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 text-xs font-mono text-on-surface-variant flex-wrap">
                    <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}</span>
                    <span className="w-1 h-1 bg-primary rounded-full"></span>
                    <span className="text-primary">{featuredPost.category || 'ARCHITECTURE'}</span>
                  </div>
                  <h2 className="text-4xl font-headline font-bold tracking-tight text-on-surface group-hover:text-primary transition-colors duration-300">
                    {featuredPost.title}
                  </h2>
                  <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="inline-flex items-center gap-2 text-primary font-headline font-bold group/link mt-4">
                    READ ARTICLE
                    <span className="material-symbols-outlined transition-transform group-hover/link:translate-x-1">arrow_forward</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          )}

          {/* Regular Articles */}
          {regularPosts.map((post, index) => (
             <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (index * 0.1) }}
             >
              <Link href={`/blog/${post.id}`} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start group">
                <div className="aspect-square overflow-hidden rounded-sm bg-surface-container-low border border-outline-variant/15 relative">
                  {post.coverImage && (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      unoptimized
                      className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                  )}
                </div>
                <div className="md:col-span-2 flex flex-col gap-4">
                  <div className="flex items-center gap-4 text-xs font-mono text-on-surface-variant flex-wrap">
                    <span>{new Date(post.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}</span>
                    <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
                    <span className="text-primary uppercase">{post.category || 'ENGINEERING'}</span>
                  </div>
                  <h2 className="text-2xl font-headline font-bold tracking-tight text-on-surface group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </section>

        {/* Sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-12">
          {/* Search & Filter */}
          <div className="bg-surface-container-lowest p-6 border-l-2 border-primary rounded-sm space-y-4">
            <label htmlFor="search-input" className="block text-xs font-mono text-primary uppercase mb-3 tracking-widest">Search Archive</label>
            <div className="relative">
              <input
                id="search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="QUERY_STRING..."
                aria-label="Search blog posts"
                className="w-full bg-surface-container-low border-none focus:ring-1 focus:ring-primary text-on-surface font-mono placeholder:text-outline-variant py-3 pl-4 pr-10 rounded-sm outline-none"
              />
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant">search</span>
            </div>
            {categories.length > 0 && (
              <div className="pt-4 border-t border-outline-variant/20">
                <span className="block text-xs font-mono text-on-surface-variant uppercase mb-3 tracking-widest">Filter by Category</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 py-2 text-xs font-mono rounded-md transition-all border ${!selectedCategory ? 'bg-primary text-on-primary-fixed border-primary' : 'bg-surface-container-highest text-on-surface-variant border-transparent hover:border-primary/20 hover:text-primary'}`}
                  >
                    ALL
                  </button>
                  {categories.map((cat: string) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 text-xs font-mono rounded-md transition-all border ${selectedCategory === cat ? 'bg-primary text-on-primary-fixed border-primary' : 'bg-surface-container-highest text-on-surface-variant border-transparent hover:border-primary/20 hover:text-primary'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {(searchTerm || selectedCategory) && (
              <div className="pt-4 border-t border-outline-variant/20">
                <p className="text-xs font-mono text-on-surface-variant">
                  Showing {filteredPosts.length} of {initialPosts.length} posts
                </p>
              </div>
            )}
          </div>

          {/* Author Snippet */}
          <div className="flex flex-col gap-6">
            <h3 className="font-headline font-bold text-xl tracking-tight flex items-center gap-2 text-on-surface">
              <span className="w-4 h-4 bg-primary rounded-sm"></span> AUTHOR
            </h3>
            <div className="flex flex-col gap-4">
              <div className="w-20 h-20 rounded-full bg-surface-container-high border-2 border-primary/20 p-1 overflow-hidden relative grayscale">
                 <Image src="/images/author.jpg" alt="Author" fill unoptimized className="object-cover rounded-full" />
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Ömer Özbay is a Full-Stack Engineer focused on architectural precision and high-performance system design. Building the future with obsidian and light.
              </p>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-6">
            <h3 className="font-headline font-bold text-xl tracking-tight flex items-center gap-2 text-on-surface">
              <span className="w-4 h-4 bg-primary rounded-sm"></span> CATEGORIES
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat: string) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                  className={`px-4 py-2 text-xs font-mono rounded-md transition-all border ${selectedCategory === cat ? 'bg-primary text-on-primary-fixed border-primary' : 'bg-surface-container-highest text-on-surface-variant border-transparent hover:border-primary/20 hover:text-primary'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
