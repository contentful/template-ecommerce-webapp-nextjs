/*
 * ExO passthrough template for the `landing-page` template.
 *
 * The renderer wraps ALL top-level nodes (seo, hero, products — in that order,
 * after normalize-payload.ts flattens them) and hands them to the template as a
 * single `children` ReactNode. The landing page has no page-level chrome of its
 * own beyond stacking those sections, so this template just renders them
 * through. Registering it (rather than leaving it unregistered) suppresses the
 * SDK's "No template registered" warning and gives us one place to add
 * page-level layout later if needed.
 */

import type { ReactNode } from 'react';

export function LandingTemplateAdapter({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}
