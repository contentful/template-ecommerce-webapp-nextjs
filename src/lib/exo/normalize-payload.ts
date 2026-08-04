/*
 * Payload normalizer for the ExO code-rewrite POC.
 *
 * WHY THIS EXISTS
 * ---------------
 * The ETL-seeded landing experience comes off the Experience Delivery API (XDA)
 * as a single TEMPLATE-variant node whose named slots hold the page sections:
 *
 *   payload.nodes = [
 *     { template: {...landing-page}, slots: { seo: [..], hero: [..], products: [..] } }
 *   ]
 *
 * But @contentful/experiences-react@0.5.6 does NOT support template-variant
 * nodes yet. Its resolveExperience() walker skips any node without a
 * `componentType` key (isComponentTypeNode → console.warn "Templates are not
 * supported in v1" → returns null). Passing the raw payload straight through
 * therefore drops the ENTIRE tree and renders nothing.
 *
 * The SDK's v1 model instead expects:
 *   - payload.nodes = a flat, ordered list of COMPONENT nodes, and
 *   - payload.sys.template = the page-level template the renderer wraps those
 *     nodes with (as `children`, via a registered passthrough template).
 *
 * This transform bridges the two: it lifts the template node's named slots into
 * a flat, ordered top-level `nodes` array [seo, hero, products] and keeps
 * `sys.template` untouched. The landing page already stacks Seo → Hero →
 * Products in exactly that order, so a flat ordered list under a passthrough
 * template reproduces the original layout faithfully.
 *
 * This is intentionally isolated here (not a patch to the SDK). When the SDK
 * gains native template-variant support, delete this file and pass the payload
 * straight to resolveExperience.
 */

import type { ExperienceNode, ExperiencePayload } from '@contentful/experiences-react';

// Order the sections are rendered in on the landing page (index.page.tsx):
// SEO metadata first (head-only), then the hero, then the product grid.
const SLOT_RENDER_ORDER = ['seo', 'hero', 'products'] as const;

/** A payload node is template-variant when it carries `template` and no `componentType`. */
function isTemplateVariantNode(
  node: ExperienceNode,
): node is Extract<ExperienceNode, { template: unknown }> {
  return 'template' in node && !('componentType' in node);
}

/**
 * If the payload's top-level nodes are template-variant (named-slot) nodes,
 * flatten each one's slots into ordered component nodes. Component-node
 * payloads (already SDK-shaped) pass through unchanged.
 */
export function normalizeExperiencePayload(payload: ExperiencePayload): ExperiencePayload {
  const flattened: ExperienceNode[] = [];

  for (const node of payload.nodes) {
    if (!isTemplateVariantNode(node)) {
      // Already a component node — the SDK can walk it directly.
      flattened.push(node);
      continue;
    }

    const slots = node.slots ?? {};
    const slotNames = Object.keys(slots);

    // Render known slots in the deterministic page order first, then append any
    // slot the template gained later so nothing is silently dropped.
    const orderedNames = [
      ...SLOT_RENDER_ORDER.filter(name => name in slots),
      ...slotNames.filter(name => !SLOT_RENDER_ORDER.includes(name as never)),
    ];

    for (const name of orderedNames) {
      const children = slots[name];
      if (!Array.isArray(children)) continue;
      // Each slot child is itself a component node (seo / hero-banner /
      // product-tile-grid). Lift them straight up — their own nested slots
      // (e.g. the grid's `tiles`) are left intact for the SDK to recurse into.
      flattened.push(...children);
    }
  }

  return {
    ...payload,
    nodes: flattened,
  };
}
