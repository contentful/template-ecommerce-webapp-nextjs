import { SeoFields } from '@src/components/features/seo';
import type { SeoFieldsFragment } from '@src/lib/__generated/sdk';

import { IMAGE_RATIOS, toImageFragment } from '../shared';

/**
 * Flat props emitted by the ExO delivery payload for the `seo` componentType.
 * Keys come from the data assembly's `dataType` — verified in the XPA response.
 */
export interface SeoExoProps {
  pageTitle?: string | null;
  pageDescription?: string | null;
  canonicalUrl?: string | null;
  noindex?: boolean | null;
  nofollow?: boolean | null;
  /** Bare URL string (image dimensions are not carried in this payload — see shared.ts). */
  shareImages?: string | null;
}

/**
 * ExO adapter for the `seo` componentType.
 * Flat ExO props → SeoFieldsFragment shape → the app's existing SeoFields component, untouched.
 */
export function SeoAdapter({
  pageTitle,
  pageDescription,
  canonicalUrl,
  noindex,
  nofollow,
  shareImages,
}: SeoExoProps) {
  const image = toImageFragment(shareImages, IMAGE_RATIOS.share, pageTitle);
  const seo: SeoFieldsFragment = {
    __typename: 'ComponentSeo',
    pageTitle: pageTitle ?? null,
    pageDescription: pageDescription ?? null,
    canonicalUrl: canonicalUrl ?? null,
    noindex: noindex ?? null,
    nofollow: nofollow ?? null,
    shareImagesCollection: image ? { __typename: 'AssetCollection', items: [image] } : null,
  };
  return <SeoFields {...seo} />;
}
