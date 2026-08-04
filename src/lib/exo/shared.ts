/**
 * Shared helpers for ExO adapters.
 *
 * REMOVE the `toImageFragment` shim (and IMAGE_RATIOS) when the ETL delivery payload starts
 * carrying real image dimensions (width, height, title). Today the ETL models each image as a
 * bare URL string; `next/image` (used by CtfImage) hard-requires width+height, so we synthesize
 * a representative aspect ratio per usage so the render is not blank. Actual on-screen size is
 * driven by surrounding CSS (hero forces object-fit inside a maxHeight, grid sizes by column),
 * so a representative ratio is visually correct.
 */

import { ImageFieldsFragment } from '@src/lib/__generated/sdk';

export const IMAGE_RATIOS = {
  hero: { width: 1600, height: 900 },
  productTile: { width: 600, height: 800 },
  productDetails: { width: 800, height: 1000 },
  share: { width: 1200, height: 630 },
} as const;

/**
 * Synthesize an ImageFieldsFragment from a bare URL string so the app's existing CtfImage
 * component (which requires width+height) renders. Remove when the delivery payload carries
 * real dimensions.
 */
export function toImageFragment(
  url: string | null | undefined,
  ratio: { width: number; height: number },
  title?: string | null,
): ImageFieldsFragment | null {
  if (!url || typeof url !== 'string') return null;
  return {
    __typename: 'Asset',
    url,
    width: ratio.width,
    height: ratio.height,
    title: title ?? null,
    description: null,
    contentType: null,
    sys: { __typename: 'Sys', id: url },
  };
}

/**
 * Defensive numeric coercion — a no-op on real numbers. The ETL's product-tile.price is declared
 * type:"Number" and arrives as a real JSON number today, but keep the coercion so a
 * modeling-side switch to string doesn't silently break the render.
 */
export function toNumber(value: unknown): number | null {
  if (value == null) return null;
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const n = parseFloat(value);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}
