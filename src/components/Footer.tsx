import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full py-12 px-6 md:px-8 mt-20 bg-gradient-to-t from-[#0e0e0f] to-transparent border-t border-primary/10">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-screen-2xl mx-auto gap-8 font-mono text-[10px] md:text-xs text-[#adaaab] text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
          <span className="text-[#81ecff] font-bold tracking-widest uppercase text-sm md:text-xs">Ömer Özbay</span>
          <span className="h-[1px] w-12 md:h-4 md:w-[1px] bg-outline-variant/50"></span>
          <span>© {new Date().getFullYear()} Obsidian Architect | Status: Operational</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 uppercase tracking-widest">
          <Link href="https://github.com/sandrotonal" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            GitHub
          </Link>
          <Link href="https://x.com/gucluyumhe" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            Twitter/X
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>

        <div className="flex gap-4">
          <Link href="https://github.com/sandrotonal" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-8 md:h-8 rounded-full border border-outline-variant/30 flex items-center justify-center hover:border-primary hover:text-primary transition-all cursor-pointer">
            <span className="material-symbols-outlined text-sm">code</span>
          </Link>
          <Link href="https://x.com/gucluyumhe" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-8 md:h-8 rounded-full border border-outline-variant/30 flex items-center justify-center hover:border-primary hover:text-primary transition-all cursor-pointer">
             <span className="material-symbols-outlined text-sm">alternate_email</span>
          </Link>
          <Link href="https://linkedin.com/in/omerozbay" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-8 md:h-8 rounded-full border border-outline-variant/30 flex items-center justify-center hover:border-primary hover:text-primary transition-all cursor-pointer">
             <span className="material-symbols-outlined text-sm">badge</span>
          </Link>
        </div>
      </div>
      <div className="flex justify-center mt-12 md:mt-8 md:hidden">
          <div className="font-mono text-[10px] text-[#adaaab]/40 uppercase tracking-widest">
            Latency: 14ms // Region: EU-Central
          </div>
      </div>
      <div className="hidden md:flex justify-end max-w-screen-2xl mx-auto mt-2">
           <div className="font-mono text-[10px] text-[#adaaab]/40 uppercase tracking-widest">
            Latency: 14ms // Region: EU-Central
          </div>
      </div>
    </footer>
  );
};

export default Footer;
