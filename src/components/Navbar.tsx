import { Scissors } from 'lucide-react';

/** Top navigation bar with logo and placeholder links */
export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/60 bg-[#09090b]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group" aria-label="ClearCut home">
          <div className="w-7 h-7 rounded-lg bg-sky-400/10 border border-sky-400/20 flex items-center justify-center group-hover:bg-sky-400/15 transition-colors">
            <Scissors className="w-3.5 h-3.5 text-sky-400" strokeWidth={2.5} />
          </div>
          <span className="font-display font-700 text-base text-zinc-50 tracking-tight">
            ClearCut
          </span>
        </a>

        {/* Nav links */}
        <nav className="hidden sm:flex items-center gap-1">
          <a
            href="#features"
            className="px-3 py-1.5 text-sm text-zinc-400 hover:text-zinc-200 rounded-md hover:bg-zinc-800/60 transition-all"
          >
            Features
          </a>
          <a
            href="#faq"
            className="px-3 py-1.5 text-sm text-zinc-400 hover:text-zinc-200 rounded-md hover:bg-zinc-800/60 transition-all"
          >
            FAQ
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 flex items-center gap-1.5 px-3 py-1.5 text-sm text-zinc-400 hover:text-zinc-200 rounded-md border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/40 transition-all"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
