import { defineComponent, defineTemplate, type Config } from '@contentful/experiences-react';

import { HeroBannerAdapter } from './adapters/HeroBannerAdapter';
import { LandingTemplateAdapter } from './adapters/LandingTemplateAdapter';
import { ProductTileAdapter } from './adapters/ProductTileAdapter';
import { ProductTileGridAdapter } from './adapters/ProductTileGridAdapter';
import { SeoAdapter } from './adapters/SeoAdapter';

/**
 * ExO component + template registry.
 *
 * Keys are ExO ids = last slash-segment of `componentType.sys.urn` (or `sys.template.sys.urn`),
 * case-sensitive. NEVER display names, NEVER source content-type ids.
 *
 * `product-details` is defined in the ExO schema for parameterized product routes; those routes
 * are out of scope for the static-route refactor (see codebase-analysis/pages.json → `/[slug]`).
 * It is intentionally left unregistered here — if the payload ever contains a product-details
 * node, the SDK renders `MissingComponent` and surfaces the id, which is the right signal.
 */
export const experienceConfig: Config = {
  components: {
    seo: defineComponent({ component: SeoAdapter }),
    'hero-banner': defineComponent({ component: HeroBannerAdapter }),
    'product-tile-grid': defineComponent({ component: ProductTileGridAdapter }),
    'product-tile': defineComponent({ component: ProductTileAdapter }),
  },
  templates: {
    'landing-page': defineTemplate({ component: LandingTemplateAdapter }),
  },
};
