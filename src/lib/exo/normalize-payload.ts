import type { ExperiencePayload, ExperienceNode } from '@contentful/experiences-react';

/**
 * Bridge for the inline-template-variant-node blocker (see reference/01-payload-shape.md).
 *
 * The ETL-seeded landing experience arrives as a SINGLE template-variant node whose named
 * slots hold the page sections:
 *
 *   payload.nodes = [{ template, slots: { seo:[S], hero:[H], products:[P] } }]
 *
 * But `@contentful/experiences-react@0.5.6`'s `resolveExperience` treats any node without a
 * `componentType` key as unsupported and returns null — so a raw payload resolves 0 nodes and
 * renders nothing.
 *
 * The fix: lift the template node's slot children up into a flat, ordered `nodes` array and
 * expose the template at `sys.template`. Render order is fixed to the source page's section
 * order: SEO (head-only), then hero, then products.
 *
 * REMOVE this file when the SDK supports inline templates natively.
 */

const KNOWN_SLOT_ORDER = ['seo', 'hero', 'products'] as const;

function isTemplateVariantNode(node: unknown): node is {
  template: { sys: { urn?: string } };
  slots?: Record<string, ExperienceNode[]>;
} {
  return (
    typeof node === 'object' &&
    node !== null &&
    'template' in (node as Record<string, unknown>) &&
    !('componentType' in (node as Record<string, unknown>))
  );
}

export function normalizeExperiencePayload(payload: ExperiencePayload): ExperiencePayload {
  if (!payload || !Array.isArray(payload.nodes) || payload.nodes.length === 0) return payload;

  const first = payload.nodes[0];
  if (!isTemplateVariantNode(first)) return payload;

  const slots = first.slots ?? {};
  const seen = new Set<string>();
  const flat: ExperienceNode[] = [];

  for (const slotName of KNOWN_SLOT_ORDER) {
    if (Array.isArray(slots[slotName])) {
      for (const child of slots[slotName]) flat.push(child);
      seen.add(slotName);
    }
  }
  // Any additional slot the template gains later is appended (nothing silently dropped).
  for (const [slotName, children] of Object.entries(slots)) {
    if (seen.has(slotName)) continue;
    if (Array.isArray(children)) for (const child of children) flat.push(child);
  }

  const nextSys = payload.sys ? { ...payload.sys } : ({} as ExperiencePayload['sys']);
  // Expose the template at sys.template so the registry's template component wraps the nodes.
  if (nextSys && !('template' in (nextSys as Record<string, unknown>))) {
    (nextSys as { template?: unknown }).template = first.template;
  }

  return {
    ...payload,
    sys: nextSys,
    nodes: flat,
  };
}
