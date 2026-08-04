/*
 * ExO Experience configuration for the e-commerce landing page.
 *
 * The registry keys are `componentTypeId`s — the last slash-segment of each
 * node's `componentType.sys.urn` (the SDK's resolveExperience extracts them the
 * same way). The ETL-seeded landing experience uses these ids:
 *   - seo               → SeoAdapter            → <SeoFields>
 *   - hero-banner       → HeroAdapter           → <HeroBanner>
 *   - product-tile-grid → ProductTileGridAdapter (thin layout shell)
 *   - product-tile      → ProductTileAdapter    → <ProductTile>
 *
 * The template id `landing-page` (from payload.sys.template.sys.urn) maps to a
 * passthrough template. Each adapter re-nests the flat delivery props into the
 * rich fragment shape its underlying component already expects, so the app's
 * existing components render unchanged.
 */

import { defineComponent, defineTemplate, type Config } from '@contentful/experiences-react';

import { HeroAdapter } from './adapters/HeroAdapter';
import { LandingTemplateAdapter } from './adapters/LandingTemplateAdapter';
import { ProductTileAdapter } from './adapters/ProductTileAdapter';
import { ProductTileGridAdapter } from './adapters/ProductTileGridAdapter';
import { SeoAdapter } from './adapters/SeoAdapter';

export const experienceConfig: Config = {
  components: {
    seo: defineComponent({ component: SeoAdapter }),
    'hero-banner': defineComponent({ component: HeroAdapter }),
    'product-tile-grid': defineComponent({ component: ProductTileGridAdapter }),
    'product-tile': defineComponent({ component: ProductTileAdapter }),
  },
  templates: {
    'landing-page': defineTemplate({ component: LandingTemplateAdapter }),
  },
};
