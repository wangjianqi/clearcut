/** Processing lifecycle states */
export type ProcessingStatus = 'idle' | 'processing' | 'done' | 'error';

/** Allowed MIME types for upload */
export const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/bmp',
  'image/tiff',
] as const;

/** Max file size in bytes (10 MB) */
export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
export const MAX_FILE_SIZE_LABEL = '10MB';
