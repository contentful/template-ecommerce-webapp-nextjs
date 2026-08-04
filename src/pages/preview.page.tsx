/*
 * ExO code-rewrite POC — the PREVIEW route.
 *
 * This is the delivery route (exo-landing.page.tsx) with two swaps: the preview
 * host (XPA) instead of delivery (XDA), and the CPA token instead of the CDA
 * token. XPA returns experiences AND fragments in their DRAFT state, in the
 * exact same payload shape XDA returns for published ones — so the same
 * normalize → resolve → ServerExperienceRenderer path renders it unchanged.
 *
 * How it is reached (the ExO preview loop):
 *   Contentful editor  →  iframe loads the Content Preview URL configured in
 *   Settings → Content Preview  →  that URL is this route with the entity's ids
 *   as query params  →  we fetch the draft from XPA  →  render inside the iframe.
 *
 * The Content Preview URL (configured in the space, per entity type) looks like:
 *   http://localhost:3000/preview/?spaceId={experience.sys.space.sys.id}&environmentId={env_id}&entityId={experience.sys.id}&entityType=experience&variant={variant}
 *   http://localhost:3000/preview/?spaceId={fragment.sys.space.sys.id}&environmentId={env_id}&entityId={fragment.sys.id}&entityType=fragment&variant={variant}
 *
 * Unlike the delivery route, a missing param or a fetch error here renders a
 * VISIBLE message, not a 404 — a 404 shows as a blank iframe in the editor with
 * no clue why. The editor needs to see what went wrong.
 *
 * The CSP `frame-ancestors 'self' https://app.contentful.com ...` header that
 * lets Contentful iframe this app is already sent on every route by
 * config/headers.js (the starter ships with a Contentful preview integration),
 * so no header change is needed for preview.
 */

import {
  ServerExperienceRenderer,
  createClient,
  resolveExperience,
  type ExperiencePayload,
  type PortableRenderPlan,
  type ServerExperienceRendererProps,
} from '@contentful/experiences-react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { ComponentType } from 'react';

import { experienceConfig } from '@src/lib/exo/experience-config';
import { normalizeExperiencePayload } from '@src/lib/exo/normalize-payload';
import { getServerSideTranslations } from '@src/pages/utils/get-serverside-translations';

// See exo-landing.page.tsx: the SDK is built against React 19 types; this
// project pins @types/react@18, so bridge the renderer's component type. Types
// only, no runtime effect.
const Renderer = ServerExperienceRenderer as ComponentType<ServerExperienceRendererProps>;

// Which XPA resource to hit. Editors preview two entity types: experiences
// (from the experience editor) and fragments (from the fragment editor). The
// Content Preview platform passes `entityType`; default to experience.
type PreviewEntityType = 'experience' | 'fragment';

function parseEntityType(raw: string | string[] | undefined): PreviewEntityType {
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value === 'fragment' ? 'fragment' : 'experience';
}

function firstParam(raw: string | string[] | undefined): string | undefined {
  return Array.isArray(raw) ? raw[0] : raw;
}

type PreviewProps = { ok: true; plan: PortableRenderPlan } | { ok: false; message: string };

const PreviewPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!props.ok) {
    // Rendered inside the Contentful editor iframe — make the failure legible
    // rather than showing a blank frame.
    return (
      <div
        style={{
          fontFamily: 'system-ui, sans-serif',
          padding: '2rem',
          color: '#414d63',
          lineHeight: 1.5,
        }}
      >
        <h1 style={{ fontSize: '1rem', margin: '0 0 0.5rem' }}>ExO preview unavailable</h1>
        <p style={{ margin: 0 }}>{props.message}</p>
      </div>
    );
  }
  return <Renderer experience={props.plan} config={experienceConfig} />;
};

export const getServerSideProps: GetServerSideProps<PreviewProps> = async ({ query, locale }) => {
  // space/environment may come from the preview URL tokens or fall back to env
  // (so the URL only needs the entity id). entityId is always per-request.
  const spaceId = firstParam(query.spaceId) ?? process.env.EXO_SPACE_ID;
  const environmentId = firstParam(query.environmentId) ?? process.env.EXO_ENVIRONMENT_ID;
  const entityId = firstParam(query.entityId);
  const entityType = parseEntityType(query.entityType);
  const variant = firstParam(query.variant);

  const accessToken = process.env.EXO_PREVIEW_TOKEN;
  // Staging XPA. Prod is preview.xdn.contentful.com; the ETL-seeded space lives
  // on flinkly, so point at the staging preview host explicitly.
  const host = process.env.EXO_PREVIEW_HOST ?? 'https://preview.xdn.flinkly.com';

  if (!accessToken) {
    return {
      props: { ok: false, message: 'Missing EXO_PREVIEW_TOKEN (CPA) in the app environment.' },
    };
  }
  if (!spaceId || !environmentId || !entityId) {
    return {
      props: {
        ok: false,
        message:
          'Missing spaceId, environmentId, or entityId. Check the Content Preview URL configured in Settings → Content Preview.',
      },
    };
  }

  try {
    const client = createClient({ accessToken, host });

    // The XPA `variant` value is `{entityType}:{entityId}:{variantId}`, passed
    // straight through from the editor when personalization is in use.
    const request = {
      preview: 'true',
      locale: locale ?? 'en-US',
      ...(variant ? { variant } : {}),
    };

    const raw = (entityType === 'fragment'
      ? await client.fragment.getFragment(spaceId, environmentId, entityId, request)
      : await client.view.getExperience(
          spaceId,
          environmentId,
          entityId,
          request,
        )) as unknown as ExperiencePayload;

    // Same template-variant → flat-nodes bridge the delivery path uses. XPA
    // returns the same shape, so the normalizer applies unchanged.
    const normalized = normalizeExperiencePayload(raw);
    const plan = await resolveExperience(normalized, experienceConfig);

    return {
      props: {
        ...(await getServerSideTranslations(locale)),
        ok: true,
        plan,
      },
    };
  } catch (error) {
    const detail =
      error instanceof Error ? error.message : 'Unknown error fetching from the preview API.';
    return {
      props: {
        ok: false,
        message: `Could not load the draft from the preview API (XPA): ${detail}`,
      },
    };
  }
};

export default PreviewPage;
