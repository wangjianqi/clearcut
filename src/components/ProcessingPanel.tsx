import { useCallback } from 'react';
import { Scissors, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';
import type { ProcessingStatus } from '../types';
import UploadZone from './UploadZone';
import ResultPanel from './ResultPanel';

interface ProcessingPanelProps {
  uploadedFile: File | null;
  uploadedURL: string | null;
  resultURL: string | null;
  status: ProcessingStatus;
  progress: number;
  progressLabel: string;
  processingError: string | null;
  uploadError: string | null;
  onFileSelect: (file: File) => void;
  onProcess: () => void;
  onReset: () => void;
  onDownload: () => void;
}

/** The main tool section. Renders appropriate UI for each processing state. */
export default function ProcessingPanel({
  uploadedFile,
  uploadedURL,
  resultURL,
  status,
  progress,
  progressLabel,
  processingError,
  uploadError,
  onFileSelect,
  onProcess,
  onReset,
  onDownload,
}: ProcessingPanelProps) {
  const isProcessing = status === 'processing';

  // Derived booleans for rendering
  const showUploader = !uploadedFile;
  const showPreviewAndAction = uploadedFile && status === 'idle';
  const showProgress = isProcessing;
  const showResult = status === 'done' && resultURL !== null && uploadedURL !== null;
  const showError = status === 'error';

  // Drag-new-image while keeping state
  const handleNewFile = useCallback(
    (file: File) => {
      onFileSelect(file);
    },
    [onFileSelect]
  );

  return (
    <div className="w-full">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-zinc-800" />
        <span className="text-xs text-zinc-600 font-medium uppercase tracking-widest px-2">
          Tool
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-zinc-800" />
      </div>

      {/* ── State: No file uploaded ── */}
      {showUploader && (
        <div className="max-w-2xl mx-auto animate-slide-up">
          <UploadZone onFileSelect={handleNewFile} error={uploadError} />
        </div>
      )}

      {/* ── State: File selected, idle ── */}
      {showPreviewAndAction && uploadedURL && (
        <div className="max-w-2xl mx-auto animate-slide-up">
          {/* Image preview */}
          <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/50 mb-6">
            <div className="px-4 py-2.5 border-b border-zinc-800/70 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zinc-600" />
                <span className="text-xs text-zinc-500 font-medium truncate max-w-[240px]">
                  {uploadedFile?.name}
                </span>
              </div>
              <button
                onClick={onReset}
                className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
                aria-label="Remove image"
              >
                Remove
              </button>
            </div>
            <div className="p-4 bg-zinc-900 flex justify-center">
              <img
                src={uploadedURL}
                alt="Uploaded preview"
                className="max-h-64 w-auto object-contain rounded-lg"
                draggable={false}
              />
            </div>
          </div>

          {/* First-run notice */}
          <div className="flex items-start gap-2.5 px-4 py-3 mb-5 rounded-xl bg-amber-400/5 border border-amber-400/10 text-amber-400/80 text-xs">
            <Sparkles className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <span>
              The AI model (~40 MB) is downloaded once and cached by your browser.
              First run may take 20–60 seconds depending on your connection.
            </span>
          </div>

          {/* Action button */}
          <button
            onClick={onProcess}
            disabled={isProcessing}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-sky-400 hover:bg-sky-300 text-zinc-900 font-semibold text-sm transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] glow-sky disabled:opacity-50 disabled:pointer-events-none"
          >
            <Scissors className="w-4 h-4" strokeWidth={2.5} />
            Remove Background
          </button>
        </div>
      )}

      {/* ── State: Processing ── */}
      {showProgress && (
        <div className="max-w-2xl mx-auto animate-fade-in">
          <div className="card p-8 text-center">
            {/* Animated icon */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center">
              <Scissors className="w-8 h-8 text-sky-400 animate-pulse-slow" strokeWidth={1.5} />
            </div>

            <p className="font-display font-600 text-zinc-100 text-lg mb-1">
              Processing your image
            </p>
            <p className="text-zinc-500 text-sm mb-8">{progressLabel}</p>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full progress-shimmer transition-all duration-300"
                style={{ width: `${Math.max(5, progress * 100).toFixed(1)}%` }}
              />
            </div>
            <p className="mt-3 text-xs text-zinc-600 tabular-nums">
              {(progress * 100).toFixed(0)}%
            </p>
          </div>
        </div>
      )}

      {/* ── State: Done ── */}
      {showResult && (
        <ResultPanel
          originalURL={uploadedURL!}
          resultURL={resultURL!}
          onDownload={onDownload}
          onReset={onReset}
        />
      )}

      {/* ── State: Error ── */}
      {showError && (
        <div className="max-w-2xl mx-auto animate-fade-in">
          <div className="card p-8 text-center">
            <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-red-400/10 border border-red-400/20 flex items-center justify-center">
              <AlertCircle className="w-7 h-7 text-red-400" strokeWidth={1.5} />
            </div>
            <p className="font-display font-600 text-zinc-100 text-lg mb-2">
              Something went wrong
            </p>
            <p className="text-zinc-500 text-sm mb-7 max-w-sm mx-auto">
              {processingError ?? 'Failed to process image. Please try again.'}
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={onReset}
                className="px-4 py-2 text-sm text-zinc-400 hover:text-zinc-200 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all"
              >
                Upload New Image
              </button>
              <button
                onClick={onProcess}
                className="flex items-center gap-1.5 px-4 py-2 text-sm text-zinc-900 bg-sky-400 hover:bg-sky-300 rounded-lg font-medium transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
