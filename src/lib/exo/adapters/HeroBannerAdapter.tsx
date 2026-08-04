import { useDesignValues } from '@contentful/experiences-react';

import { HeroBanner } from '@src/components/features/hero-banner';
import type { PageLandingFieldsFragment } from '@src/lib/__generated/sdk';

import { IMAGE_RATIOS, toImageFragment } from '../shared';

/**
 * Flat props emitted by the ExO delivery payload for the `hero-banner` componentType.
 * `headlineColor` is a design property and is read via `useDesignValues()`, not injected.
 */
export interface HeroBannerExoProps {
  headline?: string | null;
  /** Bare URL string (image dimensions are not carried in this payload — see shared.ts). */
  image?: string | null;
}

interface HeroBannerDesign {
  headlineColor?: string;
}

/**
 * ExO adapter for the `hero-banner` componentType.
 * Flat ExO props → PageLandingFieldsFragment shape → the app's existing HeroBanner component.
 */
export function HeroBannerAdapter({ headline, image }: HeroBannerExoProps) {
  const design = useDesignValues<HeroBannerDesign>();

  const page: PageLandingFieldsFragment = {
    __typename: 'PageLanding',
    heroBannerHeadline: headline ?? null,
    heroBannerHeadlineColor: design.headlineColor ?? null,
    heroBannerImage: toImageFragment(image, IMAGE_RATIOS.hero, headline),
    seoFields: null,
    productsCollection: null,
    internalName: null,
    sys: { __typename: 'Sys', id: 'exo-hero', spaceId: '' },
  };

  return <HeroBanner {...page} />;
}
