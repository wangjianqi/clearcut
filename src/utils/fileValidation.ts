import { ALLOWED_TYPES, MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_LABEL } from '../types';

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates that a file is an acceptable image within the size limit.
 */
export function validateImageFile(file: File): ValidationResult {
  const isAllowedType = (ALLOWED_TYPES as readonly string[]).includes(file.type);
  if (!isAllowedType) {
    return {
      valid: false,
      error: 'Unsupported format. Please upload a PNG, JPG, WEBP, or GIF image.',
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File is too large. Maximum size is ${MAX_FILE_SIZE_LABEL}.`,
    };
  }

  return { valid: true };
}

/**
 * Generates a sensible download filename from the original file name.
 */
export function makeDownloadFilename(originalName: string): string {
  const baseName = originalName.replace(/\.[^.]+$/, '');
  return `${baseName}-clearcut.png`;
}
