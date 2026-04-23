import { useRef, useState, useCallback } from 'react';
import { Upload, ImageIcon } from 'lucide-react';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  error: string | null;
  disabled?: boolean;
}

/**
 * Drag-and-drop upload zone.
 * Handles both click-to-browse and drag-over/drop interactions.
 */
export default function UploadZone({ onFileSelect, error, disabled }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0 || disabled) return;
      onFileSelect(files[0]);
    },
    [onFileSelect, disabled]
  );

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    // Only trigger leave when leaving the zone itself
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const onClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload image"
        onClick={onClick}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={[
          'relative w-full rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer select-none',
          'flex flex-col items-center justify-center gap-4 py-16 px-8 text-center',
          disabled
            ? 'opacity-50 cursor-not-allowed border-zinc-700 bg-zinc-900/30'
            : isDragging
            ? 'border-sky-400 bg-sky-400/5 scale-[1.01]'
            : 'border-zinc-700 bg-zinc-900/40 hover:border-sky-400/50 hover:bg-sky-400/[0.03]',
        ].join(' ')}
      >
        {/* Icon */}
        <div
          className={[
            'w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200',
            isDragging
              ? 'bg-sky-400/15 text-sky-400'
              : 'bg-zinc-800 text-zinc-400',
          ].join(' ')}
        >
          {isDragging ? (
            <ImageIcon className="w-7 h-7" strokeWidth={1.5} />
          ) : (
            <Upload className="w-7 h-7" strokeWidth={1.5} />
          )}
        </div>

        {/* Text */}
        <div>
          <p className="text-zinc-200 font-medium text-base mb-1">
            {isDragging ? 'Drop image here' : 'Drag & drop an image'}
          </p>
          <p className="text-zinc-500 text-sm">
            or{' '}
            <span className="text-sky-400 hover:text-sky-300 transition-colors">
              click to browse
            </span>{' '}
            · PNG, JPG, WEBP, GIF up to 10 MB
          </p>
        </div>

        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
          disabled={disabled}
        />
      </div>

      {/* Validation error */}
      {error && (
        <p className="mt-3 text-sm text-red-400 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
