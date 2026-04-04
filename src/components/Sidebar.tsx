import React from 'react';
import Link from 'next/link';
import { FaTelegramPlane, FaTwitter } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-1/2 -translate-y-1/2 w-16 rounded-r-xl border-y border-r border-primary/20 bg-black/60 backdrop-blur-lg shadow-2xl z-40 hidden lg:flex flex-col items-center py-6 gap-8">
      <Link href="https://github.com/sandrotonal" target="_blank" rel="noopener noreferrer" aria-label="Visit my GitHub profile" className="flex flex-col items-center gap-1 group cursor-pointer hover:translate-x-1 duration-300">
        <span className="material-symbols-outlined text-on-surface-variant opacity-50 group-hover:opacity-100 group-hover:text-primary transition-all scale-110">code</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant opacity-50 group-hover:opacity-100 group-hover:text-primary">GitHub</span>
      </Link>
      <a href="https://x.com/gucluyumhe" target="_blank" rel="noopener noreferrer" aria-label="Follow me on X (Twitter)" className="flex flex-col items-center gap-1 group cursor-pointer hover:translate-x-1 duration-300">
        <FaTwitter className="text-on-surface-variant opacity-50 group-hover:opacity-100 group-hover:text-primary transition-all text-2xl" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant opacity-50 group-hover:opacity-100 group-hover:text-primary">X</span>
      </a>
      <a href="https://t.me/islamakhachev" target="_blank" rel="noopener noreferrer" aria-label="Contact me via Telegram" className="flex flex-col items-center gap-1 group cursor-pointer hover:translate-x-1 duration-300">
        <FaTelegramPlane className="text-on-surface-variant opacity-50 group-hover:opacity-100 group-hover:text-primary transition-all text-2xl" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant opacity-50 group-hover:opacity-100 group-hover:text-primary">Telegram</span>
      </a>
    </aside>
  );
};

export default Sidebar;
