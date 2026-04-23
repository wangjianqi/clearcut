import { useState, useCallback } from 'react';
import { removeBackground } from '@imgly/background-removal';
import type { ProcessingStatus } from '../types';

export interface BackgroundRemovalState {
  status: ProcessingStatus;
  /** 0–1 progress fraction */
  progress: number;
  progressLabel: string;
  resultBlob: Blob | null;
  error: string | null;
}

export interface BackgroundRemovalActions {
  processImage: (file: File) => Promise<void>;
  reset: () => void;
}

export type UseBackgroundRemovalReturn = BackgroundRemovalState & BackgroundRemovalActions;

const INITIAL_STATE: BackgroundRemovalState = {
  status: 'idle',
  progress: 0,
  progressLabel: '',
  resultBlob: null,
  error: null,
};

/**
 * Hook that wraps @imgly/background-removal.
 * All processing happens in the browser — no network uploads.
 */
export function useBackgroundRemoval(): UseBackgroundRemovalReturn {
  const [state, setState] = useState<BackgroundRemovalState>(INITIAL_STATE);

  const processImage = useCallback(async (file: File) => {
    setState({
      status: 'processing',
      progress: 0,
      progressLabel: 'Initializing…',
      resultBlob: null,
      error: null,
    });

    try {
      const blob = await removeBackground(file, {
        progress: (key: string, current: number, total: number) => {
          const pct = total > 0 ? current / total : 0;

          let label = 'Processing…';
          if (key.includes('fetch') || key.includes('load')) {
            label = 'Loading AI model — first run may take a moment…';
          } else if (key.includes('compute') || key.includes('inference')) {
            label = 'Removing background…';
          }

          setState((prev) => ({
            ...prev,
            progress: pct,
            progressLabel: label,
          }));
        },
      });

      setState({
        status: 'done',
        progress: 1,
        progressLabel: 'Done!',
        resultBlob: blob,
        error: null,
      });
    } catch (err) {
      console.error('[ClearCut] Background removal failed:', err);
      setState({
        status: 'error',
        progress: 0,
        progressLabel: '',
        resultBlob: null,
        error:
          err instanceof Error
            ? err.message
            : 'Something went wrong. Please try again.',
      });
    }
  }, []);

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return { ...state, processImage, reset };
}
