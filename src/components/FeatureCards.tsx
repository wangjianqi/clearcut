import { Cpu, Lock, ImageDown, Infinity } from 'lucide-react';

const features = [
  {
    icon: Cpu,
    title: 'Local Processing',
    description:
      'The AI model runs entirely inside your browser using WebAssembly. No cloud servers, no latency — just your device doing the work.',
    accent: 'sky',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description:
      'Your images never leave your machine. We have no backend, no analytics on your files, and no way to see what you upload.',
    accent: 'violet',
  },
  {
    icon: ImageDown,
    title: 'Instant PNG Export',
    description:
      'Download a crisp transparent PNG the moment processing is done. Ready for Figma, Photoshop, Canva, or anywhere else you need it.',
    accent: 'emerald',
  },
  {
    icon: Infinity,
    title: 'Free, No Limits',
    description:
      'No subscription, no watermarks, no daily quotas. Process as many images as you want — the only limit is your browser.',
    accent: 'amber',
  },
] as const;

const accentMap = {
  sky: {
    icon: 'text-sky-400',
    bg: 'bg-sky-400/8',
    border: 'border-sky-400/15',
  },
  violet: {
    icon: 'text-violet-400',
    bg: 'bg-violet-400/8',
    border: 'border-violet-400/15',
  },
  emerald: {
    icon: 'text-emerald-400',
    bg: 'bg-emerald-400/8',
    border: 'border-emerald-400/15',
  },
  amber: {
    icon: 'text-amber-400',
    bg: 'bg-amber-400/8',
    border: 'border-amber-400/15',
  },
};

/** Feature highlight cards section */
export default function FeatureCards() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="font-display font-700 text-3xl sm:text-4xl text-zinc-50 tracking-tight mb-3">
            Built different
          </h2>
          <p className="text-zinc-500 text-base max-w-xl mx-auto">
            Most background-removal tools send your images to a server.
            ClearCut doesn't — and that changes everything.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            const colors = accentMap[feature.accent];
            return (
              <div
                key={feature.title}
                className="card p-6 flex flex-col gap-4 hover:border-zinc-700 transition-colors duration-200"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colors.bg} ${colors.border}`}
                >
                  <Icon className={`w-5 h-5 ${colors.icon}`} strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-display font-600 text-zinc-100 text-base mb-1.5 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
