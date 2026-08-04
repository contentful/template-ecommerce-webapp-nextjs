/*
 * ExO adapter for the `seo` component type.
 *
 * Maps the flat delivery content props (pageTitle, pageDescription,
 * canonicalUrl, noindex, nofollow, shareImages) onto the SeoFieldsFragment the
 * existing <SeoFields> already consumes. <SeoFields> is left unchanged.
 */

import { SeoFields } from '@src/components/features/seo';
import { SeoFieldsFragment } from '@src/lib/__generated/sdk';

import { toImageFragment, IMAGE_RATIOS } from './shared';

// The merged prop bag the renderer hands us IS the node's flat content bag.
interface SeoExoProps {
  pageTitle?: string | null;
  pageDescription?: string | null;
  canonicalUrl?: string | null;
  noindex?: boolean | null;
  nofollow?: boolean | null;
  // Delivery serves the share image as a single URL string.
  shareImages?: string | null;
}

export function SeoAdapter({
  pageTitle,
  pageDescription,
  canonicalUrl,
  noindex,
  nofollow,
  shareImages,
}: SeoExoProps) {
  const shareImage = toImageFragment(shareImages, IMAGE_RATIOS.hero, pageTitle);

  const fields: SeoFieldsFragment = {
    __typename: 'ComponentSeo',
    pageTitle: pageTitle ?? null,
    pageDescription: pageDescription ?? null,
    canonicalUrl: canonicalUrl ?? null,
    noindex: noindex ?? false,
    nofollow: nofollow ?? false,
    shareImagesCollection: shareImage
      ? { __typename: 'AssetCollection', items: [shareImage] }
      : null,
  };

  return <SeoFields {...fields} />;
}
