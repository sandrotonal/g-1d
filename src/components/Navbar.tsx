"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0e0e0f]/90 backdrop-blur-xl border-b border-primary/10 shadow-[0_0_40px_rgba(0,229,255,0.05)] py-0' : 'bg-transparent py-2'}`}>
      <div className="flex justify-between items-center px-6 md:px-8 h-20 max-w-screen-2xl mx-auto">
        <Link href="/" className="text-2xl md:text-3xl font-headline font-bold tracking-tighter text-primary z-50">
          Ömer Özbay
        </Link>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-10 font-headline font-bold tracking-tight">
          <Link
            href="/projects"
            className={`transition-colors ${pathname === '/projects' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}
          >
            Projects
          </Link>
          <Link
            href="/blog"
            className={`transition-colors ${pathname.startsWith('/blog') ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}
          >
            Blog
          </Link>
          <Link
            href="/about"
            className={`transition-colors ${pathname === '/about' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`transition-colors ${pathname === '/contact' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}
          >
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <Link href="https://github.com/sandrotonal" target="_blank" rel="noopener noreferrer" className="material-symbols-outlined text-primary hover:bg-primary/10 hover:scale-[1.02] transition-all duration-300 p-2 rounded-sm cursor-pointer active:scale-95">code</Link>
          <Link
            href="/contact"
            className="bg-primary/10 text-primary border border-primary/20 px-6 py-2 font-headline tracking-widest uppercase text-xs hover:bg-primary hover:text-on-primary-fixed transition-all active:scale-95 duration-200"
          >
            Connect
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center text-primary z-50 bg-surface-container-low p-2 rounded-md border border-outline-variant/20"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="material-symbols-outlined text-3xl transition-transform duration-300">
              {isMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu Full Screen Overlay */}
      <div 
        className={`md:hidden fixed inset-0 w-screen h-screen bg-[#0e0e0f] z-[9999] transition-all duration-300 ease-out flex flex-col justify-center items-center ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
        <div className="w-full max-w-screen-xl mx-auto px-8 relative z-10">
          <ul className="flex flex-col space-y-6 font-headline font-bold text-4xl sm:text-5xl tracking-tighter text-center">
            <li className={`transition-all duration-300 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '100ms' }}>
              <Link 
                href="/" 
                className={`block hover:translate-x-2 transition-transform ${pathname === '/' ? 'text-primary' : 'text-on-surface hover:text-primary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className={`transition-all duration-300 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '150ms' }}>
              <Link
                href="/projects"
                className={`block hover:translate-x-2 transition-transform ${pathname === '/projects' ? 'text-primary' : 'text-on-surface hover:text-primary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
            </li>
            <li className={`transition-all duration-300 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
              <Link 
                href="/blog" 
                className={`block hover:translate-x-2 transition-transform ${pathname.startsWith('/blog') ? 'text-primary' : 'text-on-surface hover:text-primary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Journal
              </Link>
            </li>
            <li className={`transition-all duration-300 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '250ms' }}>
              <Link 
                href="/about" 
                className={`block hover:translate-x-2 transition-transform ${pathname === '/about' ? 'text-primary' : 'text-on-surface hover:text-primary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li className={`pt-6 mt-6 border-t border-outline-variant/20 transition-all duration-300 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '300ms' }}>
              <Link 
                href="/contact"
                className="inline-flex items-center gap-4 text-xl font-mono tracking-widest text-primary uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="w-8 h-[1px] bg-primary"></span>
                Initiate Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
