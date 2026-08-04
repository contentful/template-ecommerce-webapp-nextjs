import type { ReactNode } from 'react';

/**
 * ExO template adapter for the `landing-page` template.
 *
 * The delivery payload's inline template-variant node is flattened by
 * `normalize-payload.ts`, so slot children arrive here already rendered.
 * This template is a passthrough — it just returns its children. The app's
 * page chrome (Layout, header, footer) is provided by _app.page.tsx.
 */
export function LandingTemplateAdapter({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}
