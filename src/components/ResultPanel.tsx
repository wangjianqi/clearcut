import { Download, RotateCcw } from 'lucide-react';

interface ResultPanelProps {
  originalURL: string;
  resultURL: string;
  onDownload: () => void;
  onReset: () => void;
}

/**
 * Side-by-side comparison panel for original vs. processed image.
 * The result side uses a checkerboard background to show transparency.
 */
export default function ResultPanel({
  originalURL,
  resultURL,
  onDownload,
  onReset,
}: ResultPanelProps) {
  return (
    <div className="animate-fade-in">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-700 text-lg text-zinc-100 tracking-tight">
          Result
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-zinc-400 hover:text-zinc-200 rounded-lg border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            New Image
          </button>
          <button
            onClick={onDownload}
            className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-zinc-900 bg-sky-400 hover:bg-sky-300 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] glow-sky"
          >
            <Download className="w-3.5 h-3.5" />
            Download PNG
          </button>
        </div>
      </div>

      {/* Comparison grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Original */}
        <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/50">
          <div className="px-4 py-2.5 border-b border-zinc-800/80 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-zinc-600" />
            <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
              Original
            </span>
          </div>
          <div className="p-3 bg-zinc-900">
            <img
              src={originalURL}
              alt="Original"
              className="w-full h-auto rounded-lg object-contain max-h-[480px]"
              draggable={false}
            />
          </div>
        </div>

        {/* Result */}
        <div className="rounded-2xl overflow-hidden border border-zinc-700 shadow-lg shadow-sky-400/5">
          <div className="px-4 py-2.5 border-b border-zinc-700/80 flex items-center justify-between bg-zinc-900/80">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span className="text-xs text-sky-400/80 font-medium uppercase tracking-wider">
                Background Removed
              </span>
            </div>
            <span className="text-[10px] text-zinc-600 font-mono">PNG · Transparent</span>
          </div>
          {/* Checkerboard background for transparency preview */}
          <div className="p-3 checkerboard">
            <img
              src={resultURL}
              alt="Background removed"
              className="w-full h-auto rounded-lg object-contain max-h-[480px] drop-shadow-xl"
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* Download hint */}
      <p className="mt-4 text-center text-xs text-zinc-600">
        Output is a transparent PNG. Your original image was never uploaded anywhere.
      </p>
    </div>
  );
}
