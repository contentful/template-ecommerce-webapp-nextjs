/*
 * Shared helpers for the ExO adapters.
 *
 * The adapters translate the FLAT content props that the Experience Delivery
 * API (XDA) hands each component node into the RICH fragment shapes the app's
 * existing components already expect (PageLandingFieldsFragment,
 * PageProductFieldsFragment, ...). The existing components are left untouched.
 */

import { ImageFieldsFragment } from '@src/lib/__generated/sdk';

/**
 * The delivery payload carries images as a bare URL string (e.g.
 * `hero.image = "https://images.flinkly.com/.../file.jpg"`), but the app's
 * <CtfImage> hard-requires `url` AND `width` AND `height` — it returns null
 * otherwise, so a URL alone renders nothing.
 *
 * Until the ETL/delivery payload carries real asset dimensions, we synthesize
 * an aspect-ratio hint per usage. next/image uses width/height only to reserve
 * layout space and set the intrinsic ratio; the actual on-screen size is driven
 * by the surrounding CSS (the hero forces object-fit: cover, the grid sizes by
 * column), so a representative ratio is visually correct for the POC.
 */
export function toImageFragment(
  url: string | null | undefined,
  dimensions: { width: number; height: number },
  title?: string | null,
): ImageFieldsFragment | undefined {
  if (!url) return undefined;
  return {
    __typename: 'Asset',
    url,
    width: dimensions.width,
    height: dimensions.height,
    title: title ?? '',
    description: title ?? '',
    contentType: 'image/jpeg',
    sys: { __typename: 'Sys', id: url },
  } as ImageFieldsFragment;
}

/** Representative aspect ratios per slot, used only to satisfy next/image. */
export const IMAGE_RATIOS = {
  hero: { width: 1600, height: 900 },
  productTile: { width: 600, height: 800 },
} as const;

/** Delivery serves `price` as a real number, but coerce defensively. */
export function toNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const n = Number(value);
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
}
