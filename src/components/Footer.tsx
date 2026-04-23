import { Scissors } from 'lucide-react';

/** Simple, clean footer */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800/60 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-sky-400/10 border border-sky-400/20 flex items-center justify-center">
            <Scissors className="w-3 h-3 text-sky-400" strokeWidth={2.5} />
          </div>
          <span className="font-display font-600 text-sm text-zinc-400 tracking-tight">
            ClearCut
          </span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-zinc-600 text-center">
          © {year} ClearCut. All processing happens locally in your browser.
        </p>

        {/* Links */}
        <div className="flex items-center gap-4">
          <a
            href="#features"
            className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            Features
          </a>
          <a
            href="#faq"
            className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            FAQ
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
