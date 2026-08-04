import {
  createClient,
  resolveExperience,
  ServerExperienceRenderer,
} from '@contentful/experiences-react';
import type {
  ExperiencePayload,
  PortableRenderPlan,
  ServerExperienceRendererProps,
} from '@contentful/experiences-react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { ComponentType } from 'react';

import { experienceConfig } from '@src/lib/exo/experience-config';
import { normalizeExperiencePayload } from '@src/lib/exo/normalize-payload';
import { getServerSideTranslations } from '@src/pages/utils/get-serverside-translations';

// See index.page.tsx — pre-alpha SDK React-types bridge. REMOVE when SDK targets React 18.
const Renderer =
  ServerExperienceRenderer as unknown as ComponentType<ServerExperienceRendererProps>;

type PreviewProps = { ok: true; plan: PortableRenderPlan } | { ok: false; error: string };

const PreviewPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!props.ok) {
    // Visible error, not 404 — a 404 in the editor iframe is a blank frame with no diagnostics.
    return (
      <div style={{ padding: 24, fontFamily: 'system-ui', color: '#b91c1c', maxWidth: 720 }}>
        <h1 style={{ marginBottom: 8, fontSize: 20 }}>ExO preview: cannot render</h1>
        <p>{props.error}</p>
      </div>
    );
  }
  return <Renderer experience={props.plan} config={experienceConfig} />;
};

function firstStr(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

export const getServerSideProps: GetServerSideProps<PreviewProps> = async ({ locale, query }) => {
  const spaceId = firstStr(query.spaceId) ?? process.env.EXO_SPACE_ID;
  const environmentId = firstStr(query.environmentId) ?? process.env.EXO_ENVIRONMENT_ID;
  const entityId = firstStr(query.entityId) ?? process.env.EXO_EXPERIENCE_ID;
  const entityTypeRaw = firstStr(query.entityType);
  const entityType = entityTypeRaw === 'fragment' ? 'fragment' : 'experience';
  const variant = firstStr(query.variant);

  const token = process.env.EXO_PREVIEW_TOKEN;
  const host = process.env.EXO_PREVIEW_HOST ?? 'https://preview.xdn.contentful.com';
  const translations = await getServerSideTranslations(locale);

  if (!token) {
    return {
      props: { ...translations, ok: false as const, error: 'EXO_PREVIEW_TOKEN is not set.' },
    };
  }
  if (!spaceId || !environmentId || !entityId) {
    return {
      props: {
        ...translations,
        ok: false as const,
        error:
          'Missing required parameter(s). Expected spaceId, environmentId, entityId in the URL or env.',
      },
    };
  }

  try {
    const client = createClient({ accessToken: token, host });
    const request = {
      preview: 'true' as const,
      locale: locale ?? 'en-US',
      ...(variant ? { variant } : {}),
    };
    const raw =
      entityType === 'fragment'
        ? ((await client.fragment.getFragment(
            spaceId,
            environmentId,
            entityId,
            request,
          )) as unknown as ExperiencePayload)
        : ((await client.view.getExperience(
            spaceId,
            environmentId,
            entityId,
            request,
          )) as unknown as ExperiencePayload);

    const normalized = normalizeExperiencePayload(raw);
    const plan = await resolveExperience(normalized, experienceConfig);
    return { props: { ...translations, ok: true as const, plan } };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      props: {
        ...translations,
        ok: false as const,
        error: `Preview fetch/resolve failed for ${entityType} ${entityId}: ${message}`,
      },
    };
  }
};

export default PreviewPage;
