/*
 * ExO adapter for the `hero-banner` component type.
 *
 * Maps flat delivery props onto the PageLandingFieldsFragment that the existing
 * <HeroBanner> consumes. <HeroBanner> is left unchanged.
 *
 * Two translations worth noting:
 *  - `headline` (content) → heroBannerHeadline.
 *  - `headlineColor` is a DESIGN property, so the renderer does NOT inject it as
 *    a prop — it is read here via useDesignValues() (viewport-cascaded + token-
 *    resolved to a plain color string).
 *  - `image` arrives as a bare URL; toImageFragment() gives it the width/height
 *    <CtfImage> requires (see shared.ts).
 */

import { HeroBanner } from '@src/components/features/hero-banner';
import { useDesignValues } from '@contentful/experiences-react';
import { PageLandingFieldsFragment } from '@src/lib/__generated/sdk';

import { toImageFragment, IMAGE_RATIOS } from './shared';

interface HeroExoProps {
  headline?: string | null;
  image?: string | null;
  // The node id is exposed by the renderer via useContentfulComponent(); the
  // hero only needs a stable id for inspector mode, so we pass a POC placeholder.
  nodeId?: string;
}

export function HeroAdapter({ headline, image }: HeroExoProps) {
  const design = useDesignValues<{ headlineColor?: string }>();

  const page: PageLandingFieldsFragment = {
    __typename: 'PageLanding',
    internalName: headline ?? null,
    heroBannerHeadline: headline ?? null,
    heroBannerHeadlineColor: design.headlineColor ?? null,
    heroBannerImage: toImageFragment(image, IMAGE_RATIOS.hero, headline) ?? null,
    seoFields: null,
    productsCollection: null,
    // Inspector-mode target; not editable in the POC render path.
    sys: { __typename: 'Sys', id: 'exo-hero', spaceId: '' },
  };

  return <HeroBanner {...page} />;
}
