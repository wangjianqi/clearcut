import { ArrowDown, Cpu, Lock, Zap } from 'lucide-react';

interface HeroProps {
  onUploadClick: () => void;
}

/** Hero landing section with headline, CTA, and trust badges */
export default function Hero({ onUploadClick }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Background gradient orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[600px] h-[600px] rounded-full bg-sky-500/5 blur-[120px]" />
      </div>

      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-sky-400/20 bg-sky-400/5 text-sky-400 text-xs font-medium tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse-slow" />
          100% Browser-based · No Server Required
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-800 leading-[1.05] tracking-tight mb-6">
          Remove backgrounds{' '}
          <span className="gradient-text">instantly.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          AI-powered background removal that runs entirely in your browser.
          Your images never leave your device — no uploads, no accounts, no limits.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <button
            onClick={onUploadClick}
            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-400 hover:bg-sky-300 text-zinc-900 font-semibold text-sm transition-all duration-200 glow-sky hover:scale-[1.02] active:scale-[0.98]"
          >
            Upload an Image
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </button>
          <span className="text-sm text-zinc-500">
            PNG · JPG · WEBP · GIF — up to 10 MB
          </span>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-zinc-500 text-sm">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-zinc-600" />
            <span>On-device AI</span>
          </div>
          <div className="w-px h-4 bg-zinc-800" />
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-zinc-600" />
            <span>Zero uploads</span>
          </div>
          <div className="w-px h-4 bg-zinc-800" />
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-zinc-600" />
            <span>Free forever</span>
          </div>
        </div>
      </div>
    </section>
  );
}
